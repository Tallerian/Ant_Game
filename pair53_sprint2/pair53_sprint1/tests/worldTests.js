import { World} from "../src/world.js";
import { WorldMap } from "../src/world_map.js";
import { WorldCell } from "../src/world_cell.js";
import {Bug, Color} from "../src/bug.js";

import assert from "assert";

function cellAt(w, h, x, y, map) {
  return map[w * x + y];
}
describe("WorldMap", function () {
  it("Simple test WorldMap.parseMap()", function () {
    const map = `
                  4
                  4
                  ####
                  ##-#
                  #+##
                  ####
                  `;

    const worldMap = WorldMap.parseMap(map);

    assert.equal(worldMap.length, 16);
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (i === 1 && j === 2) continue; // for "-" cell
        if (i === 2 && j === 1) continue; // for "+" cell

        assert.equal(cellAt(4, 4, i, j, worldMap).isObstructed(), 1);
      }
    }

    assert.equal(cellAt(4, 4, 1, 2, worldMap).isFriendlyBase(Color.black), 1); // for "-" cell
    assert.equal(cellAt(4, 4, 2, 1, worldMap).isFriendlyBase(Color.red), 1); // for "+" cell
  });

  it("All kinds of Cells are supported", function () {
    const map = `
                  5
                  5
                  #5#6#
                  81-7#
                  9+#2#
                  4#3##
                  #####
                  `;

    const worldMap = WorldMap.parseMap(map);
    assert.equal(worldMap.length, 25);

    assert.equal(cellAt(5, 5, 0, 1, worldMap).getFood(), 5);
    assert.equal(cellAt(5, 5, 0, 3, worldMap).getFood(), 6);
    assert.equal(cellAt(5, 5, 1, 0, worldMap).getFood(), 8);
    assert.equal(cellAt(5, 5, 1, 1, worldMap).getFood(), 1);
    assert.equal(cellAt(5, 5, 1, 3, worldMap).getFood(), 7);
    assert.equal(cellAt(5, 5, 2, 0, worldMap).getFood(), 9);
    assert.equal(cellAt(5, 5, 2, 3, worldMap).getFood(), 2);
    assert.equal(cellAt(5, 5, 3, 0, worldMap).getFood(), 4);
    assert.equal(cellAt(5, 5, 3, 2, worldMap).getFood(), 3);
  });
});

describe("WorldCell", function () {
  it("Initial settings", function () {
    const worldSet = new WorldCell(true, 5, "black");
    assert.equal(worldSet.isObstructed(), true);
    assert.equal(worldSet.getFood(), 5);
    assert.equal(worldSet.getBug(), null);
    assert.equal(worldSet.isFriendlyBase("black"), true);
  });

  it("Work with bugs", function () {
    const worldSet = new WorldCell(true, 5, "black");
    assert.equal(worldSet.getBug(), null);
    worldSet.setBug(new Bug(null, null, null, null, null, null));
    assert.notEqual(worldSet.getBug(), null);
    worldSet.removeBug();
    assert.equal(worldSet.getBug(), null);
  });

  it("Work with food", function () {
    const worldSet = new WorldCell(true, 5, "black");
    assert.equal(worldSet.getFood(), 5);
    worldSet.setFood(10);
    assert.equal(worldSet.getFood(), 10);
  });

  it("Work with color", function () {
    const worldSet = new WorldCell(true, 5, "black");
    assert.equal(worldSet.isFriendlyBase("black"), true);
    assert.equal(worldSet.isFriendlyBase("red"), false);
    assert.equal(worldSet.isEnemyBase("red"), true);
    assert.equal(worldSet.isEnemyBase("black"), false);
  });

  it("Work with color", function () {
    const worldSet = new WorldCell(true, 5, "black");
    assert.equal(worldSet.isFriendlyBase("black"), true);
    assert.equal(worldSet.isFriendlyBase("red"), false);
    assert.equal(worldSet.isEnemyBase("red"), true);
    assert.equal(worldSet.isEnemyBase("black"), false);
  });

  it("Work with marker", function () {
    const worldSet = new WorldCell(true, 5, "black");
    assert.equal(worldSet.isFriendlyMarker("black"), false);
    worldSet.setMarker("black", 1);
    assert.equal(worldSet.isFriendlyMarker("black"), true);
    assert.equal(worldSet.isFriendlyMarker("red"), false);
    assert.equal(worldSet.isEnemyMarker("red"), true);
    assert.equal(worldSet.isEnemyMarker("black"), false);
    worldSet.clearMarker();
    assert.equal(worldSet.isFriendlyMarker("black"), false);
  });
});

describe("World", function () {
  const world = `
                  4
                  4
                  ####
                  ##-#
                  #+##
                  ####
                  `;
  const worldMap = WorldMap.parseMap(world);
  const testworld = new World(4, 4, worldMap);
  it("Simple test World construcotor", function () {
    assert.equal(testworld.w, 4);
    assert.equal(testworld.h, 4);
    assert.equal(testworld.map.length, 16);
  });

  it("Test world cell at ", function () {
    assert.equal(testworld.cellAt(0,0).isObstructed(), 1);
    assert.equal(testworld.cellAt(1, 2).isObstructed(), 0);
    assert.equal(testworld.cellAt(2, 1).isObstructed(), 0);
    assert.equal(testworld.cellAt(1, 2).isFriendlyBase(Color.black), 1);
  });

  it("Test adjacent cell for even rows ", function () {
    assert.equal(testworld.adjacent(1,1,0), testworld.cellAt(1,2));
    assert.equal(testworld.adjacent(1,1,1), testworld.cellAt(2,2));
    assert.equal(testworld.adjacent(1,1,2), testworld.cellAt(2,1));
    assert.equal(testworld.adjacent(1,1,3), testworld.cellAt(1,0));
    assert.equal(testworld.adjacent(1,1,4), testworld.cellAt(0,1));
    assert.equal(testworld.adjacent(1,1,5), testworld.cellAt(0,2));
  });

  it("Test adjacent cell for odd rows ", function () {
    assert.equal(testworld.adjacent(2,1,0), testworld.cellAt(2,2));
    assert.equal(testworld.adjacent(2,1,1), testworld.cellAt(3,1));
    assert.equal(testworld.adjacent(2,1,2), testworld.cellAt(3,0));
    assert.equal(testworld.adjacent(2,1,3), testworld.cellAt(2,0));
    assert.equal(testworld.adjacent(2,1,4), testworld.cellAt(1,0));
    assert.equal(testworld.adjacent(2,1,5), testworld.cellAt(1,1));

  });

});

