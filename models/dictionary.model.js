module.exports = (sequelize, Sequelize) => {
	const Dictionary = sequelize.define("Dictionary", {
        word: {
			type: Sequelize.STRING,
		},
		wordLength:{
            type: Sequelize.INTEGER,
        }
	});

	return Dictionary;
};
