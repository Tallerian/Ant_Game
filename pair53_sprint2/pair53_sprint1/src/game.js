import {getGameProcess} from "./index.js";
import {World} from "./world.js";
import {WorldMap} from "./world_map.js";
import { Color } from "./utils.js";

export const makeStats = () => {
    return `
    <ul>
      <li>
        !!! Disclaimer : Real stats will be added later !!!
        Iterations: ${getGameProcess().currentIteration}/${getGameProcess().iterations}
      </li>
      <li>
        Amount of undetected food: ${getGameProcess().getAmountOfUndetectedFood()}
      </li>

      <li>
        First bugs team remaining: ${getGameProcess().numberOfFirstBugsTeam - getGameProcess().firstBugsTeamKilled}
      </li>

      <li>
        First bugs team killed: ${getGameProcess().firstBugsTeamKilled}
      </li>

      <li>
        Food brought home for first bugs team: ${getGameProcess().foodBroughtForFirstBugsTeam}
      </li>

      <li>
        Second bugs team remaining: ${getGameProcess().numberOfSecondBugsTeam - getGameProcess().secondBugsTeamKilled}
      </li>

      <li>
        Second bugs team killed: ${getGameProcess().secondBugsTeamKilled}
      </li>

      <li>
        Food brought home for second bugs team: ${getGameProcess().foodBroughtForSecondBugsTeam}
      </li>
    </ul>
    `;
};


// -------------- Add map here -----------------------

export function gamePage() {
    return `
  <div class="game-page">
    <div class="field" id="field">
      <canvas id="canvas"> </canvas>
    </div>

    <div class="sidebar">
      <button onclick='renderOptionsPage()'>Options</button>
      <button onclick='renderQuitPage()'>Quit</button>
      <div class="stats" id="stats">
        ${makeStats()}
      </div>
    </div>
  </div>
  `
}

export function setcanvas(){
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = document.getElementById("field").offsetWidth;
  canvas.height = document.getElementById("field").offsetHeight;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

export function drawWorld(world) {
  /*
  * params
  * world contains the following:
  *  - x_game: number of hexagons in x direction
  * - y_game: number of hexagons in y direction
  *  map: 2d array of cells
  */

  //initialize canvas
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  //set canvas width width of game field
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  //get world dimensions
  const world_width = world.w;
  const world_height = world.h;
  const world_map = world.map; 

  //get x and y values for center of hexagons
  const vals = XY_vals(world_width, world_height, canvas.width, canvas.height);

  const x_vals = vals[0];
  const y_vals = vals[1];

  //r is the distance from the center of the hexagon to the center of one of its sides
  const r = vals[2]

  // //call function to draw the grid
  drawGrid(ctx, x_vals, y_vals, world_width, world_height, r);

  // //call function to draw the obstructions and bases of both teams
  drawObstructions(ctx, world_map, x_vals, y_vals, world_width, world_height, r);

  // //call function to draw the food
    drawFood(ctx, world_map, x_vals, y_vals, world_width, world_height, r);

  //call function to draw the bugs
  drawBugs(ctx, world_map, x_vals, y_vals, world_width, world_height, r);
}

function XY_vals(x_game, y_game, x_screen, y_screen) {
  /*
  * params
  * x_game: number of hexagons in x direction
  * y_game: number of hexagons in y direction
  * x_screen: width of screen
  * y_screen: height of screen
  * returns
  * x_vals: 2d array of x values for center of hexagons
  * y_vals: 2d array of y values for center of hexagons
  * r: characteristic dist of hexagons
  * */
  //calculate radius of hexagons and offsets to center the grid according to the screen size
  const a = 2 * Math.PI / 6;
  const rx = x_screen / (2 * (x_game + 2));
  const ry = y_screen / (2 * ((y_game + 2) * Math.sin(a)));
  const r = Math.min(ry, rx);
  const x_offset = (x_screen - 2 * (x_game + 1) * r) / 2;
  const y_offset = (y_screen - 2 * (y_game + 2) * r * Math.sin(a)) / 2;

  // create array of x for center of hexagons
  let x_vals = [];
  for (let i = 0; i < x_game; i++) {
    x_vals.push([]);
    for (let j = 0; j < y_game; j++) {
      if (j % 2 == 0) {
        x_vals[i].push(x_offset + 2 * r * i + r);
      }
      else {
        x_vals[i].push(x_offset + 2 * r * i + 2 * r);
      }
    }
  }

  // create array of y for center of hexagons
  let y_vals = [];
  for (let i = 0; i < x_game; i++) {
    y_vals.push([]);
    for (let j = 0; j < y_game; j++) {
      y_vals[i].push(y_offset + r + j * 2 * r * Math.sin(a) + r * Math.sin(a));
    }
  }
  return [x_vals, y_vals, r];
}


function drawGrid(ctx, x_vals, y_vals, x_game, y_game, r) {
  /*
  * params
  * ctx: canvas context
  * x_vals: 2d array of x values for center of hexagons
  * y_vals: 2d array of y values for center of hexagons
  * x_game: number of hexagons in x direction
  * y_game: number of hexagons in y direction
  * r: characteristic dist of hexagons
  * */
  //draw hexagons
  for (let i = 0; i < x_game; i++) {
    for (let j = 0; j < y_game; j++) {
        drawHexagon(ctx, r, x_vals[i][j], y_vals[i][j])
      }
    }
}

function drawHexagon(ctx, r, x, y, color = "#d8d8da") {
  /*
  * params
  * ctx: canvas context
  * r: characteristic dist of hexagons
  * x: x value of center of hexagon
  * y: y value of center of hexagon
  * color: color of hexagon
  * */
  //calculate important angles and length
  const a = 2 * Math.PI / 6;
  const y_n = y - r / Math.sin(a);
  //draw hexagon using trigonometry
  ctx.beginPath();
  ctx.moveTo(x, y_n);
  ctx.lineTo(x + r, y_n + r / Math.tan(a));
  ctx.lineTo(x + r, y_n + (3 * r) / Math.tan(a));
  ctx.lineTo(x, y_n + 4 * r / Math.tan(a));
  ctx.lineTo(x - r, y_n + (3 * r) / Math.tan(a));
  ctx.lineTo(x - r, y_n + r / Math.tan(a));
  ctx.closePath();
  //fill and stroke hexagon so that it is visible and shows the correct color
  ctx.fillStyle = color;
  ctx.fill();
  ctx.stroke();
}

function drawObstructions(ctx, world_map, x_vals, y_vals, x_game, y_game, r) {
  /*
  * params
  * ctx: canvas context
  * world_map: 2d array of hexagons
  * x_vals: 2d array of x values for center of hexagons
  * y_vals: 2d array of y values for center of hexagons
  * r: characteristic dist of hexagons
  * x_game: number of hexagons in x direction
  * y_game: number of hexagons in y direction
  * */
  //draw hexagons in the correct color if they are obstructed or a base
  for (let i = 0; i < x_game; i++) {
    for (let j = 0; j < y_game; j++) {
      if (world_map[j*x_game + i].isObstructed() == true) {
        drawHexagon(ctx, r, x_vals[i][j], y_vals[i][j], "#1a1a1a");
      }
      else if (world_map[j * x_game + i].isFriendlyBase(Color.red) == true) {
        drawHexagon(ctx, r, x_vals[i][j], y_vals[i][j], "#ff9f80");
      }
      else if (world_map[j * x_game + i].isFriendlyBase(Color.black) == true) {
        drawHexagon(ctx, r, x_vals[i][j], y_vals[i][j], "#595959");
      }
    }
  }
}

function drawFood(ctx, world_map, x_vals, y_vals, x_game, y_game, r) {
  /*
  * params
  * ctx: canvas context
  * world_map: 2d array of hexagons
  * x_vals: 2d array of x values for center of hexagons
  * y_vals: 2d array of y values for center of hexagons
  * r: characteristic dist of hexagons
  * x_game: number of hexagons in x direction
  * y_game: number of hexagons in y direction
  * */
  //draw food if there is any
  for (let i = 0; i < x_game; i++) {
    for (let j = 0; j < y_game; j++) {
      if (world_map[j * x_game + i].getFood() > 0) {
        drawCrumbs(ctx, r, x_vals[i][j], y_vals[i][j], world_map[j * x_game + i].getFood());
      }
    }
  }
}

function drawCrumbs(ctx, r, x, y, num) {
  /*
  * params
  * ctx: canvas context
  * r: characteristic dist of hexagons
  * x: x value of center of hexagon
  * y: y value of center of hexagon
  *  */
  const a = r / 2;
  //create array with 9 points for the 9 possible locations of food
  const x_vals = [x - a, x, x + a, x - a, x, x + a, x - a, x, x + a];
  const y_vals = [y - a, y - a, y - a, y, y, y, y + a, y + a, y + a];
  //draw food at locations
  for (let i = 0; i < num; i++) {
    ctx.beginPath();
    ctx.arc(x_vals[i], y_vals[i], a / 2, 0, 2 * Math.PI);
    ctx.fillStyle = "#ff9900";
    ctx.fill();
  }
}

function drawBugs(ctx, world_map, x_vals, y_vals, x_game, y_game, r) {
  /*
  * params
  * ctx: canvas context
  * world_map: 2d array of hexagons
  * x_vals: 2d array of x values for center of hexagons
  * y_vals: 2d array of y values for center of hexagons
  * r: characteristic dist of hexagons
  * x_game: number of hexagons in x direction
  * y_game: number of hexagons in y direction
  * */
  //draw ants if there are any
  for (let i = 0; i < x_game; i++) {
    for (let j = 0; j < y_game; j++) {
      if (world_map[j * x_game + i].isOccupied() == true) {
        drawAnt(ctx, r, x_vals[i][j], y_vals[i][j], world_map[j * x_game + i].getBug());
      }
    }
  }
}

function drawAnt(ctx, r, x, y, ant) {
  /*
  * params
  * ctx: canvas context
  * r: characteristic dist of hexagons
  * x: x value of center of hexagon
  * y: y value of center of hexagon
  * ant: ant object
  * */
  //draw ant in the correct color
  //get direction of ant
  const dir = ant.getDirection();

  const img = new Image();
  img.onload = function () {
    const imgWidth = r*1.5;
    const imgHeight = r*1.5;

    //draw a point in the center of the hexagon

    ctx.translate(x, y);
    const angle = 90 * Math.PI / 180 + dir *60 * Math.PI/180; // 60 degrees in radians
    ctx.rotate(angle);
    ctx.drawImage(img, -imgWidth/2, -imgHeight/2, imgWidth, imgHeight);
    ctx.rotate(-angle);
    ctx.translate(-x, -y);
  };
  if (ant.getColor() == Color.black) {
     img.src = "pair53_sprint1/img/black.png";
  }
  else if (ant.getColor() == Color.red) {
      img.src = "pair53_sprint1/img/red.png";
    } 
}