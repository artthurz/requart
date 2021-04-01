import * as Yup from 'yup';
import User from '../models/User';
import File from '../models/File';

class UserService {
  async index(req, res) {
    const users = await User.findAll({
      where: { deleted_at: null },
      users: ['id', 'name', 'login', 'admin'],
    });

    return res.json(users);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.email().required(),
      login: Yup.string().required(),
      password: Yup.string().required().min(6),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const userExists = await User.findOne({ where: { login: req.body.login } });

    if (userExists) {
      return res.status(400).json({ error: 'User already exists.' });
    }

    const { id, name, email, login, admin, avatar_id } = await User.create({
      ...req.body,
      avatar_id: 1,
    });

    return res.json({
      id,
      name,
      email,
      login,
      admin,
      avatar_id,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.email(),
      login: Yup.string(),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { login, oldPassword } = req.body;

    const user = await User.findByPk(req.userID);

    if (login !== user.login) {
      const userExists = await User.findOne({
        where: { login },
      });

      if (userExists) {
        return res.status(400).json({ error: 'User already exists.' });
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    await user.update(req.body);

    const { id, name, email, avatar } = await User.findByPk(req.userID, {
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

    return res.json({
      id,
      name,
      email,
      login,
      avatar,
    });
  }

  async delete(req, res) {
    const users = await User.findByPk(req.params.id);

    users.deleted_at = new Date;

    await users.save();

    return res.json(users);
  }
}

export default new UserService();
