const dbConfig = require("../config/dbConnection");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(process.env.DB, process.env.DBUSER, process.env.PASSWORD, {
	host: process.env.HOST,
	dialect: dbConfig.dialect,
	operatorsAliases: false,

	pool: {
		max: dbConfig.pool.max,
		min: dbConfig.pool.min,
		acquire: dbConfig.pool.acquire,
		idle: dbConfig.pool.idle,
	},
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./users.model.js")(sequelize, Sequelize);
db.scores = require("./score.model.js")(sequelize, Sequelize);
db.dictionary = require("./dictionary.model")(sequelize, Sequelize);


module.exports = db;
