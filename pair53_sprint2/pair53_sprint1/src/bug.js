"use strict";

export class Bug {
  constructor(id, color, state, brain, x, y) {
    this.id = id;
    this.brain = brain;
    this.color = color;
    this.state = state;
    //randomising the direction of the bugs for better experience
    let randomNumber = Math.random() * 6; // 6 is the range (0-5) + 1
    randomNumber = Math.floor(randomNumber);
    this.direction = randomNumber;
    this.x = x;
    this.y = y;
  }

  // Get current bug's position.
  getPosition() {
    return [this.x, this.y];
  }
  
  getDirection() {
    return this.direction;
  }

  getColor() {
    return this.color;
  }

  toString() {
    // TODO
  }
}
