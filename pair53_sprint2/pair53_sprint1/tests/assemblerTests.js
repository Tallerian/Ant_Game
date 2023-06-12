import { Bug } from "../src/bug.js";
import { BugBrain } from "../src/BugBrain.js";
import { Assembler, Color } from "../src/utils.js";
import { directions } from "../src/utils.js";
import { conditions } from "../src/utils.js";
import { cellDirections } from "../src/utils.js";
import { Instruction } from "../src/utils.js";

import assert from "assert";

describe("Assembler", function () {
  it("Simple test Assembler.assemble()", function () {
    const asm = `
        move 1 0 ; [0]
        turn left 0 ; [1]
        `;

    const instructions = Assembler.assemble(asm);

    assert.equal(instructions[0].thenLabel, 1);
    assert.equal(instructions[0].elseLabel, 0);
    assert.equal(instructions[0].type, Instruction.instructions.move);

    assert.equal(instructions[1].thenLabel, 0);
    assert.equal(instructions[1].direction, directions.left);
    assert.equal(instructions[1].type, Instruction.instructions.turn);
  });

  it("Complex test Assembler.assemble()", function () {
    const asm = `
        sense ahead 1 3 food ; [ 0]
        move 2 0 ; [ 1]
        pickup 8 0 ; [ 2]
        flip 3 4 5 ; [ 3]
        turn left 0 ; [ 4]
        drop 0 ; [ 10]
        `;

    const instructions = Assembler.assemble(asm);

    assert.equal(instructions[0].thenLabel, 1);
    assert.equal(instructions[0].elseLabel, 3);
    assert.equal(instructions[0].type, Instruction.instructions.sense);
    assert.equal(instructions[0].condition, conditions.food);
    assert.equal(instructions[0].direction, cellDirections.ahead);

    assert.equal(instructions[1].thenLabel, 2);
    assert.equal(instructions[1].elseLabel, 0);
    assert.equal(instructions[1].type, Instruction.instructions.move);

    assert.equal(instructions[2].thenLabel, 8);
    assert.equal(instructions[2].elseLabel, 0);
    assert.equal(instructions[2].type, Instruction.instructions.pickup);

    assert.equal(instructions[3].thenLabel, 4);
    assert.equal(instructions[3].elseLabel, 5);
    assert.equal(instructions[3].type, Instruction.instructions.flip);
    assert.equal(instructions[3].probability, 3);

    assert.equal(instructions[4].thenLabel, 0);
    assert.equal(instructions[4].type, Instruction.instructions.turn);
    assert.equal(instructions[4].direction, directions.left);

    assert.equal(instructions[5].thenLabel, 0);
    assert.equal(instructions[5].type, Instruction.instructions.drop);
  });

  it("Bug Class test", function(){
    const asm = `
    `;

    const bug_brain = new BugBrain(asm);
    const bug = new Bug(1, Color.red, true, bug_brain, 3, 4); //assuming true means alive

    assert.deepStrictEqual(bug.getPosition(), [3, 4]);
    assert.equal(bug.getColor(), Color.red);
    assert.equal(bug.brain.getpos(), 0);
  })

  it ("Bug brain insruction test", function(){
    const asm = `
    move 1 0 ; [0]
    turn left 0 ; [1]
    `;

    const instructions = Assembler.assemble(asm);
    const bug_brain = new BugBrain(instructions);
    const bug = new Bug(1, 'red', true, bug_brain, 3, 4); //assuming true means alive
    
    assert.equal(bug.brain.getpos(), 0);
    assert.deepStrictEqual(bug.brain.getNextInstruction(), instructions[0])
    assert.equal(bug.brain.getpos(), 1); //testing if position is updated
    
  })

});
