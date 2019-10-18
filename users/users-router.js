const router = require('express').Router();

const Users = require('./users-model.js');
const restricted = require('../auth/restricted-middleware.js');

router.get('/', restricted, (req, res) => {
  
  // WHEN ADMIN CAN ONLY SEE LIST OF USERS
  // const { id, role } = req.decodedToken;
  // console.log(id, role)

  // if (role === 'admin') {
  //   Users.find()
  //     .then(users => {
  //       res.json(users);
  //     })
  //     .catch(err => res.status(500).send(err));
  // } else {
  //   Users.findById(id)
  //     .then(user => {
  //       res.json(user);
  //     })
  //     .catch(err => res.status(500).send(err));
  // }

  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'Error getting users'})
    })
});

module.exports = router;