import axios from 'axios';

// -------------------- Player List  Section ----------------------
// Player List Container.
const playerListRowColComp = (title, table) => {
  const playerListCol = document.createElement('div');
  playerListCol.classList.add('col-12');
  playerListCol.setAttribute('id', 'playerlist-col');

  const playerListRow = document.createElement('div');
  playerListRow.classList.add('row');
  playerListRow.setAttribute('id', 'playerlist-row');

  playerListCol.append(title, table);
  playerListRow.appendChild(playerListCol);

  return playerListRow;
};

// Player List Title.
const playerListTitleComp = () => {
  const h2 = document.createElement('h2');
  h2.innerText = 'Leaderboard';
  h2.classList.add('mt-1');

  return h2;
};

// Player List Table.
const playerListTableComp = () => {
  const playerListTable = document.createElement('table');
  playerListTable.setAttribute('id', 'gamelist-table');
  playerListTable.classList.add('table', 'table-borderless', 'table-dark', 'mt-2', 'my-5');

  return playerListTable;
};

// Plyaer List Header.
const playerListHeaderComp = () => {
  // Plyaer List Headers.
  const playerListTableHeader = document.createElement('thead');
  const playerListTableHeaderRow = document.createElement('tr');

  const playerListTableHeaderCellOne = document.createElement('th');
  playerListTableHeaderCellOne.setAttribute('scope', 'col');
  playerListTableHeaderCellOne.innerText = '#';

  const playerListTableHeaderCellTwo = document.createElement('th');
  playerListTableHeaderCellTwo.setAttribute('scope', 'col');
  playerListTableHeaderCellTwo.innerText = 'Rank';

  const playerListTableHeaderCellThree = document.createElement('th');
  playerListTableHeaderCellThree.setAttribute('scope', 'col');
  playerListTableHeaderCellThree.innerText = 'Wins';

  const playerListTableHeaderCellFour = document.createElement('th');
  playerListTableHeaderCellFour.setAttribute('scope', 'col');
  playerListTableHeaderCellFour.innerText = 'Username';

  // <thead>
  // eslint-disable-next-line max-len
  playerListTableHeaderRow.append(playerListTableHeaderCellOne, playerListTableHeaderCellTwo, playerListTableHeaderCellThree, playerListTableHeaderCellFour);
  playerListTableHeader.appendChild(playerListTableHeaderRow);

  return playerListTableHeader;
};

// Game List Body.
const playerListBodyComp = () => {
  const playerListTableBody = document.createElement('tbody');

  axios
    .get('/leaderboard')
    .then((res) => {
      const players = res.data;

      players.forEach((player, index) => {
        const playerListTableBodyRow = document.createElement('tr');

        const playerListTableBodyIndex = document.createElement('th');
        playerListTableBodyIndex.setAttribute('scope', 'row');
        playerListTableBodyIndex.innerText = index + 1;

        const playerListTableBodyRank = document.createElement('td');
        playerListTableBodyRank.innerText = index + 1;

        const playerListTableBodyWins = document.createElement('td');
        playerListTableBodyWins.innerText = player.wins;

        const playerListTableBodyUserName = document.createElement('td');
        playerListTableBodyUserName.innerText = player.username;

        // eslint-disable-next-line max-len
        playerListTableBodyRow.append(playerListTableBodyIndex, playerListTableBodyRank, playerListTableBodyWins, playerListTableBodyUserName);
        playerListTableBody.appendChild(playerListTableBodyRow);
      });
    })
    .catch((err) => console.log(err));

  return playerListTableBody;
};

const playerListTitle = playerListTitleComp();
const playerListTable = playerListTableComp();
playerListTable.append(playerListHeaderComp(), playerListBodyComp());
const playerListComp = playerListRowColComp(playerListTitle, playerListTable);

export { playerListComp };
