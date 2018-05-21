document.addEventListener('DOMContentLoaded', function(event) {
  console.log('loaded');
  var currentPlayer = 'x';
  var resetBtn = document.getElementById('reset');
  resetBtn.addEventListener('click', e => {
    console.log('reset clicked');
  });
  var tiles = document.getElementsByClassName('tile');
  for (let tile of tiles) {
    console.log(tile);
    tile.addEventListener('click', e => {
      onTileClick(tile);
    });
  }

  var onTileClick = function(tile) {
    if (tile.innerHTML === '[_]'){
      tile.innerHTML = `[${currentPlayer}]`;
      currentPlayer = currentPlayer === 'x' ? 'o' : 'x';
    } else {
    console.log('tile already taken', tile);
      
    }

    console.log('tile clicked', tile);
  };

  var onResetClick = function() {};
});
