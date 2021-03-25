import _ from 'lodash';

import Requirement from '../models/Requirement';
import Complexity from '../models/Complexity';
import Situation from '../models/Situation';
import Priority from '../models/Priority';

class RequirementVersionService {
  async index(req, res) {
    const { page = 1 } = req.query;

    const requirements = await Requirement.findAll({
      where: { project_id: req.params.projectId, requirement_id: req.params.requirementId, non_functional: req.params.nonFunctional, deleted_at: null },
      order: [['version', 'DESC']],
      attributes: [
        'id',
        'requirement_id',
        'name',
        'description',
        'latest_version',
        'non_functional',
        'version',
        'created_at',
        'updated_at',
      ],
      limit: 10,
      offset: (page - 1) * 10,
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

    if (_.isEmpty(requirements)) {
      return res.status(400).json({ error: 'Project not found.' });
    }

    return res.json(requirements);
  }
}

export default new RequirementVersionService();
