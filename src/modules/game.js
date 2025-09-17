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
  const aiMemory = {
    targetStack: [],
    tried: new Set(),
  };
  function aiRandomAttacks() {
    const playerBoard = player.getGameBoard();
    const missed = playerBoard.retrieveMissedAttacks();
    missed.forEach((m) => aiMemory.tried.add(m.toString()));
    const hits = playerBoard.retrieveHitAttacks?.() || [];
    hits.forEach((h) => aiMemory.tried.add(h.toString()));
    let coord;
    if (aiMemory.targetStack.length > 0) {
      coord = aiMemory.targetStack.pop();
    } else {
      const coords = [];
      const size = 10;
      for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
          if (!aiMemory.tried.has([r, c].toString())) {
            coords.push([r, c]);
          }
        }
      }
      coord = coords[Math.floor(Math.random() * coords.length)];
    }
    const result = ai.attack(player, coord);
    aiMemory.tried.add(coord.toString());
    if (result === "hit") {
      const [row, col] = coord;
      const smartMoves = [
        [row - 1, col],
        [row + 1, col],
        [row, col - 1],
        [row, col + 1],
      ];
      smartMoves.forEach(([r, c]) => {
        if (r >= 0 && r < 10 && c >= 0 && c < 10) {
          if (!aiMemory.tried.has([r, c].toString())) {
            aiMemory.targetStack.push([r, c]);
          }
        }
      });
    }
    return coord;
  }
  function isGameOver() {
    if (gameOver === true) return true;
  }
  return { playTurn, isGameOver };
};
