import { Game } from "../src/modules/game";

describe("Game", () => {
  let player, ai, game;

  beforeEach(() => {
    // mock player and ai objects with minimal behavior
    const createMockPlayer = (name) => ({
      name,
      getName: () => name,
      attack: jest.fn(),
      getGameBoard: jest.fn(() => ({
        allShipsSunk: jest.fn(() => false),
        retrieveMissedAttacks: jest.fn(() => []),
      })),
    });

    player = createMockPlayer("Player");
    ai = createMockPlayer("AI");
    game = Game(player, ai);
  });

  test("player attacks AI when playTurn is called", () => {
    game.playTurn([0, 0]);
    expect(player.attack).toHaveBeenCalledWith(ai, [0, 0]);
  });

  test("AI attacks player after player turn", () => {
    game.playTurn([1, 1]);
    expect(ai.attack).toHaveBeenCalled();
  });

  test("declares player winner if AI ships are all sunk", () => {
    ai.getGameBoard = jest.fn(() => ({
      allShipsSunk: () => true,
      retrieveMissedAttacks: () => [],
    }));
    const result = game.playTurn([0, 0]);
    expect(result).toBe("Player wins");
  });

  test("declares AI winner if player ships are all sunk", () => {
    // Make player’s board report all ships sunk after AI attack
    player.getGameBoard = jest.fn(() => ({
      allShipsSunk: () => true,
      retrieveMissedAttacks: () => [],
    }));
    const result = game.playTurn([0, 0]);
    expect(result).toBe("AI wins");
  });

  test("stops playing once game is over", () => {
    ai.getGameBoard = jest.fn(() => ({
      allShipsSunk: () => true,
      retrieveMissedAttacks: () => [],
    }));
    game.playTurn([0, 0]); // player wins here
    const result = game.playTurn([1, 1]); // try to keep playing
    expect(result).toBeUndefined();
    expect(ai.attack).not.toHaveBeenCalled();
  });
});
