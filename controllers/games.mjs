const ROWS_COUNT = 6;
const COLS_COUNT = 7;
const emptyBoard = Array.from(Array(ROWS_COUNT), () => new Array(COLS_COUNT));

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
    const { opponentId } = req.params;
    const { userId } = req.cookies;

    try {
      const newGameData = {
        boardState: emptyBoard,
        gameFinished: false,
        // playerid_turn: 1, // Change this to random later
      };

      const game = await db.Game.create(newGameData);
      console.log('Game created: -----', game);

      const addFirstPlayer = {
        gameId: game.id,
        userId: Number(userId),
      };

      const addSecondPlayer = {
        gameId: game.id,
        userId: Number(opponentId),
      };

      await db.GameUsers.create(addFirstPlayer);
      await db.GameUsers.create(addSecondPlayer);

      res.send({
        id: game.id,
        playerIdTurn: userId,
        boardState: game.board_state,
        gameFinished: false,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return {
    lobby,
    createGame,
  };
}
