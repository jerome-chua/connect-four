import { resolve } from 'path';
import db from './models/index.mjs';
import initGamesController from './controllers/games.mjs';
import initUsersController from './controllers/users.mjs';

export default function bindRoutes(app) {
  const GamesController = initGamesController(db);
  const UsersController = initUsersController(db);

  app.get('/login', UsersController.login);
  app.get('/lobby', GamesController.lobby);

  app.get('/home', (req, res) => {
    res.sendFile(resolve('dist', 'main.html'));
  });
}
