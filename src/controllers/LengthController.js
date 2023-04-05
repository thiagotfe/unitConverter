/* eslint-disable prefer-const */
import { get } from 'lodash';

class LengthController {
  async convert(req, res) {
    try {
      return res.json({ ok: 'ok' });
    } catch (e) {
      const eToMap = get(e, 'errors', [{ message: 'Unknown error' }]);
      return res.status(400).json({
        errors: eToMap.map((err) => err.message),
      });
    }
  }
}
export default new LengthController();
