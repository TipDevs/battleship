export class Player {
  #name;
  #gameBoard;
  constructor(name, gameBoard) {
    this.#name = name;
    this.#gameBoard = new gameBoard();
  }
  getName() {
    return this.#name;
  }
  getGameBoard() {
    return this.#gameBoard;
  }
}
