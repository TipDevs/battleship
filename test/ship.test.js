import { Ship } from "../src/modules/ship.js";

describe("Ship", () => {
  test("has a length", () => {
    const ship = new Ship(3);
    expect(ship.getShipLength()).toBe(3);
  });

  test("records hits", () => {
    const ship = new Ship(2);
    ship.hit();
    expect(ship.getHitCount()).toBe(1);
  });

  test("is not sunk if hits < length", () => {
    const ship = new Ship(2);
    ship.hit();
    expect(ship.isSunk()).toBe(false);
  });

  test("is sunk if hits >= length", () => {
    const ship = new Ship(1);
    ship.hit();
    expect(ship.isSunk()).toBe(true);
  });
});
