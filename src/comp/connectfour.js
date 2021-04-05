import axios from 'axios';

export default function renderConnectFourPage() {
  const gameContainer = document.createElement('div');
  gameContainer.setAttribute('id', 'game-page');
  gameContainer.classList.add('container-fluid');

  const gameRow = document.createElement('div');
  gameRow.classList.add('row', 'mt-5');

  const gameCol = document.createElement('div');
  gameCol.classList.add('col');

  const startMsg = document.createElement('h1');
  startMsg.innerText = 'CONNECT 4';
  startMsg.classList.add('text-center');

  const playerMsg = document.createElement('h4');
  playerMsg.innerText = 'Blue Starts';
  playerMsg.classList.add('text-center', 'lead');

  gameCol.append(startMsg, playerMsg);
  gameRow.appendChild(gameCol);
  gameContainer.appendChild(gameRow);
  document.body.appendChild(gameContainer);
}
