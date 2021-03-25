import User from '../models/User';
import Role from '../models/Role';

class RolePermissionController {
  async index(req, res) {
    const user = await User.findAll({
      where: { id: req.userID },
      include: [
        {
          model: Role,
          as: 'role',
        },
      ],
    });

    return res.json(user);
  }
}

export default new RolePermissionController();
