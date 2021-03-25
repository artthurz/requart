import * as Yup from 'yup';
import Project from '../models/Project';
import _ from 'lodash';

class ProjectService {
  async index(req, res) {
    const projects = await Project.findAll({ where: { deleted_at: null } });

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
      owner_id: Yup.number().required()
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
        status: Yup.boolean()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const project = await Project.findByPk(req.params.id);

    await project.update(req.body);

    return res.json(project);
  }


  async delete(req, res) {
    const project = await Project.findByPk(req.params.id);

    if (!project) {
      return res.status(400).json({ error: 'Project dont exists.' });
    }

    project.deleted_at = new Date;

    await project.save();

    return res.json(project);
  }
}

export default new ProjectService();
