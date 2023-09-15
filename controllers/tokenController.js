const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const mySecret = process.env.TOKENSECRET;

const signToken = (data) => {
  return jwt.sign(data, mySecret, { expiresIn: '1h' });
};

const verifyToken = (token) => {
  const decoded = jwt.verify(token, mySecret);
  console.log(decoded, "este es el decoded");
  return decoded;

};

module.exports = {
  signToken,
  verifyToken,
};
