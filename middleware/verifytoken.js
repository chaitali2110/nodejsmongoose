const jwt = require("jsonwebtoken");

const verifyUser = (req, res, next) => {
    const token = req.header("auth-token");

    if (!token) return res.status(400).json({ error: 'Access Denied' });
  
    try {
      const verifiedUser = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.user = verifiedUser;
      next();
    } catch (err) {
      return res.status(400).json({ error: 'Invalid Token' });   
    }
};

module.exports = verifyUser;
