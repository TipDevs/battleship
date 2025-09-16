export const Game = (player, ai) => {
  let gameOver = false;
  function playTurn(coord) {
    if (gameOver) return;
    player.attack(ai, coord);
    if (ai.getGameBoard().allShipsSunk()) {
      gameOver = true;
      return `${player.getName()} wins`;
    }
    aiRandomAttacks();
    if (player.getGameBoard().allShipsSunk()) {
      gameOver = true;
      return `${ai.getName()} wins`;
    }
  }
  function aiRandomAttacks() {
    const playerBoard = player.getGameBoard();
    const missed = playerBoard.retrieveMissedAttacks();
    const tried = new Set(missed.map((m) => m.toString()));
    const coords = [];
    const size = 10;
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (!tried.has([r, c].toString())) {
          coords.push([r, c]);
        }
      }
    }
    const coord = coords[Math.floor(Math.random() * coords.length)];
    ai.attack(player, coord);
  }
  return { playTurn };
};
