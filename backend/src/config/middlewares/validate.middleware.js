import { validationResult } from 'express-validator';

const validateFields = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ ok: false, error: errors.array() });
  }
  next();
};

export { validateFields };
