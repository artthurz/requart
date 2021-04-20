import * as Yup from 'yup';
import _ from 'lodash';
import Project from '../models/Project';
import User from '../models/User';

class ProjectService {
  async index(req, res) {
    const projects = await Project.findAll({ where: { deleted_at: null },
      include: [
      {
        model: User,
        as: 'owner',
        attributes: ['id', 'name'],
      }]
    });

    if (_.isEmpty(projects)) {
      return res.status(400).json({ error: 'Project not found.' });
    }

    return res.json(projects);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      description: Yup.string().required(),
      delivery_date: Yup.date().required(),
      owner_id: Yup.number().required(),
      link: Yup.string()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const project = await Project.create({
      ...req.body,
    });

    return res.json(project);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
        name: Yup.string(),
        description: Yup.string(),
        delivery_date: Yup.date(),
        owner_id: Yup.number(),
        status: Yup.boolean(),
        link: Yup.string()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const project = await Project.findByPk(req.params.id);

    if (_.isEmpty(project)) {
      return res.status(400).json({ error: 'Project not found.' });
    }

    await project.update(req.body);

    return res.json(project);
  }


  async delete(req, res) {
    const project = await Project.findByPk(req.params.id);

    if (_.isEmpty(project)) {
      return res.status(400).json({ error: 'Project not found.' });
    }

    project.deleted_at = new Date;

    await project.save();

    return res.json(project);
  }
}

export default new ProjectService();
