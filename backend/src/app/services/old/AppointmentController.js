import * as Yup from 'yup';
import { startOfHour, parseISO, isBefore, format, subHours } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';
import User from '../../models/User';
import File from '../../models/File';
import Appointment from '../../models/Appointment';
import Notification from '../schemas/Notification';
import AppointmentsServices from '../../models/AppointmentsServices';
import Services from '../../models/Services';
import Financial from '../../models/Financial';
import Audit from '../../models/Audit';

import CancellationMail from '../jobs/CancellationMail';
import Queue from '../../lib/Queue';
import Peoples from '../../models/Peoples';

class AppointmentController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const appointments = await Appointment.findAll({
      where: { user_id: req.userID, canceled_at: null },
      order: ['date'],
      attributes: ['id', 'date', 'past', 'cancelable'],
      limit: 20,
      offset: (page - 1) * 20,
      include: [
        {
          model: User,
          as: 'provider',
          attributes: ['id', 'name'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['id', 'path', 'url'],
            },
          ],
        },
      ],
    });

    return res.json(appointments);
  }

  async store(req, res) {
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

    let tvalue = 0;
    const srvcs = await Services.findAll();

    for (let i = 0; i < services_id.length; i++) {
      for (let l = 0; l < srvcs.length; l++) {
        if (services_id[i] === srvcs[l].id) {
          tvalue += srvcs[l].price;
        }
      }
    }

    const financ = {
      total_value: tvalue,
      discount_value: tvalue,
      status: false,
      appointments_id: appointmentId.id,
    };

    const financial = await Financial.create(financ);

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

    // Auditorias

    const auditServicos = {
      user_id: req.userID,
      date_action: new Date(),
      operation: 'Insert',
      table_action: 'appointment_services',
      text_action: `Criar servicos de agendamento para o agendamento ID: ${appointmentId.id}`,
    };
    await Audit.create(auditServicos);

    const auditFinanceiro = {
      user_id: req.userID,
      date_action: new Date(),
      operation: 'Insert',
      table_action: 'Financials',
      text_action: `Criar Financeiro ID: ${financial.id}`,
    };
    await Audit.create(auditFinanceiro);

    const auditAgendamento = {
      user_id: req.userID,
      date_action: new Date(),
      operation: 'Insert',
      table_action: 'Appointments',
      text_action: `Criar Agendamento ID: ${appointmentId.id}`,
    };
    await Audit.create(auditAgendamento);

    // Notificações

    await Notification.create({
      content: `Novo agendamento de ${user.name} para ${formattedDate}`,
      user: provider_id,
    });

    return res.json({ appointment, services, financial });
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
          model: Peoples,
          as: 'user',
          attributes: ['name'],
        },
      ],
    });

    /* if (appointment.user_id !== req.userID) {
      return res.status(401).json({
        error: "You don't have permission to cancel this appointment.",
      });
    } */

    const dateWithSub = subHours(appointment.date, 2);

    if (isBefore(dateWithSub, new Date())) {
      return res.status(401).json({
        error: 'You can only cancel appointments 2 hours in advance.',
      });
    }

    await Financial.destroy({ where: { appointments_id: appointment.id } });

    appointment.canceled_at = new Date();

    await appointment.save();

    const audit = {
      user_id: req.userID,
      date_action: new Date(),
      operation: 'Update',
      table_action: 'Appointments',
      text_action: `Cancelar Agendamento ID: ${req.params.id}`,
    };
    await Audit.create(audit);

    await Queue.add(CancellationMail.key, {
      appointment,
    });

    return res.json(appointment);
  }
}

export default new AppointmentController();
