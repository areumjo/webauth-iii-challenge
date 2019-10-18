const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        console.log('failed verify', err);
        res.status(400).json({
          message: 'Not verified'
        })
      } else {
        // verified token
        req.user = decodedToken;
        next();
      }
    })
  } else {
    res.status(400).json({
      message: 'no token provided'
    })
  }
}