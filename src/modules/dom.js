export const DOM = (() => {
  const startBtn = document.querySelector("#start-btn");
  const shipYard = document.querySelector("#shipyard");
  const playerContainer = document.querySelector("#player > .game-pad");
  const spotAiContainer = document.querySelector("#spotAi > .game-pad");
  function renderBoard(board, container, isAi = false) {
    container.innerHTML = "";
    const grid = board.getBoard();
    grid.forEach((row, r) => {
      row.forEach((cell, c) => {
        const div = document.createElement("div");
        div.dataset.row = r;
        div.dataset.col = c;
        if (!isAi && cell && typeof cell.getShipLength === "function") {
          div.classList.add("ship");
        }

        if (cell === "miss") div.classList.add("miss");
        if (cell === "hit") div.classList.add("hit");
        container.appendChild(div);
      });
    });
  }
  const startGame = (playerName, spotAiName) => {
    const title_indicator = document.querySelector("#title-indicator");
    const game_console = document.querySelector("#game-console");
    const game_start = document.querySelector("#game-start");
    document.querySelector("#player > h2").textContent = playerName;
    document.querySelector("#spotAi > h2").textContent = spotAiName;
    game_start.style.display = "none";
    title_indicator.style.display = "flex";
    game_console.style.display = "flex";
  };
  return {
    renderBoard,
    startGame,
    playerContainer,
    spotAiContainer,
    startBtn,
    shipYard,
  };
})();
