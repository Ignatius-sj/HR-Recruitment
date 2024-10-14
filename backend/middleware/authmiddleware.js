const verifyRole = (allowedRoles) => {
    return (req, res, next) => {
      const user = req.session.user; 
      if (user && allowedRoles.includes(user.role)) {
        req.user = user;
        next();
      } else {
        res.status(403).json({ error: 'Access denied' });
      }
    };
  };
  
  module.exports = { verifyRole };
  