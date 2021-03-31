// Import dependencies.
import { Sequelize } from 'sequelize';
import url from 'url';
import allConfig from '../config/config.js';
import initGameModel from './game.mjs';
import initUserModel from './user.mjs';

const env = process.env.NODE_ENV || 'development';
const config = allConfig[env];
const db = {};
let sequelize;

// If env is production, retrieve database auth details from Heroku's DATABASE_URL env var.
if (env === 'production') {
  // Break apart Heroku database URL & rebuild necessary configs.
  const { DATABASE_URL } = process.env;
  const dbUrl = url.parse(DATABASE_URL);
  const username = dbUrl.auth.substr(0, dbUrl.auth.indexOf(':'));
  const password = dbUrl.auth.substr(
    dbUrl.auth.indexOf(':') + 1,
    dbUrl.auth.length,
  );
  const dbName = dbUrl.path.slice(1);
  const host = dbUrl.hostname;

  const { port } = dbUrl;

  config.host = host;
  config.port = port;
  sequelize = new Sequelize(dbName, username, password, config);
}
// If env not in production, retrieve DB auth details from config.
else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

db.Game = initGameModel(sequelize, Sequelize.DataTypes);
db.User = initUserModel(sequelize, Sequelize.DataTypes);

// Connect Game & User model & establish M-M association.
db.Game.belongsToMany(db.User, { through: 'game_users' });
db.User.belongsToMany(db.Game, { through: 'game_users' });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
