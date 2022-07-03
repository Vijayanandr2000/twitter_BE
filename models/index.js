const Sequelize = require('sequelize');
const dbConfig = require('../config/config.json');
const env = "dev";
const db = dbConfig[env];

const sequelize = new Sequelize(
    db.database,
    db.username,
    db.password,
    db.dialectInfo,
);

const dbs = {};
dbs.Sequelize = Sequelize;
dbs.sequelize = sequelize;
dbs.user = require('../models/user.model')(sequelize, Sequelize);
dbs.tweet = require('../models/tweet.mode')(sequelize, Sequelize);
dbs.follower = require('../models/follower.model')(sequelize, Sequelize);


module.exports = dbs;