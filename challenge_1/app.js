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

  var checkWin = function() {
    //returns win bool
    let majorDiag = [];
    let minorDiag = [];
    for (let i = 0; i < 3; i++) {
      if (tileRows[i].every(item => item.innerHTML === `[${currentPlayer}]`)) {
        gameOver = true;
      } else if (
        tileCols[i].every(item => item.innerHTML === `[${currentPlayer}]`)
      ) {
        gameOver = true;
      } else {
        majorDiag.push(tileRows[i][i]);
        minorDiag.push(tileRows[i][2 - i]);
      }
    }
    if (
      majorDiag.every(item => item.innerHTML === `[${currentPlayer}]`) ||
      minorDiag.every(item => item.innerHTML === `[${currentPlayer}]`)
    ) {
      gameOver = true;
    }
  };

  var addScore = function(player) {
    scoreBoard[player]++;
    let xScore = document.getElementsByClassName('xscore');
    let oScore = document.getElementsByClassName('oscore');
    console.log(scoreBoard.x)
    console.log(oScore)
    oScore[0].innerHTML = `o: ${scoreBoard.o}`;
    xScore[0].innerHTML = `x: ${scoreBoard.x}`;
  };

  var onTileClick = function(tile) {
    if (tile.innerHTML === '[_]' && !gameOver) {
      tile.innerHTML = `[${currentPlayer}]`;
      tilesPlaced++;
      checkWin();
      if (!gameOver && tilesPlaced < 9) {
        currentPlayer = currentPlayer === 'x' ? 'o' : 'x';
      } else {
        var newDiv = document.createElement('div');
        if (!gameOver && tilesPlaced === 9) {
          var textnode = document.createTextNode(`Tie game...`);
        } else if (gameOver) {
          var textnode = document.createTextNode(
            `Player ${currentPlayer} has won the game!
             They will go first next game.`
          );
          addScore(currentPlayer);
        }
        newDiv.appendChild(textnode);
        newDiv.setAttribute('id', 'gameOver');
        document.body.appendChild(newDiv);
      }
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
  formatRowData();
  formatColData();
  addListeners();
});
