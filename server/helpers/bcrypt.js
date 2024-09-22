const bcrypt = require("bcryptjs");
const hash = (password) => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
};

const compare = (password, hashPassword) => {
  return bcrypt.compareSync(password, hashPassword);
};

module.exports = {
  compare,
  hash,
};
