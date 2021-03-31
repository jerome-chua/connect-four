export default function initGamesController(db) {
  const lobby = async (req, res) => {
    try {
      const playerList = await db.User.findAll();
      // const gameList = await db.Game.findAll();

      console.log(playerList);
      // console.log(gameList);

      res.send(playerList);
    } catch (err) {
      console.log(err);
    }
  };

  return { lobby };
}
