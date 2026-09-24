import { verifyToken } from '../helpers/jwt.helper.js';

const checkAuth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ ok: false, error: 'Token no proporcionado' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ ok: false, error: 'Token inválido o expirado' });
  }
};

const checkRole = (...allowedRoles) => {
  return (req, res, next) => {
    const userRoles = req.user?.roles || [];
    const hasPermission = userRoles.some((role) => allowedRoles.includes(role));

    if (!hasPermission) {
      return res.status(403).json({ ok: false, error: 'No tenés permisos para esta acción' });
    }
    next();
  };
};

export { checkAuth, checkRole };
