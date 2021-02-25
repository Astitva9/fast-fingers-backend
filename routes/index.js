var express = require("express");
var router = express.Router();
const controller = require("../controllers/user.controller");
const scoreController = require("../controllers/score.controller");

const { verifySignUp,checkToken } = require("../middleware");
const { check, validationResult, body } = require("express-validator");

const validate = (validations) => {
  return async (req, res, next) => {
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    res.status(422).json({
      errors: errors.array(),
    });
  };
};

router.post(
  "/signup",
  [verifySignUp.checkDuplicateEmail],
  validate([
    body("USERNAME").not().isEmpty().withMessage("Please Enter the Username."),
    body("EMAIL")
      .not()
      .isEmpty()
      .isEmail()
      .withMessage("Please Enter the valid Email Address."),
    body("PASSWORD")
      .not()
      .isEmpty()
      .isLength({
        min: 5,
      })
      .withMessage("Password must be at least 5 character long"),
  ]),
  controller.signup
);

router.post(
  "/signIn",
  validate([
    body("EMAIL")
      .not()
      .isEmpty()
      .isEmail()
      .withMessage("Please Enter the valid Email Address."),
    body("PASSWORD")
      .not()
      .isEmpty()
      .isLength({
        min: 5,
      })
      .withMessage("Password must be at least 5 character long"),
  ]),
  controller.signIn
);

router.put(
  "/storeScore/:userID/:userScore",
  checkToken,
  validate([
    check("userID")
      .not()
      .isEmpty()
      .withMessage("Please Provide the valid User ID."),
    check("userScore")
      .not()
      .isEmpty()
      .withMessage("Please Provide the User Score."),
  ]),
  scoreController.storeScore
);

router.get(
  "/getScore/:userID",
  checkToken,
  validate([
    check("userID")
      .not()
      .isEmpty()
      .withMessage("Please Provide the valid User ID."),
  ]),
  scoreController.getScore
);

router.get(
  "/getNewWord/:minWordLength/:maxWordLength",
  checkToken,
  validate([
    check("minWordLength")
      .not()
      .isEmpty()
      .withMessage("Please Provide the valid Minimum Word Length."),
    check("maxWordLength")
      .not()
      .isEmpty()
      .withMessage("Please Provide the valid Maximum Word Length."),
  ]),
  controller.getNewWord
);

module.exports = router;
