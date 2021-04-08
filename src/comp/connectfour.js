/* eslint-disable no-use-before-define */
import axios from 'axios';

const initBoardArr = (numRows, numCols) => {
  const emptyBoard = Array.from(Array(numRows), () => new Array(numCols).fill(0));

  return emptyBoard;
};

// Globals.
const NUM_WIN = 4;
const NUM_ROWS = 6;
const NUM_COLS = 7;
const boardArr = initBoardArr(NUM_ROWS, NUM_COLS);

let canClick = true;
let gameFinished = false;
let gameId;
let currentPlayerId;

const getBottomRowIndex = (board, colIndex) => {
  for (let rowIndex = (NUM_ROWS - 1); rowIndex > -1; rowIndex -= 1) {
    if (board[rowIndex][colIndex] === 0) {
      return rowIndex;
    }
  }
  return alert('Choose another column!');
};

const checkColNotFilled = (board, colIndex) => (board[NUM_ROWS - 1][colIndex] === 0);

const checkWin = (board, playerSymbol) => {
  // Horizontal
  for (let i = 0; i < board.length; i += 1) {
    const row = board[i];
    console.log(`Row ${i}: `, i);
    for (let j = 0; j < row.length; j += 1) {
      console.log('---');
      console.log(`Col ${j}:`, j);
    }
  }
  return false;

  // Vertical

  // Diagonal
};

const endGame = (targetElement) => {
  gameFinished = true;
  targetElement.innerText = `${currentPlayerId} WON!`;
  canClick = false;

  return gameFinished;
};

const togglePlayer = (playerOne, playerTwo) => {
  const gameMsg = document.getElementById('player-msg');

  if (currentPlayerId == playerOne) {
    currentPlayerId = playerTwo;
    gameMsg.innerText = 'Player Two Turn';
  } else {
    currentPlayerId = playerOne;
    gameMsg.innerText = 'Player One Turn';
  }
};

const changeCircleColour = (currentId, playerOneId, evt) => {
  const boardRows = document.getElementsByTagName('tr');
  const colIndex = evt.target.cellIndex;
  const rowTracker = [];

  for (let rowIndex = (NUM_ROWS - 1); rowIndex > -1; rowIndex -= 1) {
    if (boardRows[rowIndex].children[colIndex].style.backgroundColor === '') {
      // Find the "bottom-most" empty layer & store that row in rowTracker.
      rowTracker.push(boardRows[rowIndex].children[colIndex]);
      if (currentId == playerOneId) {
        rowTracker[0].style.backgroundColor = 'red';
      } else {
        rowTracker[0].style.backgroundColor = 'yellow';
      }
    }
  }
};

const circleClicked = (row, col, evt) => {
  if (checkColNotFilled) {
    const bottomRow = getBottomRowIndex(boardArr, col);
    boardArr[bottomRow][col] = currentPlayerId;
  }

  const boardData = {
    boardState: boardArr,
    playerIdTurn: currentPlayerId,
    gameFinished: false, // To change later after checkWin() done.
    winnerId: undefined,
  };

  axios
    .put(`/updategame/${gameId}`, boardData)
    .then((res) => {
      const { data } = res;
      const winnerFound = checkWin(boardArr, currentPlayerId); // Need to update this.
      // const winnerFound = false;

      changeCircleColour(currentPlayerId, data.players['1'].id, evt);

      if (winnerFound || winnerFound === null) {
        // Call axios.put() again to get gameFinished & winnerId back into database.
        console.log('Winner found!');
        endGame();
      }
      else {
        togglePlayer(data.players['1'].id, data.players['2'].id); // Change currentPlayerId.
      }
    })
    .catch((err) => {
      console.log('Error found within index.js /updategame', err);
    });
};

const createBoardElements = (board) => {
  const tableEle = document.createElement('table');
  tableEle.setAttribute('id', 'board-table');

  for (let i = 0; i < board.length; i += 1) {
    const tableRow = board[i];
    const tableRowEle = document.createElement('tr');

    for (let j = 0; j < tableRow.length; j += 1) {
      const circleEle = document.createElement('td');
      circleEle.classList.add('circle');
      circleEle.addEventListener('click', (e) => {
        circleClicked(i, j, e); // Definitions: i:row, j:col, e:event.
      });

      tableRowEle.appendChild(circleEle);
    }
    tableEle.appendChild(tableRowEle);
  }
  return tableEle;
};

export default function renderConnectFourPage(gameInfo) {
  // Gloabal Variables, data sent to page from '/login' route.
  const { data } = gameInfo;
  gameId = data.id;
  currentPlayerId = data.playerIdTurn;
  const playerOneUserName = data.players['1'].username;
  const playerTwoUserName = data.players['2'].username;

  // Create DOM elements.
  const gameContainer = document.createElement('div');
  gameContainer.setAttribute('id', 'game-page');
  gameContainer.classList.add('container-fluid');

  const gameTitleRow = document.createElement('div');
  gameTitleRow.classList.add('row', 'my-5');

  const gameCol = document.createElement('div');
  gameCol.classList.add('col');

  const gameMsg = document.createElement('h1');
  gameMsg.setAttribute('id', 'game-msg');
  gameMsg.innerText = 'CONNECT 4';
  gameMsg.classList.add('text-center');

  const playerMsg = document.createElement('h4');
  playerMsg.innerText = `${data.players['1'].id === data.playerIdTurn ? playerOneUserName : playerTwoUserName} starts.`;
  playerMsg.setAttribute('id', 'player-msg');
  playerMsg.classList.add('text-center', 'lead');

  const playerTitleRow = document.createElement('div');
  playerTitleRow.classList.add('row');

  const playerOneCol = document.createElement('div');
  playerOneCol.classList.add('col-6', 'text-center', 'mr-3');
  const playerOneTitle = document.createElement('h4');
  playerOneTitle.innerText = 'Player One: ';
  const playerOneName = document.createElement('h6');
  playerOneName.innerText = `${playerOneUserName}`;
  playerOneName.style.color = 'red';

  const playerTwoCol = document.createElement('div');
  playerTwoCol.classList.add('col-6', 'text-center', 'ml-3');
  const playerTwoTitle = document.createElement('h4');
  playerTwoTitle.innerText = 'Player Two: ';
  const playerTwoName = document.createElement('h6');
  playerTwoName.innerText = `${playerTwoUserName}`;
  playerTwoName.style.color = 'yellow';

  const boardRow = document.createElement('div');
  boardRow.classList.add('row', 'my-5');

  const boardCol = document.createElement('div');
  boardCol.classList.add('col', 'd-flex', 'justify-content-center');

  const blueBoard = document.createElement('div');
  blueBoard.setAttribute('id', 'blue-board');
  blueBoard.classList.add('d-flex', 'justify-content-center');

  // Appending to DOM ------------------------
  // Game Message.
  gameCol.append(gameMsg, playerMsg);
  gameTitleRow.appendChild(gameCol);

  // Player 1 & 2.
  playerOneCol.append(playerOneTitle, playerOneName);
  playerTwoCol.append(playerTwoTitle, playerTwoName);
  playerTitleRow.append(playerOneCol, playerTwoCol);

  // Connect 4 board.
  blueBoard.appendChild(createBoardElements(boardArr));
  boardCol.appendChild(blueBoard);
  boardRow.appendChild(boardCol);

  gameContainer.append(gameTitleRow, playerTitleRow, boardRow);
  document.body.appendChild(gameContainer);
}
