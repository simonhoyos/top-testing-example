const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

module.exports = {
  async auth(req, res, next) {
    try {
      const token = req.headers.authorization;

      if(!token) {
        throw Error('Your session has expired');
      }

      const { id } = jwt.verify(token, process.env.SECRET);

      const user = await User.findById(id);

      req.user = user;
      next();
    } catch (error) {
      res.status(401).json({ message: error.message });
    }
  }
}
