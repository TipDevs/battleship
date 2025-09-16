export class Player {
  #name;
  #gameBoard;
  constructor(name, gameBoard) {
    this.#name = name;
    this.#gameBoard = new gameBoard();
  }
  attack(target, coord) {
    target.getGameBoard().receiveAttack(coord);
  }
  getName() {
    return this.#name;
  }
  getGameBoard() {
    return this.#gameBoard;
  }
}
