export class Gameboard {
  #size = 10;
  #ships = [];
  #hitAttacks = [];
  #missedAttacks = [];
  #board = Array(this.#size)
    .fill(null)
    .map(() => Array(this.#size).fill(null));
  placeShip(ship, [row, col], direction) {
    const usedCoords = new Set(
      this.#ships.flatMap((port) =>
        port.coordinates.map((coord) => coord.toString())
      )
    );
    const coords = [];
    const size = this.#board.length; // assuming square board
    if (direction === "horizontal") {
      if (col + ship.getShipLength() > size) {
        throw new Error("out of bounds");
      }
      for (let i = 0; i < ship.getShipLength(); i++) {
        if (usedCoords.has([row, col + i].toString())) {
          throw new Error("collision: coordinate has been filled");
        }
        this.#board[row][col + i] = ship;
        coords.push([row, col + i]);
      }
    } else {
      if (row + ship.getShipLength() > size) {
        throw new Error("out of bounds");
      }
      for (let i = 0; i < ship.getShipLength(); i++) {
        if (usedCoords.has([row + i, col].toString())) {
          throw new Error("collision: coordinate has been filled");
        }
        this.#board[row + i][col] = ship;
        coords.push([row + i, col]);
      }
    }
    this.#ships.push({ ship, coordinates: coords });
  }
  placeRandomShip(board, ship) {
    const directions = ["horizontal", "vertical"];
    const size = board.getBoard().length;
    let placed = false;

    while (!placed) {
      const row = Math.floor(Math.random() * size);
      const col = Math.floor(Math.random() * size);
      const direction =
        directions[Math.floor(Math.random() * directions.length)];

      try {
        board.placeShip(ship, [row, col], direction);
        placed = true;
      } catch (err) {
        // Retry on collision or out of bounds
      }
    }
  }

  receiveAttack([row, col]) {
    const attackedCell = this.#board[row][col];
    if (attackedCell === null) {
      this.#board[row][col] = "miss";
      this.#missedAttacks.push([row, col]);
      return "miss";
    }

    if (typeof attackedCell?.hit === "function") {
      attackedCell.hit();
      this.#board[row][col] = "hit";
      this.#hitAttacks.push([row, col]);
      return "hit";
    }

    if (attackedCell === "miss" || attackedCell === "hit") return;
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
  retrieveHitAttacks() {
    return [...this.#hitAttacks];
  }
}
