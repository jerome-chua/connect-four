// Import dependencies.
import axios from 'axios';
import { getHash } from './helper/jsHelpers.js';
import renderLoginPage from './comp/login.js';
import renderLobbyPage from './comp/lobby.js';
import renderConnectFourPage from './comp/connectfour.js';

import './styles.scss';

// Login Page -----
// Render only if no cookie id, else render Lobby page.
renderLoginPage();

// Game Page -----
// const playBtnCb = async (e) => {
//   // Move to connect four game page.
//   const getLobbyPage = document.getElementById('lobby-page');
//   getLobbyPage.remove();

//   const opponentId = e.target.id;
//   axios.post(`/creategame/:${opponentId}`);

//   renderConnectFourPage();
// };

const userAuthRenderLobby = () => {
  const emailFormData = document.getElementById('email-input').value;
  const passwordFormData = document.getElementById('password-input').value;

  const loginFormData = {
    email: emailFormData,
    password: getHash(passwordFormData),
  };

  axios
    .post('/login', loginFormData)
    .then((res) => {
      if (res.data === 'SUCCESS') {
        const loginPage = document.getElementById('login-page');
        loginPage.remove();

        // If user log in success, render Lobby page.
        renderLobbyPage();
      } else {
        renderLoginPage();
      }
    })
    .catch((err) => console.log('/login error', err));
};

// Also work on lobby page showing other users than the person logged in.
const loginSubmitBtn = document.getElementById('login-submit');
loginSubmitBtn.addEventListener('click', userAuthRenderLobby);
