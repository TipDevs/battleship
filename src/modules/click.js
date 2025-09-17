function handleCellClicks(e, game) {
  const div = e.target;
  if (!div.dataset.row || !div.dataset.col) return;
  if (div.classList.contains("miss") || div.classList.contains("hit")) return;
  const row = e.target.dataset.row;
  const col = e.target.dataset.col;
  let result = game.playTurn([row, col]);
  if (game.isGameOver()) {
    setTimeout(() => {
      alert(result);
    }, 500);
    return;
  }
}

function dragAndDrop(
  player,
  spotAi,
  playerGameBoard,
  spotAiGameBoard,
  Ship,
  DOM,
  game
) {
  let draggedShip = null;
  DOM.shipYard.addEventListener("dragstart", (e) => {
    if (e.target.classList.contains("ship")) {
      draggedShip = e.target;
    }
  });
  DOM.playerContainer.addEventListener("dragover", (e) => {
    e.preventDefault();
  });
  DOM.playerContainer.addEventListener("drop", (e) => {
    if (!draggedShip) return;

    const row = parseInt(e.target.dataset.row, 10);
    const col = parseInt(e.target.dataset.col, 10);
    const length = parseInt(draggedShip.dataset.length, 10);

    try {
      playerGameBoard.placeShip(new Ship(length), [row, col], "horizontal");
      draggedShip.remove();
      draggedShip = null;
      DOM.renderBoard(playerGameBoard, DOM.playerContainer);
      if (DOM.shipYard.children.length === 0) {
        DOM.shipYard.parentElement.style.display = "none";
        DOM.spotAiContainer.parentElement.style.display = "flex";
        spotAiGameBoard.placeRandomShip(spotAiGameBoard, new Ship(5));
        spotAiGameBoard.placeRandomShip(spotAiGameBoard, new Ship(4));
        spotAiGameBoard.placeRandomShip(spotAiGameBoard, new Ship(3));
        spotAiGameBoard.placeRandomShip(spotAiGameBoard, new Ship(3));
        spotAiGameBoard.placeRandomShip(spotAiGameBoard, new Ship(2));
        console.log(spotAiGameBoard.getBoard());
        DOM.renderBoard(spotAiGameBoard, DOM.spotAiContainer, true);
        DOM.spotAiContainer.addEventListener("click", (e) => {
          handleCellClicks(e, game);
          DOM.renderBoard(playerGameBoard, DOM.playerContainer);
          DOM.renderBoard(spotAiGameBoard, DOM.spotAiContainer, true);
        });
      }
    } catch (err) {
      alert(err.message); // collision or out of bounds
    }
  });
}

export function initGame(Player, Ship, Gameboard, DOM, Game) {
  DOM.startBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const playerName = document.querySelector("#player-name");
    if (playerName.value.trim() === "") return;
    const spotAi = new Player("spotAi", Gameboard);
    const player = new Player(playerName.value.trim(), Gameboard);
    DOM.startGame(player.getName(), spotAi.getName());
    const spotAiGameBoard = spotAi.getGameBoard();
    const playerGameBoard = player.getGameBoard();
    const game = Game(player, spotAi);
    DOM.renderBoard(playerGameBoard, DOM.playerContainer);
    dragAndDrop(
      player,
      spotAi,
      playerGameBoard,
      spotAiGameBoard,
      Ship,
      DOM,
      game
    );
  });
}
