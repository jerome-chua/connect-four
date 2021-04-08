import pkg from 'sequelize';

const { Op } = pkg;

// Set global variables & helper functions.
const NUM_ROWS = 6;
const NUM_COLS = 7;
const emptyBoard = Array.from(Array(NUM_ROWS), () => new Array(NUM_COLS).fill(0));

const chooseRandomPlayerId = (players) => {
  const randIndex = Math.random() * 2;
  const playerToStart = players[Math.floor(randIndex)];

  return playerToStart;
};

export default function initGamesController(db) {
  const lobby = async (req, res) => {
    try {
      const playerList = await db.User.findAll();

      res.send(playerList);
    } catch (err) {
      console.log(err);
    }
  };

  const createGame = async (req, res) => {
    const { opponentId } = req.params; // playerTwo (the one being challenged)
    const { userId } = req.cookies; // playerOne (the one challenging)

    const players = [userId, opponentId].map(Number);
    const playerStartId = chooseRandomPlayerId(players);

    try {
      const newGameData = {
        boardState: emptyBoard,
        gameFinished: false,
        playeridTurn: playerStartId,
      };

      const game = await db.Game.create(newGameData);
      console.log('createGame executed! ----');

      // Find players in User model so as to create rows in join table.
      const playerOne = await db.User.findOne({
        where: {
          id: players[0],
        },
      });

      const playerTwo = await db.User.findOne({
        where: {
          id: players[1],
        },
      });

      // Create rows in the join table `game_users`.
      await game.addUser(playerOne);
      await game.addUser(playerTwo);

      res.send({
        id: game.id,
        players: {
          1: {
            id: playerOne.id,
            username: playerOne.username,
          },
          2: {
            id: playerTwo.id,
            username: playerTwo.username,
          },
        },
        playerIdTurn: playerStartId,
        boardState: game.board_state,
        gameFinished: false,
      });
    } catch (err) {
      console.log('db.Game.createGame err: ---', err);
    }
  };

  // When board is updated, currentplayer turn should be updated.
  const updateGame = async (req, res) => {
    const { gameId } = req.params;

    try {
      const game = await db.Game.findOne({
        where: {
          id: Number(gameId),
        },
      });

      const gameUsers = await game.getUsers();

      const toggleNextPlayer = await game.getUsers({
        where: {
          id: {
            [Op.not]: game.playeridTurn,
          },
        },
      });

      console.log('game.getUsers done. \n ------- \n');

      res.send({
        id: game.id,
        players: {
          1: {
            id: gameUsers[0].id,
            username: gameUsers[0].username,
          },
          2: {
            id: gameUsers[1].id,
            username: gameUsers[1].username,
          },
        },
        playerIdTurn: toggleNextPlayer.id,
        boardState: game.board_state,
        gameFinished: false,
      });
    } catch (err) {
      console.log('Error in GamesController.updateGame:----', err);
    }
  };

  // After button changed from 'Start Game' to 'Continue'.
  const rejoinGame = async (req, res) => {
    const { gameId } = req.params;

    console.log(gameId);
  };

  return {
    lobby,
    createGame,
    updateGame,
    rejoinGame,
  };
}
