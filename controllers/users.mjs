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
      res.send('FAILURE');
    } catch (err) {
      console.log('ERROR! in login... ---\n', err);
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

    try {
      const getUsers = await db.User.findAll({
        where: {
          id: {
            [Op.not]: Number(userId),
          },
        },
      });
      console.log('getUsers ----', getUsers);
      res.send(getUsers);
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
    logout,
    allOtherUsers,
    leaderboard,
  };
}
