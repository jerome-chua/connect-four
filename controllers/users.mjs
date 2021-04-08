import pkg from 'sequelize';

const { Op } = pkg;

export default function initUsersController(db) {
  const login = async (req, res) => {
    const { email, password } = req.body;

    try {
      const loggedInUser = await db.User.findOne({
        where: {
          email,
        },
      });

      if (loggedInUser.password === password) {
        res.cookie('userId', loggedInUser.id);
        res.send('SUCCESS');
        return;
      }
      res.status(500).send({
        error: 'Login Failure',
      });
    } catch (err) {
      console.log('ERROR! in login... ---\n', err);
    }
  };

  const checkIfLogin = async (req, res) => {
    const { userId } = req.cookies;

    // If COOKIE ID NOT FOUND, RENDER LOGIN PAGE.
    if (!userId) {
      res.send('LOGIN_PAGE');
      return;
    }

    try {
      const loggedInUser = await db.User.findOne({
        where: {
          id: Number(userId),
        },
      });

      // If SQL QUERY IS SUCCESFUL, RENDER LOBBY PAGE ELSE RENDER LOGIN PAGE.
      if (loggedInUser) {
        res.send('LOBBY_PAGE');
        return;
      }
      res.send('LOGIN_PAGE');
    } catch (err) {
      console.log('checkiflogin Error: ----- \n\n', err);
    }
  };

  const logout = async (req, res) => {
    // const { userId } = req.cookies;

    // const user = await db.User.findOne({
    //   where: {
    //     id: userId,
    //   },
    // });
    try {
      res.clearCookie('userId');
      res.send('Logged out succesfully.');
    }
    catch (err) {
      console.log(err);
    }
  };

  // Get list of all users.
  const allOtherUsers = async (req, res) => {
    const { userId } = req.cookies;

    // 1st option: User eager loading to get games + users.

    try {
      const getUsers = await db.User.findAll({
        where: {
          id: {
            [Op.not]: Number(userId),
          },
        },
      });

      res.send(getUsers);

      // 2nd option: Have 2 tables, 1 for new game, 1 for in game.
    } catch (err) {
      console.log('allOtherUsers error ----', err);
    }
  };

  const leaderboard = async (req, res) => {
    try {
      const getUsersByWins = await db.User.findAll({
        order: [
          ['wins', 'DESC'],
        ],
      });

      res.send(getUsersByWins);
    } catch (err) {
      console.log('leaderboard error ----', err);
    }
  };

  return {
    login,
    checkIfLogin,
    logout,
    allOtherUsers,
    leaderboard,
  };
}
