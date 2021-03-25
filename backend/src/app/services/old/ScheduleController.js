import { startOfDay, endOfDay, parseISO } from 'date-fns';
import { Op } from 'sequelize';

import Appointment from '../models/Appointment';
import User from '../models/User';
import Peoples from '../models/Peoples';
import AppointmentsServices from '../models/AppointmentsServices';
import Services from '../models/Services';

class ScheduleController {
  async index(req, res) {
    const checkUserProvider = await User.findOne({
      where: { id: req.userID, admin: true },
    });

    if (!checkUserProvider) {
      return res.status(401).json({ error: 'User is not a provider' });
    }

    const { date, provider } = req.query;
    const parsedDate = parseISO(date);

    console.log('asdasdasasdasd', provider);

    let p_id = -1;

    if (provider >= 0) {
      p_id = provider;
    } else {
      p_id = req.userID;
    }

    const appointments = await Appointment.findAll({
      where: {
        provider_id: p_id,
        canceled_at: null,
        date: {
          [Op.between]: [startOfDay(parsedDate), endOfDay(parsedDate)],
        },
      },
      include: [
        {
          model: Peoples,
          as: 'user',
          atributes: ['name'],
        },
      ],
      order: ['date'],
    });

    const services = await AppointmentsServices.findAll({
      include: [
        {
          model: Services,
          as: 'service',
        },
      ],
    });

    let service = [];
    const as = [];
    let appoin;

    for (let ind = 0; ind < appointments.length; ind++) {
      service = [];
      for (let index = 0; index < services.length; index++) {
        if (services[index].appointments_id === appointments[ind].id) {
          service[service.length] = services[index];
        }
      }

      appoin = appointments[ind];
      const {
        past,
        cancelable,
        id,
        date,
        canceled_at,
        createdAt,
        updatedAt,
        user_id,
        provider_id,
        user,
      } = appoin;

      as[ind] = {
        past,
        cancelable,
        id,
        date,
        canceled_at,
        createdAt,
        updatedAt,
        user_id,
        provider_id,
        user,
        service,
      };
    }

    return res.json(as);
  }
}

export default new ScheduleController();
