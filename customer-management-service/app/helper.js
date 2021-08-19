const bcrypt = require('bcrypt');


const hashPassword = async (password) => {
    const passwordhashed = bcrypt.hashSync(password, 10);
    return passwordhashed;
  }

  const checkPassword = async (dataPassword, dbPassword)  => {
    return bcrypt.compareSync(dataPassword, dbPassword);
  }

  module.exports = {
      hashPassword,
      checkPassword
    };