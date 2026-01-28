const { ROLES } = require('../config/constants');

const rbac =
  (roles = []) =>
  (req, res, next) => {
    if (!req.user) return res.status(401).json({ message: 'Unauthorized' });
    const allowed = Array.isArray(roles) ? roles : [roles];
    if (allowed.length === 0) return next();
    if (!allowed.includes(req.user.role)) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    next();
  };

module.exports = { rbac, ROLES };
