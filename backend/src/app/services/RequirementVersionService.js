import _ from 'lodash';

import Requirement from '../models/Requirement';
import Complexity from '../models/Complexity';
import Situation from '../models/Situation';
import Priority from '../models/Priority';

class RequirementVersionService {
  async index(req, res) {

    const requirements = await Requirement.findAll({
      where: { project_id: req.params.projectId, parent_id: req.params.parentId, deleted_at: null },
      order: [['version', 'DESC']],
      attributes: [
        'id',
        'requirement_id',
        'name',
        'description',
        'latest_version',
        'non_functional',
        'parent_id',
        'version',
        'createdAt',
        'updatedAt',
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

    if (_.isEmpty(requirements)) {
      return res.status(400).json({ error: 'Project not found.' });
    }

    return res.json(requirements);
  }
}

export default new RequirementVersionService();
