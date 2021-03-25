import Financial from '../models/Financial';
import Appointment from '../models/Appointment';
import Sequelize from 'sequelize';
import Peoples from '../models/Peoples';
import User from '../models/User';

class FinancialController {
  async index(req, res) {
    const financial = await Financial.findAll({
      attributes: [
        'id',
        'appointments_id',
        'total_value',
        'discount_percentage',
        'discount_value',
        'observation',
        'status',
        'created_at',
        'updated_at',
      ],
      include: [
        {
          model: Appointment,
          as: 'appointment',
          include: [
            {
              model: Peoples,
              as: 'user',
            },
            {
              model: User,
              as: 'provider',
            },
          ],
        },
      ],
      order: [Sequelize.col('status'), ['createdAt', 'DESC']],
    });

    return res.json(financial);
  }

  async update(req, res) {
    const fin = await Financial.findAll({
      attributes: ['id', 'total_value'],
      where: { id: req.params.id },
    });

    const { discount_percentage, observation, status } = req.body;

    const discount_value =
      fin[0].total_value - (fin[0].total_value / 100) * discount_percentage;

    await Financial.update(
      {
        discount_percentage,
        discount_value,
        observation,
        status,
      },
      { where: { id: req.params.id } }
    );

    return res.json({
      discount_percentage,
      discount_value,
      observation,
      status,
    });
  }
}

export default new FinancialController();
