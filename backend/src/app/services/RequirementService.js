import * as Yup from 'yup';
import sequelize, { Op } from 'sequelize';
import _ from 'lodash';

import Requirement from '../models/Requirement';
import Complexity from '../models/Complexity';
import Situation from '../models/Situation';
import Priority from '../models/Priority';
import Photo from '../models/Photo';

class RequirementService {
  async index(req, res) {
    // const { page = 1 } = req.query;

    const requirements = await Requirement.findAll({
      where: {
        project_id: req.params.projectId,
        latest_version: true,
        deleted_at: null,
      },
      order: ['non_functional', 'requirement_id'],
      attributes: [
        'id',
        'requirement_id',
        'name',
        'description',
        'non_functional',
        'parent_id',
        'version',
        'latitude',
        'longitude',
        'createdAt',
        'updatedAt',
      ],
      // limit: 10,
      // offset: (page - 1) * 10,
      include: [
        {
          model: Complexity,
          as: 'complexity',
          attributes: ['id', 'name', 'color'],
        },
        {
          model: Situation,
          as: 'situation',
          attributes: ['id', 'name', 'color'],
        },
        {
          model: Priority,
          as: 'priority',
          attributes: ['id', 'name', 'color'],
        },
        {
          model: Photo,
          as: 'firstFile',
          attributes: ['id', 'path', 'url'],
        },
        {
          model: Photo,
          as: 'secondFile',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

    if (_.isEmpty(requirements)) {
      return res.status(400).json({ error: 'Requirements not found.' });
    }

    return res.json(requirements);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      description: Yup.string().required(),
      non_functional: Yup.boolean().required(),
      project_id: Yup.number().required(),
      priority_id: Yup.number().required(),
      first_file_id: Yup.number(),
      second_file_id: Yup.number(),
      complexity_id: Yup.number().required(),
      situation_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { project_id, non_functional } = req.body;

    const data = await Requirement.findOne({
      where: { project_id, non_functional, latest_version: true, deleted_at: null },
      attributes: ['requirement_id'],
      order: [['createdAt', 'DESC']],
    });

    const reqId = !_.isNull(data) ? data.requirement_id + 1 : 1;

    const requirement = await Requirement.create({
      ...req.body,
      requirement_id: reqId,
      version: 1,
    });

    await Requirement.update(
      {
        parent_id: requirement.id,
      },
      {
        where: {
          id: requirement.id,
        },
      }
    );

    const response = await Requirement.findByPk(requirement.id, {
      attributes: [
        'id',
        'requirement_id',
        'name',
        'description',
        'parent_id',
        'non_functional',
        'version',
        'created_at',
        'updated_at',
      ],
      include: [
        {
          model: Complexity,
          as: 'complexity',
          attributes: ['id', 'name', 'color'],
        },
        {
          model: Situation,
          as: 'situation',
          attributes: ['id', 'name', 'color'],
        },
        {
          model: Priority,
          as: 'priority',
          attributes: ['id', 'name', 'color'],
        },
        {
          model: Photo,
          as: 'firstFile',
          attributes: ['id', 'path', 'url'],
        },
        {
          model: Photo,
          as: 'secondFile',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

    return res.json(response);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      description: Yup.string().required(),
      non_functional: Yup.boolean().required(),
      project_id: Yup.number().required(),
      priority_id: Yup.number().required(),
      complexity_id: Yup.number().required(),
      situation_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { non_functional: nf, project_id } = req.body;

    const oldRequirement = await Requirement.findByPk(req.params.id);

    let lastInvertedTypeRequirementId;

    if (nf !== oldRequirement.non_functional) {
      lastInvertedTypeRequirementId = await Requirement.findOne({
        where: {
          project_id,
          parent_id: {
            [Op.ne]: oldRequirement.parent_id,
          },
          latest_version: true,
          non_functional: nf,
          deleted_at: null,
        },
        attributes: ['requirement_id'],
        order: [['requirement_id', 'DESC']],
      });

      console.log('🚀🐱‍🏍🚀🐱‍🏍🚀🐱‍🏍🚀💥💥',lastInvertedTypeRequirementId);

      const reqVersion = oldRequirement.version + 1;

      const reqId = lastInvertedTypeRequirementId
        ? lastInvertedTypeRequirementId.requirement_id + 1
        : 1;

      const requirement = await Requirement.create({
        ...req.body,
        requirement_id: reqId,
        parent_id: oldRequirement.parent_id,
        version: reqVersion,
        created_at: oldRequirement.created_at,
      });

      await Requirement.update(
        {
          requirement_id: requirement.requirement_id,
          latest_version: false,
        },
        {
          where: {
            id: {
              [Op.lt]: requirement.id,
            },
            parent_id: oldRequirement.parent_id,
            project_id: oldRequirement.project_id,
          },
        }
      );

      await Requirement.update(
        { requirement_id: sequelize.literal('requirement_id - 1') },
        {
          where: {
            requirement_id: {
              [Op.gt]: oldRequirement.requirement_id,
            },
            non_functional: oldRequirement.non_functional,
            project_id: oldRequirement.project_id,
          },
        }
      );

      const response = await Requirement.findByPk(requirement.id, {
        attributes: [
          'id',
          'requirement_id',
          'name',
          'description',
          'parent_id',
          'non_functional',
          'version',
          'created_at',
          'updated_at',
        ],
        include: [
          {
            model: Complexity,
            as: 'complexity',
            attributes: ['id', 'name', 'color'],
          },
          {
            model: Situation,
            as: 'situation',
            attributes: ['id', 'name', 'color'],
          },
          {
            model: Priority,
            as: 'priority',
            attributes: ['id', 'name', 'color'],
          },
        ],
      });

      return res.json(response);
    }
    const reqVersion = oldRequirement.version + 1;

    const requirement = await Requirement.create({
      ...req.body,
      requirement_id: oldRequirement.requirement_id,
      parent_id: oldRequirement.parent_id,
      version: reqVersion,
      created_at: oldRequirement.created_at,
    });

    const response = await Requirement.findByPk(requirement.id, {
      attributes: [
        'id',
        'requirement_id',
        'name',
        'description',
        'parent_id',
        'non_functional',
        'version',
        'created_at',
        'updated_at',
      ],
      include: [
        {
          model: Complexity,
          as: 'complexity',
          attributes: ['id', 'name', 'color'],
        },
        {
          model: Situation,
          as: 'situation',
          attributes: ['id', 'name', 'color'],
        },
        {
          model: Priority,
          as: 'priority',
          attributes: ['id', 'name', 'color'],
        },
      ],
    });

    await oldRequirement.update({ latest_version: false });

    return res.json(response);
  }

  async delete(req, res) {
    const requirement = await Requirement.findByPk(req.params.id);

    if (_.isEmpty(requirement)) {
      return res.status(400).json({ error: 'Requirement not found.' });
    }

    await Requirement.update(
      { deleted_at: new Date(), requirement_id: null },
      {
        where: {
          parent_id: requirement.parent_id,
        },
      }
    );

    await Requirement.update(
      { requirement_id: sequelize.literal('requirement_id - 1') },
      {
        where: {
          requirement_id: {
            [Op.gt]: requirement.requirement_id,
          },
          non_functional: requirement.non_functional,
          project_id: requirement.project_id,
        },
      }
    );

    return res
      .status(200)
      .json({ success: 'Requirement deleted with success.' });
  }
}

export default new RequirementService();
