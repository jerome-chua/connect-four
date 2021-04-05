// -------------------- Game List Section ----------------------
// Game List Container.
const gameListRowColComp = (title, table) => {
  const gameListCol = document.createElement('div');
  gameListCol.classList.add('col-12');
  gameListCol.setAttribute('id', 'gamelist-col');

  const gameListRow = document.createElement('div');
  gameListRow.classList.add('row');
  gameListRow.setAttribute('id', 'gamelist-row');

  gameListCol.append(title, table);
  gameListRow.appendChild(gameListCol);

  return gameListRow;
};

// Game List Title ("Find Game").
const gameListTitleComp = () => {
  const h2 = document.createElement('h2');
  h2.innerText = 'Find Game';
  h2.classList.add('mt-5');

  return h2;
};

// Game List Table.
const gameListTableComp = () => {
  const gameListTable = document.createElement('table');
  gameListTable.setAttribute('id', 'gamelist-table');
  gameListTable.classList.add('table', 'table-borderless', 'table-dark', 'mt-2', 'my-5');

  return gameListTable;
};

// Game List Header.
const gameListHeaderComp = () => {
  // Game List Headers.
  const gameListTableHeader = document.createElement('thead');
  const gameListTableHeaderRow = document.createElement('tr');

  const gameListTableHeaderCellOne = document.createElement('th');
  gameListTableHeaderCellOne.setAttribute('scope', 'col');
  gameListTableHeaderCellOne.innerText = '#';

  const gameListTableHeaderCellTwo = document.createElement('th');
  gameListTableHeaderCellTwo.setAttribute('scope', 'col');
  gameListTableHeaderCellTwo.innerText = 'Choose Opponent';

  const gameListTableHeaderCellThree = document.createElement('th');
  gameListTableHeaderCellThree.setAttribute('scope', 'col');
  gameListTableHeaderCellThree.innerText = 'Start Game';

  // <thead>
  // eslint-disable-next-line max-len
  gameListTableHeaderRow.append(gameListTableHeaderCellOne, gameListTableHeaderCellTwo, gameListTableHeaderCellThree);
  gameListTableHeader.appendChild(gameListTableHeaderRow);

  return gameListTableHeader;
};

export {
  gameListRowColComp, gameListTitleComp, gameListTableComp, gameListHeaderComp,
};
