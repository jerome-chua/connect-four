import axios from 'axios';
import {
  gameListRowColComp, gameListTitleComp, gameListTableComp, gameListHeaderComp,
} from './gametable.js';
import { playerListComp } from './leaderboard.js';
import setManyAttributes from '../helper/htmlHelpers.js';

export default function renderLobbyPage(readyForGame) {
  // Lobby Page -----
  const lobbyContainer = document.createElement('div');
  lobbyContainer.setAttribute('id', 'lobby-page');
  lobbyContainer.classList.add('container', 'w-75');

  const lobbyTitle = document.createElement('h1');
  lobbyTitle.innerText = 'Lobby Area';
  lobbyTitle.classList.add('text-center', 'mt-5');

  const startConnectingTitle = document.createElement('h4');
  startConnectingTitle.innerText = "Let's start connecting!";
  startConnectingTitle.classList.add('text-center', 'lead');

  // Game Page -----
  const playBtnCb = (e) => {
    const opponentId = e.target.id;

    // Remove Lobby & render Game page after response received.
    axios
      .post(`/creategame/${opponentId}`)
      // Move to connect four game page, only when game data confirmed received.
      .then((res) => {
        lobbyContainer.remove();

        // Pass data from games.mjs & render connect4 page.
        readyForGame(res);
      });
  };

  // Game List playBtn (w event listener)
  const playBtnCell = (uniqueIdentifier) => {
    const tableData = document.createElement('td');
    const playBtn = document.createElement('button');
    playBtn.innerText = 'PLAY';
    playBtn.addEventListener('click', playBtnCb);
    playBtn.classList.add('btn', 'btn-warning', 'px-4');
    setManyAttributes(playBtn, {
      name: 'play-btn',
      id: `${uniqueIdentifier}`,
      type: 'submit',
    });
    tableData.appendChild(playBtn);

    return tableData;
  };

  const rejoinBtnCell = (uniqueIdentifier, gameId) => {
    const tableData = document.createElement('td');
    const rejoinBtn = document.createElement('button');
    rejoinBtn.innerText = 'REJOIN';
    rejoinBtn.addEventListener('click', () => {
      // Remove Lobby & render started Game page after response received.
      axios
        .get(`/rejoingame/${gameId}`)
        .then((res) => {
          lobbyContainer.remove();
          // Pass data from games.mjs & render connect4 page.
          readyForGame(res);
        });
    });

    rejoinBtn.classList.add('btn', 'btn-warning', 'px-4');
    setManyAttributes(rejoinBtn, {
      name: 'rejoin-btn',
      id: `${uniqueIdentifier}`,
      type: 'submit',
    });

    tableData.appendChild(rejoinBtn);

    return tableData;
  };

  // Game List Body.
  const gameListBodyComp = () => {
    const gameListTableBody = document.createElement('tbody');
    gameListTableBody.setAttribute('id', 'gamelist-body');

    axios
      .get('/users')
      .then((res) => {
        const { playerInfo, userId } = res.data;

        let gameId;
        let numGames;
        let inGamePlayers;
        let loggedInUserInGame = false;
        let gameFinished = true;

        playerInfo.forEach((player, index) => {
          try {
            const allGames = player.Games;
            numGames = allGames.length;

            for (let i = 0; i < numGames; i += 1) {
              inGamePlayers = allGames[i].players;
              gameId = allGames[i].game_users.GameId;
              gameFinished = allGames[i].gameFinished;
            }

            loggedInUserInGame = !!inGamePlayers.includes(Number(userId));
          } catch (err) {
            console.log((err instanceof TypeError));
          }

          const gameListTableBodyRow = document.createElement('tr');
          gameListTableBodyRow.setAttribute('id', `gamelist-tablerow-${index + 1}`);
          const gameListTableBodyIndex = document.createElement('th');
          gameListTableBodyIndex.setAttribute('scope', 'row');
          gameListTableBodyIndex.innerText = index + 1;
          const gameListTableBodyUsername = document.createElement('td');
          gameListTableBodyUsername.innerText = player.username;

          let gameListTableBodyPlay;

          // Render either playBtn or rejoinBtn.
          if (numGames >= 1 && loggedInUserInGame && gameFinished === false) {
            gameListTableBodyPlay = rejoinBtnCell(player.id, gameId);
          } else {
            gameListTableBodyPlay = playBtnCell(player.id);
          }
          // eslint-disable-next-line max-len
          gameListTableBodyRow.append(gameListTableBodyIndex, gameListTableBodyUsername, gameListTableBodyPlay);
          gameListTableBody.appendChild(gameListTableBodyRow);
        });
      })
      .catch((err) => console.log(err));

    return gameListTableBody;
  };

  // Append Title & Table to Game List Container.
  const gameListTitle = gameListTitleComp();
  const gameListTable = gameListTableComp();
  gameListTable.append(gameListHeaderComp(), gameListBodyComp());
  const gameListComp = gameListRowColComp(gameListTitle, gameListTable);

  // Append to Document -----
  lobbyContainer.append(lobbyTitle, startConnectingTitle, gameListComp, playerListComp);
  document.body.appendChild(lobbyContainer);
}
