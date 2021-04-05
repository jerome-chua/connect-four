import { resolve } from 'path';
import db from './models/index.mjs';
import initGamesController from './controllers/games.mjs';
import initUsersController from './controllers/users.mjs';

export default function bindRoutes(app) {
  const GamesController = initGamesController(db);
  const UsersController = initUsersController(db);

  app.get('/home', (req, res) => {
    res.sendFile(resolve('dist', 'main.html'));
  });

  app.post('/login', UsersController.login);
  app.get('/users', UsersController.allOtherUsers);
  app.get('/leaderboard', UsersController.leaderboard);
  app.get('/lobby', GamesController.lobby);
  app.post('/creategame/:opponentId', GamesController.createGame);
}
