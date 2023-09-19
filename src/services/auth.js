const jwt = require('jsonwebtoken');
const userModel = require('../models/users/users.model');

async function verifyToken(req, res, next){
    const authorizationHeader = req.headers.authorization;
  let result;
  if (!authorizationHeader)
    return res.status(401).json({
      error: true,
      message: "Access token is missing",
    });
  const token = req.headers.authorization.split(" ")[1]; // Bearer <token>
  const options = {
    expiresIn: "1h",
  };
  try {
    let user = await userModel.findUser({
      accessToken: token,
    });
    if (!user) {
      result = {
        error: true,
        message: `Authorization error`,
      };
      return res.status(403).json(result);
    }
    result = jwt.verify(token, process.env.JWT_SECRET, options);
    if (!user.userId === result.id) {
      result = {
        error: true,
        message: `Invalid token`,
      };
      return res.status(401).json(result);
    }
    
    req.user = user;  // append the result in the "decoded" field of req
    
    next();
  } catch (err) {
    console.error(err);
    if (err.name === "TokenExpiredError") {
      result = {
        error: true,
        message: `TokenExpired`,
      };
    } else {
      result = {
        error: true,
        message: `Authentication Error`,
      };
    }
    return res.status(403).json(result);
  }
}

module.exports = {
    verifyToken
}