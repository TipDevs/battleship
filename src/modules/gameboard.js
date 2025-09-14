export class Gameboard {
  #size = 10;
  #ships = [];
  #missedAttacks = [];
  #board = Array(this.#size)
    .fill(null)
    .map(() => Array(this.#size).fill(null));
  placeShip(ship, [row, col], direction) {
    const coords = [];
    if (direction === "horizontal") {
      for (let i = 0; i < ship.getShipLength(); i++) {
        this.#board[row][col + i] = ship;
        coords.push([row, col + i]);
      }
    } else {
      for (let i = 0; i < ship.getShipLength(); i++) {
        this.#board[row + i][col] = ship;
        coords.push([row + i, col]);
      }
    }
    this.#ships.push({ ship, coordinates: coords });
  }
  receiveAttack([row, col]) {
    const attackedCell = this.#board[row][col];
    if (attackedCell === null) {
      this.#missedAttacks.push([row, col]);
      return "miss";
    } else {
      attackedCell.hit();
      return "hit";
    }
  }
  allShipsSunk() {
    return this.#ships.every((port) => port.ship.isSunk());
  }
  getBoard() {
    return this.#board.map((row) => [...row]);
  }
  retrieveMissedAttacks() {
    return [...this.#missedAttacks];
  }
}
