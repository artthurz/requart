import File from '../models/File';
import path from 'path';
import fs from 'fs';
import User from '../models/User';

import uplloadConfig from '../../config/multer';

class FileService {
  async store(req, res) {
    const { originalname: name, filename: avatarPath } = req.file;

    const file = await File.create({
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
      const userFile = await File.findByPk(avatarId);
      const userAvatarFilePath = path.join(
        uplloadConfig.directory,
        userFile.path
      );
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);

        await User.update(
          {
            avatar_id: req.params.id
          },
          { where: { id: req.userID } }
        );

        const file = await File.findByPk(avatarId);

        return res.json(file);
      }
    }

    const file = await User.update(
      {
        avatar_id: id
      },
      { where: { id: req.userID } }
    );

    return res.json(file);
  }

  async delete(req, res) {
    await File.destroy({where: { id: req.params.id}});
    
    return res.status(200).json({ success: 'File deleted with success.' });
  }
}

export default new FileService();
