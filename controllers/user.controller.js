const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;
var bcrypt = require("bcryptjs");
var salt = bcrypt.genSaltSync(10);
var jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  const body = req.body;

  try {
    var result = await User.create({
      username:body.USERNAME,
      email: body.EMAIL,
      password: bcrypt.hashSync(body.PASSWORD, salt),
    });

    let user_details = JSON.parse(JSON.stringify(result));
    console.log("user_id", user_details.id);

    if (user_details) {
      const jsonToken = jwt.sign(
        {
          result: body.EMAIL,
        },
        process.env.JWTSECRET,
        {
          expiresIn: "24h",
        }
      );

      return res.status(200).json({
        status: true,
        message: "Registered Successfully",
        token: jsonToken,
        userID:user_details.id
      });
    } else {
      return res.status(500).json({
        status: false,
        message: "Something went Wrong",
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error,
    });
  }
};

exports.signIn = (req, res) => {
  User.findOne({
    where: {
      email: req.body.EMAIL
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.PASSWORD,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      const jsonToken = jwt.sign({
        result: user.email
       }, process.env.JWTSECRET, {
        expiresIn: "24h"
       });

       return res.status(200).json({
        status: true,
        message: "Logged in successfully",
        token: jsonToken,
        userID:user.id
       });
    })
    .catch(err => {
      return res.status(500).json({
        status: false,
        message: err.message
       });
     
    });
};
