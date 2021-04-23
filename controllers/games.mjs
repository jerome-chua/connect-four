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
        players,
        gameFinished: false,
        playeridTurn: playerStartId,
      };

      const game = await db.Game.create(newGameData);

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

      const dataObj = {
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
        playeridTurn: playerStartId,
        boardState: game.boardState,
        gameFinished: false,
      };

      // Create a function to return the object inside res.send()
      // Instead of typing out everything.
      res.send(dataObj);
    } catch (err) {
      console.log('db.Game.createGame err: ---', err);
    }
  };

  // When board is updated, currentplayer turn should be updated.
  const updateGame = async (req, res) => {
    const { gameId } = req.params;
    const { boardState, gameFinished, playeridTurn } = req.body;

    try {
      const game = await db.Game.findOne({
        where: {
          id: Number(gameId),
        },
      });

      // Save boardState here.
      game.boardState = boardState;
      game.gameFinished = gameFinished;
      game.playeridTurn = playeridTurn;
      game.save();

      const gameUsers = await game.getUsers();

      const toggleNextPlayer = await game.getUsers({
        where: {
          id: {
            [Op.not]: game.playeridTurn,
          },
        },
      });

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
        playeridTurn: toggleNextPlayer.id,
        boardState: game.boardState,
        gameFinished: game.gameFinished,
      });
    } catch (err) {
      console.log('Error in GamesController.updateGame:----', err);
    }
  };

  // After button changed from 'Start Game' to 'Rejoin'.
  const rejoinGame = async (req, res) => {
    const { gameId } = req.params;
    // Where is the gameId coming from?

    try {
      const game = await db.Game.findOne({
        where: {
          id: gameId,
        },
      });

      // Get the users from the gameId too.
      const getPlayers = await game.getUsers();

      // Player one is the player that initiated the game.
      const playerUsernames = getPlayers.map((player) => player.username);

      const playerIds = getPlayers.map((player) => player.id);

      const players = {
        players: {
          1: {
            id: playerIds[0],
            username: playerUsernames[0],
          },
          2: {
            id: playerIds[1],
            username: playerUsernames[1],
          },
        },
      };

      const dataObj = { ...game, ...players };

      res.send({
        id: dataObj.dataValues.id,
        players: {
          1: {
            id: dataObj.players['1'].id,
            username: dataObj.players['1'].username,
          },
          2: {
            id: dataObj.players['2'].id,
            username: dataObj.players['2'].username,
          },
        },
        playeridTurn: dataObj.dataValues.playeridTurn,
        boardState: dataObj.dataValues.boardState,
        gameFinished: false,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const userGames = async (req, res) => {
    const { userId } = req.cookies;

    const user = await db.User.findOne({
      where: {
        id: userId,
      },
    });

    const gameInfo = await user.getGames();

    res.send({ gameInfo });
  };

  const refresh = async (req, res) => {
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
        playeridTurn: toggleNextPlayer.id,
        boardState: game.boardState,
        gameFinished: game.gameFinished,
      });
    } catch (err) {
      console.log('Error in GamesController.refresh:----', err);
    }
  };

  return {
    lobby,
    createGame,
    updateGame,
    rejoinGame,
    userGames,
    refresh,
  };
}
