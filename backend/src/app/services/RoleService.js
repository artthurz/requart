import User from '../models/User';

class RoleService {
  async update(req, res) {

    const user = await User.findByPk(req.params.id);

    if (!user) {
        return res.status(400).json({ error: 'User dont exists.' });
    }  

    await User.update(
      { admin: user.admin ? false : true},
      { where: { id: req.params.id } }
    );

    return res.status(200).json({ success: 'Role updated with success.'})
  }
}

export default new RoleService();