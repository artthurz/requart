import User from '../models/User';
import Financial from '../models/Financial';
import Appointment from '../models/Appointment';
import AppointmentsServices from '../models/AppointmentsServices';
import Services from '../models/Services';

import Queue from '../../lib/Queue';

class ManagerController {

  async geraFinanceiro() {


    
    return res.json(appointments);
  }

  async calcu(req, res) {
    const schema = Yup.object().shape({
      client_id: Yup.number().required(),
      provider_id: Yup.number().required(),
      date: Yup.date().required(),
      services_id: Yup.array().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { client_id, provider_id, date, services_id } = req.body;

    /**
     * Check if provider_id is a provider
     */
    const isProvider = await User.findOne({
      where: { id: provider_id, admin: true },
    });

    if (!isProvider) {
      return res
        .status(401)
        .json({ error: 'You can only create appointments with providers' });
    }

    /**
     * Check for past dates
     */
    const hourStart = startOfHour(parseISO(date));

    if (isBefore(hourStart, new Date())) {
      return res.status(400).json({ error: 'Past dates are not permitted' });
    }

    /**
     * Check date availability
     */

    const checkAvailability = await Appointment.findOne({
      where: {
        provider_id,
        canceled_at: null,
        date: hourStart,
      },
    });

    if (checkAvailability) {
      return res
        .status(400)
        .json({ error: 'Appointment date is not available' });
    }

    const appointment = await Appointment.create({
      date,
      client_id,
      provider_id,
    });

    const appointments = await Appointment.findAll();

    const appointmentId = appointments[appointments.length - 1];

    const appserv = [];

    for (let i = 0; i < services_id.length; i++) {
      appserv[appserv.length] = {
        appointments_id: appointmentId.id,
        services_id: services_id[i],
      };
    }

    const services = await AppointmentsServices.bulkCreate(appserv, {
      returning: true,
    });

    /**
     * Notify appointment provider
     */

    const user = await User.findByPk(req.userID);
    const formattedDate = format(
      hourStart,
      "'dia' dd 'de' MMMM', às' H:mm'h'",
      {
        locale: pt,
      }
    );

    await Notification.create({
      content: `Novo agendamento de ${user.name} para ${formattedDate}`,
      user: provider_id,
    });

    return res.json({ appointment, services });
  }

  async update(req, res) {}

  async delete(req, res) {
    const appointment = await Appointment.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: 'provider',
          attributes: ['name', 'login'],
        },
        {
          model: User,
          as: 'user',
          attributes: ['name'],
        },
      ],
    });

    if (appointment.user_id !== req.userID) {
      return res.status(401).json({
        error: "You don't have permission to cancel this appointment.",
      });
    }

    const dateWithSub = subHours(appointment.date, 2);

    if (isBefore(dateWithSub, new Date())) {
      return res.status(401).json({
        error: 'You can only cancel appointments 2 hours in advance.',
      });
    }

    appointment.canceled_at = new Date();

    await appointment.save();

    await Queue.add(CancellationMail.key, {
      appointment,
    });

    return res.json(appointment);
  }
}

export default new AppointmentController();
