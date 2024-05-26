const jwt = require('jsonwebtoken');
const sequelizeDB = require('../config/connection');

exports.isLoggedIn = async (req, res, next) => {
  // console.log('BEARER:', req.headers.authorization.split(" ")[1]);
  const token =
    req.headers.authorization && req.headers.authorization.split(' ')[1]; //When working with react
  if (!token) {
    // console.log('Authentication failed!');
    return res.status(401).send({
      status: 'fail',
      message: 'Authentication Failed: Please use proper credentails!',
    });
  }

  try {
    const verified = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    // const user = await User.findOne({ where: { id: verified.id } });
    if (!verified) {
      return res.status(401).json({
        error: `You need to be logged in to access this route.`,
      });
    }

    let attributes = [
      'id',
      'fullname',
      'email',
      'address',
      'role',
      'city',
      'phone',
      'is_active',
    ];

    let userObj = await sequelizeDB.query(
      `SELECT ${attributes.join(', ')} FROM users WHERE id=${verified.id}`,
      {
        type: sequelizeDB.QueryTypes.SELECT,
      }
    );

    // console.log('USER OBJECT:', userObj);
    req.user = userObj[0];

    // console.log('VERIFIED USER:', req.user);
    next();
  } catch (err) {
    return res.status(401).json({
      msg: err,
      error: `Unauthorized`,
    });
    // return res.status(401).redirect('/login');
  }
};
