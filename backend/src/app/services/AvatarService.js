import Avatar from '../models/Avatar';
import path from 'path';
import fs from 'fs';
import User from '../models/User';

import uploadConfig from '../../config/multerAvatar';

class AvatarService {
  async store(req, res) {
    const { originalname: name, filename: avatarPath } = req.file;

    const file = await Avatar.create({
      name,
      path: avatarPath,
    });

    return res.json(file);
  }

  async update(req, res) {
    const user = await User.findByPk(req.userID);

    if (!user) {
      return res
        .status(400)
        .json({ error: 'Only authenticated users can change avatar.' });
    }

    const avatarId = user.avatar_id;

    if (avatarId && avatarId !== 1) {
      const userFile = await Avatar.findByPk(avatarId);
      const userAvatarFilePath = path.join(
        uploadConfig.directory,
        userFile.path
      );

      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);

        await User.update(
          {
            avatar_id: req.params.id,
          },
          { where: { id: req.userID } }
        );

        const avatar = await Avatar.findByPk(avatarId);

        return res.json(avatar);
      }
    }

    const avatar = await User.update(
      {
        avatar_id: req.params.id,
      },
      { where: { id: req.userID } }
    );

    return res.json(avatar);
  }

  async delete(req, res) {
    const file = await Avatar.findByPk(req.params.id);
    const userAvatarFilePath = path.join(uploadConfig.directory, file.path);
    await fs.promises.unlink(userAvatarFilePath);

    await Avatar.destroy({ where: { id: req.params.id } });

    return res.status(200).json({ success: 'File deleted with success.' });
  }
}

export default new AvatarService();
