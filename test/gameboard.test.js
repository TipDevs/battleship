import { Gameboard } from "../src/modules/gameboard.js";
import { Ship } from "../src/modules/ship.js";

describe("Gameboard", () => {
  let board;
  let ship;

  beforeEach(() => {
    board = new Gameboard();
    ship = new Ship(3);
  });

  test("places ship horizontally", () => {
    board.placeShip(ship, [0, 0], "horizontal");
    const gameBoard = board.getBoard();
    expect(gameBoard[0][0]).toBe(ship);
    expect(gameBoard[0][1]).toBe(ship);
    expect(gameBoard[0][2]).toBe(ship);
  });

  test("registers a hit", () => {
    board.placeShip(ship, [0, 0], "horizontal");
    expect(board.receiveAttack([0, 1])).toBe("hit");
    expect(ship.getHitCount()).toBe(1);
  });

  test("registers a miss", () => {
    expect(board.receiveAttack([5, 5])).toBe("miss");
    expect(board.retrieveMissedAttacks()).toContainEqual([5, 5]);
  });

  test("stores multiple missed attacks", () => {
    board.receiveAttack([2, 2]);
    board.receiveAttack([3, 3]);
    board.receiveAttack([4, 4]);

    expect(board.retrieveMissedAttacks()).toEqual([
      [2, 2],
      [3, 3],
      [4, 4],
    ]);
  });

  test("does not count hits as missed attacks", () => {
    board.placeShip(ship, [0, 0], "horizontal");
    board.receiveAttack([0, 0]);

    expect(board.retrieveMissedAttacks()).toEqual([]); // no misses recorded
  });

  test("allShipsSunk returns true when all ships sunk", () => {
    board.placeShip(ship, [0, 0], "horizontal");
    board.receiveAttack([0, 0]);
    board.receiveAttack([0, 1]);
    board.receiveAttack([0, 2]);
    expect(board.allShipsSunk()).toBe(true);
  });
});
