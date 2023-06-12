"use strict";

export class BugBrain {
  #instructions;
  #pos;

  constructor(instructions) {
    this.#pos = 0;
    this.#instructions = instructions;
  }

  // Get next instruction in BugBrain
  getNextInstruction() {

    if (this.#pos === this.#instructions.length)
      this.#pos = 0;
    return this.#instructions[this.#pos++];
  }

  setpos(pos) {
    this.#pos = pos;
  }

  getpos() {
    return this.#pos;
  }
}
