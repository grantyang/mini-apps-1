document.addEventListener('DOMContentLoaded', function(event) {
  console.log('loaded');
  var currentPlayer = 'x';
  var tiles = document.getElementsByClassName('tile');
  var resetBtn = document.getElementById('reset');
  var nameBtns = document.getElementsByClassName('nameBtn');
  var tileRows = [];
  var tileCols = [];
  var tilesPlaced = 0;
  var scoreBoard = {};
  var gameOver = false;
  var name1 = 'x';
  var name2 = 'o';

  var init = function() {
    formatRowData();
    formatColData();
    addListeners();
    scoreBoard[name1] = 0;
    scoreBoard[name2] = 0;
  };

  //presentational

  var onResetClick = function() {
    gameOver = false;
    tilesPlaced = 0;
    let winDiv = document.getElementById('gameOver');
    if (winDiv) {
      winDiv.remove();
    }
    for (let tile of tiles) {
      tile.innerHTML = '[_]';
    }
  };

  var displayMessage = function(status) {
    var newDiv = document.createElement('div');
    if (status === 'tie') {
      var textnode = document.createTextNode(`Tie game...`);
    } else if (status === 'win') {
      console.log(currentPlayer);
      let name;
      if (currentPlayer === 'x') {
        name = name1;
      } else {
        name = name2;
      }
      var textnode = document.createTextNode(
        `${name} has won the game!
         They will go first next game.`
      );
    }
    newDiv.appendChild(textnode);
    newDiv.setAttribute('id', 'gameOver');
    document.getElementsByClassName('oscore')[0].appendChild(newDiv);
  };

  var renderScore = function() {
    let xScore = document.getElementsByClassName('xscore');
    let oScore = document.getElementsByClassName('oscore');
    xScore[0].innerHTML = `${name1}: ${scoreBoard[name1]}`;
    oScore[0].innerHTML = `${name2}: ${scoreBoard[name2]}`;
  };

  var placeMove = function(tile) {
    tile.innerHTML = `[${currentPlayer}]`;
    tilesPlaced++;
    checkWin();
  };

  //data

  var addListeners = function() {
    resetBtn.addEventListener('click', () => {
      onResetClick();
    });

    for (let tile of tiles) {
      tile.addEventListener('click', () => {
        onTileClick(tile);
      });
    }
    for (let nameBtn of nameBtns) {
      nameBtn.addEventListener('click', e => {
        onNameSubmit(e, nameBtn);
      });
    }
  };

  var formatRowData = function() {
    let newRow = [];
    for (let i = 0; i < tiles.length; i++) {
      newRow.push(tiles[i]);
      if (i % 3 === 2) {
        tileRows.push(newRow);
        newRow = [];
      }
    }
  };

  var formatColData = function() {
    for (let i = 0; i < tiles.length; i++) {
      if (tileCols[i % 3] === undefined) {
        tileCols[i % 3] = [tiles[i]];
      } else {
        tileCols[i % 3].push(tiles[i]);
      }
    }
  };

  var checkDiags = function() {
    let majorDiag = [];
    let minorDiag = [];
    for (let i = 0; i < 3; i++) {
      majorDiag.push(tileRows[i][i]);
      minorDiag.push(tileRows[i][2 - i]);
    }
    if (
      majorDiag.every(item => item.innerHTML === `[${currentPlayer}]`) ||
      minorDiag.every(item => item.innerHTML === `[${currentPlayer}]`)
    ) {
      gameOver = true;
    }
  };

  var checkRowCol = function() {
    for (let i = 0; i < 3; i++) {
      if (tileRows[i].every(item => item.innerHTML === `[${currentPlayer}]`)) {
        gameOver = true;
      } else if (
        tileCols[i].every(item => item.innerHTML === `[${currentPlayer}]`)
      ) {
        gameOver = true;
      }
    }
  };

  var checkWin = function() {
    checkRowCol();
    checkDiags();
    if (!gameOver && tilesPlaced === 9) {
      displayMessage('tie');
    }
    if (gameOver === true) {
      if (currentPlayer === 'x') {
        scoreBoard[name1]++;
      } else {
        scoreBoard[name2]++;
      }
      renderScore();
      displayMessage('win');
    } else {
      switchUser();
    }
  };

  var switchUser = function() {
    if (!gameOver && tilesPlaced < 9) {
      currentPlayer = currentPlayer === 'x' ? 'o' : 'x';
    }
  };

  var validMove = function(tile) {
    if (tile.innerHTML === '[_]' && !gameOver) {
      return true;
    } else {
      return false;
    }
  };

  var onTileClick = function(tile) {
    if (validMove(tile)) {
      placeMove(tile);
    }
  };

  var onNameSubmit = function(e, nameBtn) {
    let newName = document.getElementById(`name${e.target.id}`).value;
    if (newName !== name1 && newName !== name2) {
      if (e.target.id === '1') {
        name1 = newName;
      } else if (e.target.id === '2') {
        name2 = newName;
      }
      updateScoreBoard();
    }
  };

  var updateScoreBoard = function() {
    scoreBoard = {}
    scoreBoard[name1] = 0
    scoreBoard[name2] = 0
    renderScore();
  };

  init();
});
