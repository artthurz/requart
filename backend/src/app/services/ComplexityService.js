import * as Yup from 'yup';
import Complexity from '../models/Complexity';

class ComplexityService {
  async index(req, res) {
    const complexities = await Complexity.findAll({
      where: { deleted_at: null },
    });

    return res.json(complexities);
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

    const complexityExists = await Complexity.findOne({
      where: { name: req.body.name },
    });

    if (complexityExists && complexityExists.deleted_at !== null) {
      return res.status(400).json({ error: 'Complexity already exists.' });
    }
    if (complexityExists) {
      await complexityExists.update({
        deleted_at: null,
        description: req.body.description,
        color: req.body.color,
      });
      return res.json(complexityExists);
    }

    const { id, name, description, color } = await Complexity.create({
      ...req.body,
    });

    return res.json({
      id,
      name,
      description,
      color,
      deleted_at,
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

    const complexity = await Complexity.findByPk(req.params.id);

    if (!complexity) {
      return res.status(400).json({ error: 'Complexity dont exists.' });
    }
    if (name !== complexity.name) {
      const complexityExists = await Complexity.findOne({
        where: { name },
      });

      if (complexityExists) {
        return res
          .status(400)
          .json({ error: 'Complexity name already in use.' });
      }
    }

    await complexity.update(req.body);

    return res.json(complexity);
  }

  async delete(req, res) {
    const complexity = await Complexity.findByPk(req.params.id);

    if (!complexity) {
      return res.status(400).json({ error: 'Complexity dont exists.' });
    }

    complexity.deleted_at = new Date();

    await complexity.save();

    return res.json(complexity);
  }
}

export default new ComplexityService();
