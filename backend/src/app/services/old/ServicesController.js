import Services from '../models/Services';

class ServicesController {
  async index(req, res) {
    const services = await Services.findAll({
      where: { status: true },
      attributes: ['id', 'name', 'description', 'price', 'duration', 'active'],
    });

    return res.json(services);
  }

  async store(req, res) {
    const { name, description, price, duration, active } = req.body;

    const services = await Services.create({
      name,
      description,
      price,
      duration,
      active,
    });

    return res.json(services);
  }

  async update(req, res) {
    const { name, description, price, duration, active } = req.body;

    const services = await Services.update(
      {
        name,
        description,
        price,
        duration,
        active,
      },
      { where: { id: req.params.id } }
    );

    return res.json({
      name,
      description,
      price,
      duration,
      active,
    });
  }

  async delete(req, res) {
    const services = await Services.findByPk(req.params.id);

    services.status = false;

    await services.save();

    return res.json(services);
  }
}

export default new ServicesController();
