import {
  addDays,
  startOfISOWeek,
  startOfDay,
  endOfDay,
  format,
  parseISO,
} from 'date-fns';
import { Op } from 'sequelize';
import pt from 'date-fns/locale/pt-BR';

import Appointment from '../models/Appointment';
import Financial from '../models/Financial';

class GraficsController {
  async agendamentosDaSemana(req, res) {
    const { date } = req.query;
    const parsedDate = parseISO(date);

    const sunday = await Appointment.findAndCountAll({
      where: {
        canceled_at: null,
        date: {
          [Op.between]: [
            startOfDay(addDays(startOfISOWeek(parsedDate), 6)),
            endOfDay(addDays(startOfISOWeek(parsedDate), 6)),
          ],
        },
      },
    });
    const monday = await Appointment.findAndCountAll({
      where: {
        canceled_at: null,
        date: {
          [Op.between]: [
            startOfDay(startOfISOWeek(parsedDate)),
            endOfDay(startOfISOWeek(parsedDate)),
          ],
        },
      },
    });
    const tuesday = await Appointment.findAndCountAll({
      where: {
        canceled_at: null,
        date: {
          [Op.between]: [
            startOfDay(addDays(startOfISOWeek(parsedDate), 1)),
            endOfDay(addDays(startOfISOWeek(parsedDate), 1)),
          ],
        },
      },
    });
    const wednesday = await Appointment.findAndCountAll({
      where: {
        canceled_at: null,
        date: {
          [Op.between]: [
            startOfDay(addDays(startOfISOWeek(parsedDate), 2)),
            endOfDay(addDays(startOfISOWeek(parsedDate), 2)),
          ],
        },
      },
    });
    const thursday = await Appointment.findAndCountAll({
      where: {
        canceled_at: null,
        date: {
          [Op.between]: [
            startOfDay(addDays(startOfISOWeek(parsedDate), 3)),
            endOfDay(addDays(startOfISOWeek(parsedDate), 3)),
          ],
        },
      },
    });
    const friday = await Appointment.findAndCountAll({
      where: {
        canceled_at: null,
        date: {
          [Op.between]: [
            startOfDay(addDays(startOfISOWeek(parsedDate), 4)),
            endOfDay(addDays(startOfISOWeek(parsedDate), 4)),
          ],
        },
      },
    });
    const saturday = await Appointment.findAndCountAll({
      where: {
        canceled_at: null,
        date: {
          [Op.between]: [
            startOfDay(addDays(startOfISOWeek(parsedDate), 5)),
            endOfDay(addDays(startOfISOWeek(parsedDate), 5)),
          ],
        },
      },
    });

    const data = [
      {
        Dia: `Segunda - ${format(startOfISOWeek(parsedDate), 'dd/MM', {
          locale: pt,
        })}`,
        Agendamentos: monday.count,
      },
      {
        Dia: `Terça - ${format(
          addDays(startOfISOWeek(parsedDate), 1),
          'dd/MM',
          {
            locale: pt,
          }
        )}`,
        Agendamentos: tuesday.count,
      },
      {
        Dia: `Quarta - ${format(
          addDays(startOfISOWeek(parsedDate), 2),
          'dd/MM',
          {
            locale: pt,
          }
        )}`,
        Agendamentos: wednesday.count,
      },
      {
        Dia: `Quinta - ${format(
          addDays(startOfISOWeek(parsedDate), 3),
          'dd/MM',
          {
            locale: pt,
          }
        )}`,
        Agendamentos: thursday.count,
      },
      {
        Dia: `Sexta - ${format(
          addDays(startOfISOWeek(parsedDate), 4),
          'dd/MM',
          {
            locale: pt,
          }
        )}`,
        Agendamentos: friday.count,
      },
      {
        Dia: `Sábado - ${format(
          addDays(startOfISOWeek(parsedDate), 5),
          'dd/MM',
          {
            locale: pt,
          }
        )}`,
        Agendamentos: saturday.count,
      },
      {
        Dia: `Domingo - ${format(
          addDays(startOfISOWeek(parsedDate), 6),
          'dd/MM',
          {
            locale: pt,
          }
        )}`,
        Agendamentos: sunday.count,
      },
    ];

    return res.json(data);
  }

  async valorArrecadadoNaSemana(req, res) {
    const { date } = req.query;
    const parsedDate = parseISO(date);

    const sunday = await Financial.sum('discount_value', {
      where: {
        created_at: {
          [Op.between]: [
            startOfDay(addDays(startOfISOWeek(parsedDate), 6)),
            endOfDay(addDays(startOfISOWeek(parsedDate), 6)),
          ],
        },
      },
    });
    const monday = await Financial.sum('discount_value', {
      where: {
        created_at: {
          [Op.between]: [
            startOfDay(startOfISOWeek(parsedDate)),
            endOfDay(startOfISOWeek(parsedDate)),
          ],
        },
      },
    });
    const tuesday = await Financial.sum('discount_value', {
      where: {
        created_at: {
          [Op.between]: [
            startOfDay(addDays(startOfISOWeek(parsedDate), 1)),
            endOfDay(addDays(startOfISOWeek(parsedDate), 1)),
          ],
        },
      },
    });
    const wednesday = await Financial.sum('discount_value', {
      where: {
        created_at: {
          [Op.between]: [
            startOfDay(addDays(startOfISOWeek(parsedDate), 2)),
            endOfDay(addDays(startOfISOWeek(parsedDate), 2)),
          ],
        },
      },
    });
    const thursday = await Financial.sum('discount_value', {
      where: {
        created_at: {
          [Op.between]: [
            startOfDay(addDays(startOfISOWeek(parsedDate), 3)),
            endOfDay(addDays(startOfISOWeek(parsedDate), 3)),
          ],
        },
      },
    });

    const friday = await Financial.sum('discount_value', {
      where: {
        created_at: {
          [Op.between]: [
            startOfDay(addDays(startOfISOWeek(parsedDate), 4)),
            endOfDay(addDays(startOfISOWeek(parsedDate), 4)),
          ],
        },
      },
    });
    const saturday = await Financial.sum('discount_value', {
      where: {
        created_at: {
          [Op.between]: [
            startOfDay(addDays(startOfISOWeek(parsedDate), 5)),
            endOfDay(addDays(startOfISOWeek(parsedDate), 5)),
          ],
        },
      },
    });

    console.log('aqui !@$#!%@$#%@$%!', wednesday);

    const data = [
      {
        Dia: `Segunda - ${format(startOfISOWeek(parsedDate), 'dd/MM', {
          locale: pt,
        })}`,
        Valor: monday,
      },
      {
        Dia: `Terça - ${format(
          addDays(startOfISOWeek(parsedDate), 1),
          'dd/MM',
          {
            locale: pt,
          }
        )}`,
        Valor: tuesday,
      },
      {
        Dia: `Quarta - ${format(
          addDays(startOfISOWeek(parsedDate), 2),
          'dd/MM',
          {
            locale: pt,
          }
        )}`,
        Valor: wednesday,
      },
      {
        Dia: `Quinta - ${format(
          addDays(startOfISOWeek(parsedDate), 3),
          'dd/MM',
          {
            locale: pt,
          }
        )}`,
        Valor: thursday,
      },
      {
        Dia: `Sexta - ${format(
          addDays(startOfISOWeek(parsedDate), 4),
          'dd/MM',
          {
            locale: pt,
          }
        )}`,
        Valor: friday,
      },
      {
        Dia: `Sábado - ${format(
          addDays(startOfISOWeek(parsedDate), 5),
          'dd/MM',
          {
            locale: pt,
          }
        )}`,
        Valor: saturday,
      },
      {
        Dia: `Domingo - ${format(
          addDays(startOfISOWeek(parsedDate), 6),
          'dd/MM',
          {
            locale: pt,
          }
        )}`,
        Valor: sunday,
      },
    ];

    return res.json(data);
  }
}

export default new GraficsController();
