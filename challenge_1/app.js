document.addEventListener('DOMContentLoaded', function(event) {
  console.log('loaded');
  var currentPlayer = 'x';
  var tiles = document.getElementsByClassName('tile');
  var resetBtn = document.getElementById('reset');
  var tileRows = [];
  var tileCols = [];
  var tilesPlaced = 0;
  var scoreBoard = { x: 0, o: 0 };
  var gameOver = false;

  var init = function() {
    formatRowData();
    formatColData();
    addListeners();
  };

  var addListeners = function() {
    resetBtn.addEventListener('click', e => {
      onResetClick();
    });

    for (let tile of tiles) {
      tile.addEventListener('click', e => {
        onTileClick(tile);
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
      addScore(currentPlayer);
      displayMessage('win');
    } else {
      switchUser();
    }
  };

  var displayMessage = function(status) {
    var newDiv = document.createElement('div');
    if (status === 'tie') {
      var textnode = document.createTextNode(`Tie game...`);
    } else if (status === 'win') {
      var textnode = document.createTextNode(
        `Player ${currentPlayer} has won the game!
         They will go first next game.`
      );
    }
    newDiv.appendChild(textnode);
    newDiv.setAttribute('id', 'gameOver');
    document.getElementsByClassName('oscore')[0].appendChild(newDiv);
  };

  var addScore = function(player) {
    scoreBoard[player]++;
    let xScore = document.getElementsByClassName('xscore');
    let oScore = document.getElementsByClassName('oscore');
    oScore[0].innerHTML = `o: ${scoreBoard.o}`;
    xScore[0].innerHTML = `x: ${scoreBoard.x}`;
  };

  var switchUser = function() {
    if (!gameOver && tilesPlaced < 9) {
      currentPlayer = currentPlayer === 'x' ? 'o' : 'x';
    }
  };
  var placeMove = function(tile) {
    tile.innerHTML = `[${currentPlayer}]`;
    tilesPlaced++;
    checkWin();
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

  init();
});
