import * as Yup from 'yup';
import Priority from '../models/Priority';

class PriorityService {
  async index(req, res) {
    const priorities = await Priority.findAll({ where: { deleted_at: null } });

    return res.json(priorities);
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

    const priortityExists = await Priority.findOne({
      where: { name: req.body.name },
    });

    if (priortityExists && priortityExists.deleted_at !== null) {
      return res.status(400).json({ error: 'Priority already exists.' });
    }
    if (priortityExists) {
      await priortityExists.update({
        deleted_at: null,
        description: req.body.description,
        color: req.body.color,
      });
      return res.json(priortityExists);
    }

    const { id, name, description, color } = await Priority.create({
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
      color: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { name } = req.body;

    const priority = await Priority.findByPk(req.params.id);

    if (!priority) {
      return res.status(400).json({ error: 'Priority dont exists.' });
    } else if (name !== priority.name) {
      const priortityExists = await Priority.findOne({
        where: { name },
      });

      if (priortityExists) {
        return res.status(400).json({ error: 'Priority name already in use.' });
      }
    }

    await priority.update(req.body);

    return res.json(priority);
  }

  async delete(req, res) {
    const priority = await Priority.findByPk(req.params.id);

    if (!priority) {
      return res.status(400).json({ error: 'Priority dont exists.' });
    }

    priority.deleted_at = new Date();

    await priority.save();

    return res.json(priority);
  }
}

export default new PriorityService();
