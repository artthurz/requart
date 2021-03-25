import Audit from '../models/Audit';

class AuditController {
  async index(req, res) {
    const audit = await Audit.findAll({
      audit: [
        'date_action',
        'operation',
        'table_action',
        'text_action',
        'user_id',
      ],
    });

    return res.json(audit);
  }
}

export default new AuditController();
