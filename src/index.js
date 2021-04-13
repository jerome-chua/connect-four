// Import dependencies.
import axios from 'axios';
import { getHash } from './helper/jsHelpers.js';
import renderLoginPage from './comp/login.js';
import renderLobbyPage from './comp/lobby.js';
import renderConnectFourPage from './comp/connectfour.js';

import './styles.scss';

// Create helper function to connect game to index.js.
const readyForGame = (gameInfo) => {
  renderConnectFourPage(gameInfo); // Render connect 4 page.
};

const renderLoginOrLobby = () => {
  axios
    .get('/checkiflogin')
    .then((res) => {
      if (res.data === 'LOBBY_PAGE') {
        renderLobbyPage(readyForGame);
      } else {
        renderLoginPage(userAuthRenderLobby);
      }
    })
    .catch((err) => console.log('loginorlobby error \n', err));
};

const userAuthRenderLobby = () => {
  const emailFormData = document.getElementById('email-input').value;
  const passwordFormData = document.getElementById('password-input').value;

  const loginFormData = {
    email: emailFormData,
    password: getHash(passwordFormData),
  };

  // Upon login success.
  axios
    .post('/login', loginFormData)
    .then((res) => {
      if (res.data === 'SUCCESS') {
        const loginPage = document.getElementById('login-page');
        loginPage.remove();

        // If user log in success, render Lobby page.
        // Within lobby.js, we have continuation to game page (with createGame data).
        renderLobbyPage(readyForGame);
      } else {
        renderLoginPage(userAuthRenderLobby);
      }
    })
    .catch((err) => console.log('/login error', err));
};

// Login/Lobby Page depending if user logged in.
renderLoginOrLobby();
