"use strict";
// Enum-like structure for Directions.

export const directions = {
  left: Symbol("left"),
  right: Symbol("right")
};
// Enum-like structure for Cell Directions.

export const cellDirections = {
  here: Symbol("here"),
  leftahead: Symbol("leftahead"),
  rightahead: Symbol("rightahead"),
  ahead: Symbol("ahead")
};
// Enum-like structure for Conditions.

export const conditions = {
  friend: Symbol("friend"),
  foe: Symbol("foe"),
  friendwithfood: Symbol("friendwithfood"),
  foewithfood: Symbol("foewithfood"),
  food: Symbol("food"),
  rock: Symbol("rock"),
  marker: Symbol("marker"),
  foemarker: Symbol("foemarker"),
  home: Symbol("home"),
  foehome: Symbol("foehome")
};
// Enum-like structure for Colors.

export const Color = {
  red: Symbol("red"),
  black: Symbol("black")
};

export class Instruction {

  // Enum-like structure for Bug Instructions.
  static instructions = {
    sense: Symbol("sense"),
    turn: Symbol("turn"),
    mark: Symbol("mark"),
    move: Symbol("move"),
    unmark: Symbol("unmark"),
    flip: Symbol("flip"),
    pickup: Symbol("pickup"),
    direction: Symbol("direction"),
    drop: Symbol("drop"),
    label: Symbol("label"),
  };

  constructor(instruction) {
    // instructions : string[]
    if (instruction?.[0] == null)
      throw "asm file corrupted";

    this.type = Instruction.instructions[instruction[0]];
    if (instruction[0] === "sense") {
      const [/* sense */, direction, thenLabel, elseLabel, condition] = instruction;
      this.condition = conditions[condition];
      this.direction = cellDirections[direction];
      this.thenLabel = Number(thenLabel);
      this.elseLabel = Number(elseLabel);
    }

    if (instruction[0] === "move") {
      const [/* move */, thenLabel, elseLabel] = instruction;
      this.thenLabel = Number(thenLabel);
      this.elseLabel = Number(elseLabel);
    }

    if (instruction[0] === "pickup") {
      const [/* pickup */, thenLabel, elseLabel] = instruction;
      this.thenLabel = Number(thenLabel);
      this.elseLabel = Number(elseLabel);
    }

    if (instruction[0] === "flip") {
      const [/* flip */, probability, thenLabel, elseLabel] = instruction;
      this.probability = Number(probability);
      this.thenLabel = Number(thenLabel);
      this.elseLabel = Number(elseLabel);
    }

    if (instruction[0] === "turn") {
      const [/* turn */, direction, thenLabel] = instruction;
      this.direction = directions[direction];
      this.thenLabel = Number(thenLabel);
    }

    if (instruction[0] === "mark") {
      const [/* mark */, marker, thenLabel] = instruction;
      this.marker = Number(marker);
      this.thenLabel = Number(thenLabel);
    }

    if (instruction[0] === "unmark") {
      const [/* unmark */, marker, thenLabel] = instruction;
      this.marker = Number(marker);
      this.thenLabel = Number(thenLabel);
    }

    if (instruction[0] === "drop") {
      const [/* drop */, thenLabel] = instruction;
      this.thenLabel = Number(thenLabel);
    }
  }
}

export class Assembler {
  constructor() { } // University


  // Parse given Bug ASM and return array of instructions.
  static assemble(asmFile) {
    let instructions = [];

    asmFile
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line !== "")
      .forEach((line) => {
        const instruction = line.split(/ |\t|;/).filter((word) => word !== "");
        instructions.push(new Instruction(instruction));
      });

    return instructions;
  }
}
