// import jsSHA from 'jssha';

export default function initUsersController(db) {
  const login = async (req, res) => {
    try {
      const userLogin = await db.User.findOne({
        where: {
          name: req.body.username,
        },
      });

      // const shaObj = new jsSHA('SHA-512', 'TEXT', { encoding: 'UTF8' });
      // shaObj.update(req.body.password);
      // const hashedPassword = shaObj.getHash('HEX');

      // if (hashedPassword === userLogin.password) {
      //   res.cookie('userId', userLogin.id);
      // }

      res.send(userLogin);
    } catch (err) {
      console.log('ERROR! ---', err);
    }
  };
  return { login };
}
