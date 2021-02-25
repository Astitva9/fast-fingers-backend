const db = require("../models");
const Scores = db.scores;

exports.storeScore = async (req, res) => {
  const userID = req.params.userID;
  const userScore = req.params.userScore;
  try {
    var result = await Scores.create({
      userId: userID,
      score: userScore,
    });

    let scoreDetails = JSON.parse(JSON.stringify(result));

    if (scoreDetails) {
      return res.status(200).json({
        status: true,
        message: "Successfully Stored",
      });
    }

    return res.status(500).json({
      status: false,
      message: "Something Went Wrong!",
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error,
    });
  }
};

exports.getScore = async (req, res) => {
  const userID = req.params.userID;
  try {
    const getUserScores = JSON.parse(
      JSON.stringify(await Scores.findAll({ where: { userId: userID } }))
    );

    if (getUserScores) {
      return res.status(200).json({
        status: true,
        message: getUserScores,
      });
    } else {
      return res.status(500).json({
        status: false,
        message: "Something Went Wrong!",
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error,
    });
  }
  
};
