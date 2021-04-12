import * as Yup from 'yup';
import Situation from '../models/Situation';

class SituationService {
  async index(req, res) {
    const situations = await Situation.findAll({ where: { deleted_at: null } });

    return res.json(situations);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      description: Yup.string().required(),
      color: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const situationExists = await Situation.findOne({
      where: { name: req.body.name },
    });

    if (situationExists && situationExists.deleted_at !== null) {
      return res.status(400).json({ error: 'Situation already exists.' });
    } else if (situationExists) {
      await situationExists.update({
        deleted_at: null,
        description: req.body.description,
        color: req.body.color,
      });
      return res.json(situationExists);
    }

    const { id, name, description, color } = await Situation.create({
      ...req.body,
    });

    return res.json({
      id,
      name,
      description,
      color,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      description: Yup.string(),
      color: Yup.string()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { name } = req.body;

    const situation = await Situation.findByPk(req.params.id);

    if (!situation) {
      return res.status(400).json({ error: 'Situation dont exists.' });
    } else if (name !== situation.name) {
      const situationExists = await Situation.findOne({
        where: { name },
      });

      if (situationExists) {
        return res.status(400).json({ error: 'Situation name already in use.' });
      }
    }

    await situation.update(req.body);

    return res.json(situation);
  }

  async delete(req, res) {
    const situation = await Situation.findByPk(req.params.id);

    if (!situation) {
      return res.status(400).json({ error: 'Situation dont exists.' });
    }

    situation.deleted_at = new Date;

    await situation.save();

    return res.json(situation);
  }
}

export default new SituationService();
