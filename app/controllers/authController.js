const db = require('../models'),
  Profile = db.profile,
  Role = db.role,
  Op = db.Sequelize.Op,
  jwt = require('jsonwebtoken'),
  bcrypt = require('bcryptjs'),
  secretKey = process.env.SECRET_KEY;

exports.signup = (req, res) => {
  // Save User to Database
  Profile.create({
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  })
    .then((profile) => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles,
            },
          },
        }).then((roles) => {
          profile.setRoles(roles).then(() => {
            res.send({ message: 'Пользователь зарегестрирован!' });
          });
        });
      } else {
        // user role = 1
        profile.setRoles([1]).then(() => {
          res.send({ message: 'Пользователь зарегестрирован!' });
        });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
exports.signin = (req, res) => {
  Profile.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then((profile) => {
      if (!profile) {
        return res.status(404).send({ message: 'Пользователь не существует.' });
      }
      var passwordIsValid = bcrypt.compareSync(req.body.password, profile.password);
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: 'Пароль не верен!',
        });
      }
      var token = jwt.sign({ id: profile.id }, secretKey, {
        expiresIn: '24h', // 24 hours
      });
      var authorities = [];
      profile.getRoles().then((roles) => {
        roles.forEach((item) => {
          authorities.push('ROLE_' + item.name.toUpperCase());
        });
        res.status(200).send({
          id: profile.id,
          email: profile.email,
          roles: authorities,
          accessToken: token,
        });
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
