import * as Yup from 'yup';
import Peoples from '../models/Peoples';

class PeoplesController {
  async index(req, res) {
    const peoples = await Peoples.findAll({
      where: { status: true },
      peoples: ['id', 'name', 'birth_date', 'fone', 'email'],
    });

    return res.json(peoples);
  }

  async store(req, res) {
    // OBRIGATÓRIOS
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      birth_date: Yup.string().required(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const {
      users_id,
      name,
      birth_date,
      fone,
      cpf,
      rg,
      provider,
      email,
      created_at,
      updated_at,
    } = req.body;

    const peoples = await Peoples.create({
      users_id,
      name,
      birth_date,
      fone,
      cpf,
      rg,
      provider,
      email,
      created_at,
      updated_at,
    });

    return res.json(peoples);
  }

  async update(req, res) {
    const {
      users_id,
      name,
      birth_date,
      fone,
      cpf,
      rg,
      provider,
      email,
      created_at,
      updated_at,
    } = req.body;

    const peoples = await Peoples.update(
      {
        users_id,
        name,
        birth_date,
        fone,
        cpf,
        rg,
        provider,
        email,
        created_at,
        updated_at,
      },
      { where: { id: req.params.id } }
    );

    return res.json({
      users_id,
      name,
      birth_date,
      fone,
      cpf,
      rg,
      provider,
      email,
      created_at,
      updated_at,
    });
  }

  async delete(req, res) {
    const peoples = await Peoples.findByPk(req.params.id);

    peoples.status = false;

    await peoples.save();

    return res.json(peoples);
  }
}

export default new PeoplesController();
