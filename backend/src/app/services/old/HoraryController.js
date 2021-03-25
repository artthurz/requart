import HoraryConfiguration from '../models/HoraryConfiguration';

class HoraryController {
  
  async index(req, res) {
    const horary = await HoraryConfiguration.findAll({
      attributes: [
        'sunday',
        'monday',
        'tuesday',
        'wednesday',
        'thursday',
        'friday',
        'saturday',
        'morning_start',
        'morning_end',
        'afternoon_start',
        'afternoon_end',
        'peoples_id',
      ],
    });

    return res.json(horary);
  }

  async update(req, res) {
    const {
      sunday,
      monday,
      tuesday,
      wednesday,
      thursday,
      friday,
      saturday,
      morning_start,
      morning_end,
      afternoon_start,
      afternoon_end,
    } = req.body;

    const horary = await HoraryConfiguration.update(
      {
        sunday,
        monday,
        tuesday,
        wednesday,
        thursday,
        friday,
        saturday,
        morning_start,
        morning_end,
        afternoon_start,
        afternoon_end,
        peoples_id: req.userID,
      },     
      { where: { id: req.params.id } }
    );

    const peoples_id = req.userID;

    return res.json({
      sunday,
      monday,
      tuesday,
      wednesday,
      thursday,
      friday,
      saturday,
      morning_start,
      morning_end,
      afternoon_start,
      afternoon_end,
      peoples_id,
    });
  }

  async store(req, res) {
    const {
      sunday,
      monday,
      tuesday,
      wednesday,
      thursday,
      friday,
      saturday,
      morning_start,
      morning_end,
      afternoon_start,
      afternoon_end,
      peoples_id,
      created_at,
      updated_at,
    } = req.body;

    const horary = await HoraryConfiguration.create({
      sunday,
      monday,
      tuesday,
      wednesday,
      thursday,
      friday,
      saturday,
      morning_start,
      morning_end,
      afternoon_start,
      afternoon_end,
      peoples_id,
      created_at,
      updated_at,
    });

    return res.json(horary);
  }
}

export default new HoraryController();
