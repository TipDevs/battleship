import "./styles.css";
import { initGame } from "./modules/click";
import { Ship } from "./modules/ship";
import { Gameboard } from "./modules/gameboard";
import { Player } from "./modules/player";
import { DOM } from "./modules/dom";
import { Game } from "./modules/game";
window.addEventListener("load", () => {
  document.body.style.visibility = "visible";
});
initGame(Player, Ship, Gameboard, DOM, Game);
