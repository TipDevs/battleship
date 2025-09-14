export class Ship {
  #hitCount = 0;
  #length;
  constructor(length) {
    this.#length = length;
  }
  hit() {
    this.#hitCount++;
  }
  isSunk() {
    return this.#length === this.#hitCount;
  }
  getHitCount() {
    return this.#hitCount;
  }
  getShipLength() {
    return this.#length;
  }
}
