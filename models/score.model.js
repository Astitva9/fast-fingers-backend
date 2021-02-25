module.exports = (sequelize, Sequelize) => {
	const Score = sequelize.define("Score", {
        userId: {
			type: Sequelize.STRING,
		},
		score:{
            type: Sequelize.STRING,
        }
	});

	return Score;
};
