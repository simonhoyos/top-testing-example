const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const { transporter, welcome, verify } = require('../utils/mail');

module.exports = {
  async signup(req, res) {
    try {
      const password = await bcrypt.hash(req.body.password, 8);
      const user = await User.create({ email: req.body.email, password });

      // verify(transporter);

      const token = jwt.sign(
        { id: user._id },
        process.env.SECRET,
        { expiresIn: 60 * 60 * 24 * 365 }
      );

      const mail = {
        from: '"Tasks App" <simonhoyos@aol.com>',
        to: user.email,
        subject: 'Welcome',
        ...welcome(user.email),
      };

      await transporter.sendMail(mail);

      res.status(200).json({ token });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  async signin(req, res) {
    try {
      const user = await User.findOne({ email: req.body.email });

      if(!user) {
        throw Error('Invalid email or password');
      }

      const isValid = await bcrypt.compare(req.body.password, user.password);

      if(!isValid) {
        throw Error('Invalid email or password');
      }

      const token = jwt.sign(
        { id: user._id },
        process.env.SECRET,
        { expiresIn: 60* 60* 24 * 365 },
      );

      res.status(200).json({ token });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}
