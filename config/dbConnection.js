module.exports = {
	dialect: "mysql",
	pool: {
		max: 5,
		min: 0,
		acquire: 200000,
		idle: 10000,
	},
};
