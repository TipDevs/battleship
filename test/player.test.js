import { Player } from "../src/modules/player.js";
import { Gameboard } from "../src/modules/gameboard.js";
import { Ship } from "../src/modules/ship.js";
describe("Player", () => {
  let Ai;
  let player;
  let ship;
  let aiGameBoard;
  let playerGameBoard;
  beforeEach(() => {
    Ai = new Player("spotAi", Gameboard);
    player = new Player("TipDevs", Gameboard);
    ship = new Ship(3);
    aiGameBoard = Ai.getGameBoard();
    playerGameBoard = player.getGameBoard();
    aiGameBoard.placeShip(ship, [0, 0], "horizontal");
  });
  test("Ai has a name", () => {
    expect(Ai.getName()).toBe("spotAi");
  });
  test("Ai has a gameboard", () => {
    expect(aiGameBoard).toBeInstanceOf(Gameboard);
  });

  test("Player has a name", () => {
    expect(player.getName()).toBe("TipDevs");
  });
  test("Player has a gameboard", () => {
    expect(playerGameBoard).toBeInstanceOf(Gameboard);
  });

  test("Player can attack opponent’s board and register a hit", () => {
    player.attack(Ai, [0, 0]);
    const aiBoard = aiGameBoard.getBoard();
    expect(aiBoard[0][0]).not.toBeNull(); // cell should still reference a ship
    expect(aiBoard[0][0].getHitCount()).toBe(1); // use board reference
  });

  test("Player can attack opponent’s board and register a miss", () => {
    player.attack(Ai, [5, 5]); // no ship there
    expect(aiGameBoard.retrieveMissedAttacks()).toContainEqual([5, 5]);
  });
});
