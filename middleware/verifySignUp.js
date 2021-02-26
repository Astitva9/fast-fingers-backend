const db = require("../models");
const User = db.users;
var response={};
checkDuplicateEmail = (req, res, next) => {
  User.findOne({
    where: {
      email: req.body.EMAIL
    }
  }).then(user => {
    if (user) {
      response.status="error";
      response.message="Failed! Email is already in use!";
      res.status(404).send(response);
      return;
    }
    next();
  });
};

const verifySignUp = {
  checkDuplicateEmail: checkDuplicateEmail
};

module.exports = verifySignUp;