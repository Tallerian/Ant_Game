import { Assembler } from "../src/bug.js";
import { BugBrain } from "../src/bug.js";

import assert from "assert";

describe("BugBrain", function () {
  it("Simple getNextInstruction() test", function () {
    const asm = `
        sense ahead 1 3 food ; [ 0]
        move 2 0 ; [ 1]
        pickup 8 0 ; [ 2]
        flip 3 4 5 ; [ 3]
        turn left 0 ; [ 4]
        drop 0 ; [ 10]
        `;

    const instructions = Assembler.assemble(asm);
    const bugBrain = new BugBrain(instructions);

    assert.equal(bugBrain.getNextInstruction(), instructions[0]);
    assert.equal(bugBrain.getNextInstruction(), instructions[1]);
    assert.equal(bugBrain.getNextInstruction(), instructions[2]);
    assert.equal(bugBrain.getNextInstruction(), instructions[3]);
    assert.equal(bugBrain.getNextInstruction(), instructions[4]);
    assert.equal(bugBrain.getNextInstruction(), instructions[5]);
  });

  it("getNextInstruction() overflow", function () {
    const asm = `
        move 1 0 ; [0]
        turn left 0 ; [1]
        `;

    const instructions = Assembler.assemble(asm);
    const bugBrain = new BugBrain(instructions);

    assert.equal(bugBrain.getNextInstruction(), instructions[0]);
    assert.equal(bugBrain.getNextInstruction(), instructions[1]);
    assert.equal(bugBrain.getNextInstruction(), instructions[0]);
    assert.equal(bugBrain.getNextInstruction(), instructions[1]);
    assert.equal(bugBrain.getNextInstruction(), instructions[0]);
    assert.equal(bugBrain.getNextInstruction(), instructions[1]);
    assert.equal(bugBrain.getNextInstruction(), instructions[0]);
    assert.equal(bugBrain.getNextInstruction(), instructions[1]);
  });
});
