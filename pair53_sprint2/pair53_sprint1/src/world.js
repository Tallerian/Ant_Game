"use strict"

import { Bug } from "./bug.js";
import { Color, Instruction, conditions, cellDirections } from "./utils.js";
import { directions } from "./utils.js";
import { WorldMap } from "./world_map.js";
import { WorldCell } from "./world_cell.js";


export class World {
  constructor(w, h, cells) {
    this.w = w; // number of element in each row
    this.h = h; // number of rows
    this.map = cells; // array of cells
    this.bugs1 = []; // array of coordinates of bugs of the first team
    this.bugs2 = []; // array of coordinates of bugs of the second team

    //iterate over all cells and create two arrays to store the x and y coordinate of the bugs
    for(let i = 0; i < this.h; i++) {
      for(let j = 0; j < this.w; j++) {
        if(this.cellAt(i, j).isOccupied()) {
          if(this.cellAt(i,j).getBug().color == Color.red) {
            this.bugs1.push([i, j]);
          } else {
            this.bugs2.push([i, j]);
          }
        }
      }
    }
  

  }

  // Get sell with given position.
  cellAt(x, y) {
    return this.map[this.w * x + y];
  }


  adjacent(x, y, direction) {
    /*
  * param
  * x: int - x coordinate of the cell
  * y: int - y coordinate of the cell
  * direction: int - 0-5 show the direction
  */
    if (direction < 0 || direction > 5) {
      throw Error('direction should be 0-5');
    }
    //correct offset values for the different directions
    const evenDY = [1, 1, 0, -1, 0, 1];
    const oddDY = [1, 0, -1, -1, -1, 0];
    const DX = [0, 1, 1, 0, -1, -1];
    //if the y coordinate is even, use evenDX, else use oddDX
    if(x % 2 == 1) {
      return this.cellAt(x + DX[direction], y + evenDY[direction]);
    } else {
      return this.cellAt(x + DX[direction], y + oddDY[direction]);
    }
  }

  adjacentcoord(x, y, direction) {
    /*
  * param
  * x: int - x coordinate of the cell
  * y: int - y coordinate of the cell
  * direction: int - 0-5 show the direction
  */
    if (direction < 0 || direction > 5) {
      throw Error('direction should be 0-5');
    }
    //correct offset values for the different directions
    const evenDY = [1, 1, 0, -1, 0, 1];
    const oddDY = [1, 0, -1, -1, -1, 0];
    const DX = [0, 1, 1, 0, -1, -1];

    //if the y coordinate is even, use evenDX, else use oddDX
    if(x % 2 == 1) {
      return [x + DX[direction], y + evenDY[direction]];
    } else {
      return [x + DX[direction], y + oddDY[direction]];
    }
  }

  turn(direction, turn) {
    return (6 + direction + turn) % 6;
  }

  sensedCell(x, y, direction) {
    // TODO
  }

  isObstructedAt(x, y) {
    return this.cellAt(x, y).isObstructed();
  }

  isOccupiedAt(x, y) {
    return this.cellAt(x, y).isOccupied();
  }

  setBugAt(x, y, bug) {
    this.cellAt(x, y).setBug(bug);
  }

  removeBugAt(x ,y) {
    this.cellAt(x, y).removeBug();
  }

  setFoodAt(x, y, amount) {
    this.cellAt(x, y).setFood(amount);
  }

  getFoodAt(x, y) {
    this.cellAt(x, y).getFood();
  }

  isFriendlyBaseAt(x, y, color) {
    return this.cellAt(x, y).isFriendlyBase(color);
  }

  isEnemyBaseAt(x, y, color) {
    return this.cellAt(x, y).isEnemyBase(color);
  }

  setMarkerAt(x, y, color, n) {
    this.cellAt(x, y).setMarker(color, n);
  }

  clearMarkerAt(x, y) {
    this.cellAt(x, y).clearMarker();
  }

  isFriendlyMarkerAt(x, y, color) {
    this.cellAt(x, y).isFriendlyMarker(color);
  }

  isEnemyMarkerAt(x, y, color) {
    this.cellAt(x, y).isEnemyMarker(color);
  }

  toString() {
    // TODO
  }

  // function to progress the world by one step
  runIteration() {
    //run over all bugs and alternate between the two teams to move the bugs
    const maxlen = Math.max(this.bugs1.length, this.bugs2.length);
    for(let i = 0; i < maxlen; i++) {
      if(i < this.bugs1.length) {
        this.bugs1 = this.executeInstruction(this.bugs1[i], this.bugs1, i);
      }
      if(i < this.bugs2.length) {
        this.bugs2=this.executeInstruction(this.bugs2[i], this.bugs2, i);
      }
    }
  }

  // function to execute the instruction of a bug
  executeInstruction(bug, bugsarray, idx) {
    //get the bug object from the cell
    let bugObject = this.cellAt(bug[0], bug[1]).getBug();
    let instruction = bugObject.brain.getNextInstruction();
    let condidtion_met = false;

    switch(instruction.type) {

      //_______________________SENSE_______________________

      case Instruction.instructions.sense:
        let sensed = null;

        //--- checking all possible sensing direction as documented
        switch(instruction.direction) {
          case cellDirections.here:
            sensed = this.cellAt(bug[0], bug[1]);
          break;
          case cellDirections.ahead:
            sensed = this.adjacent(bug[0], bug[1], bugObject.direction);
          break;
          case cellDirections.leftahead:
            sensed = this.adjacent(bug[0], bug[1], this.turn(bugObject.direction, -1));
          break;
          case cellDirections.rightahead:
            sensed = this.adjacent(bug[0], bug[1], this.turn(bugObject.direction, 1));
          break;
        }

        // getting condition met on the sensed cell
        switch (instruction.condition) {
          case conditions.friend:
            condidtion_met = sensed.isOccupied() && sensed.getBug().color == bugObject.color;
          break;
          case conditions.foe:
            condidtion_met = sensed.isOccupied() && sensed.getBug().color != bugObject.color;
          break;
          case conditions.friendwithfood: 
          // TODO
          break;
          case conditions.foewithfood:
          // TODO
          break;
          case conditions.food:
            condidtion_met = sensed.getFood() > 0;
          break;
          case conditions.rock:
            condidtion_met = sensed.isObstructed();
          break;
          case conditions.marker:
            //  TODO
          break;
          case conditions.foemarker:
            // TODO
          break;
          case conditions.home:
            condidtion_met = sensed.isFriendlyBase(bugObject.color);
          break;
          case conditions.foehome:
            condidtion_met = sensed.isEnemyBase(bugObject.color);
          break;
        }

        // From the condition meet we can update the positon of the instruction of the bug Brain
        if (condidtion_met) {
          bugObject.brain.setpos(instruction.thenLabel);
        } else {
          bugObject.brain.setpos(instruction.elseLabel);
        }
        /// updating it in the cell as well
        this.cellAt(bug[0], bug[1]).setBug(bugObject);
        break;


      //_______________________MOVE_______________________
      case Instruction.instructions.move:
        //get the cell infront of the bug
        let next = this.adjacent(bug[0], bug[1], bugObject.direction);

        //if the cell is free move to it and remove the bug from the current cell and put its positon to thenLabel
        if(!next.isObstructed() && !next.isOccupied()) {
          this.removeBugAt(bug[0], bug[1]);
          bugObject.brain.setpos(instruction.thenLabel);
          this.adjacent(bug[0], bug[1], bugObject.direction).setBug(bugObject);
          bugsarray[idx] = this.adjacentcoord(bug[0], bug[1], bugObject.direction);
        } 
        //if the cell is occupied, set the position to elseLabel
        else {
          bugObject.brain.setpos(instruction.elseLabel);
          this.cellAt(bug[0], bug[1]).setBug(bugObject);
        }

      break;

      //_______________________PICKUP_______________________
      case Instruction.instructions.pickup:
        //check if there is food to pickup
        let food = this.cellAt(bug[0], bug[1]).getFood();
        if (food > 0) {
          //decrement food change instruction accordingly
          bugObject.brain.setpos(instruction.thenLabel);
          bugObject.hasFood = true;
          this.cellAt(bug[0], bug[1]).setFood(food - 1);
          this.cellAt(bug[0], bug[1]).setBug(bugObject);
        } else {
          bugObject.brain.setpos(instruction.elseLabel);
          this.cellAt(bug[0], bug[1]).setBug(bugObject);
        }
      break;


      //_______________________TURN_______________________

      // as labeled in the class Instruction, we check for direction
      case Instruction.instructions.turn:
        // if the direction is left, we turn left, else we turn right
        if (instruction.direction == directions.left) {
          bugObject.direction = this.turn(bugObject.direction, -1);
        } else {
          bugObject.direction = this.turn(bugObject.direction, 1);
        }
        // update the bug position in the cell
        bugObject.brain.setpos(instruction.thenLabel);
        this.cellAt(bug[0], bug[1]).setBug(bugObject);
        break;

        //_______________________DROP_______________________
        case Instruction.instructions.drop:
          // if the bug has food, we drop it in the cell and update the instruction
          if (bugObject.hasFood) {
            bugObject.hasFood = false;
            this.cellAt(bug[0], bug[1]).setFood(this.cellAt(bug[0], bug[1]).getFood() + 1);
            bugObject.brain.setpos(instruction.thenLabel);
          }
          // else we update the instruction to elseLabel
          else {
            bugObject.brain.setpos(instruction.elseLabel);
          }
          this.cellAt(bug[0], bug[1]).setBug(bugObject);
        break;
    }
    // return the updated array of bugs
    return bugsarray;
  }
}
