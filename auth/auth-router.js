const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('../users/users-model.js');

router.post('/register', (req, res) => {

  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 8); // 2 ^ n
  user.password = hash;
  Users.add(user)
    .then(id => {
      res.status(201).json({
        message: "User registed",
        id
      });
    })
    .catch(err => {
      res.status(500).json(err);
    })
});

router.post('/login', (req, res) => {
  let { username, password } = req.body;

  Users
    .findByUsername(username)
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);

        res.status(200).json({
          message: `Hi, ${user.username}! You are logged in!` ,
          token
        });
      } else {
        res.status(401).json({ message: "Invalid password" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Error logging in user" });
    });
});


function generateToken(user) {
  const payload = {
    username: user.username,
    id: user.id,
    // .. other data
  };
  const options = {
    expiresIn: '1d',
  };
  return jwt.sign(payload, process.env.JWT_SECRET, options);
}

module.exports = router;