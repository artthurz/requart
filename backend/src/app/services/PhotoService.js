import path from 'path';
import fs from 'fs';
import Photo from '../models/Photo';

import uploadConfig from '../../config/multerPhoto';

class PhotoService {
  async store(req, res) {
    const { originalname: name, filename: photoPath } = req.file;

    const photo = await Photo.create({
      name,
      path: photoPath,
    });

    return res.json(photo);
  }

  async update(req, res) {
    return res.status(200).json({ success: 'Update not implemented yet' });
  }

  async delete(req, res) {
    const file = await Photo.findByPk(req.params.id);
    const requirementPhotoPath = path.join(uploadConfig.directory, file.path);
    await fs.promises.unlink(requirementPhotoPath);

    await Photo.destroy({where: { id: req.params.id}});
    
    return res.status(200).json({ success: 'Photo deleted with success.' });
  }
}

export default new PhotoService();
