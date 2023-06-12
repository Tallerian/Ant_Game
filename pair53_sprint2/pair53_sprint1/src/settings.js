import {World} from "./world.js";
import {WorldMap} from "./world_map.js";
import {getGameProcess, renderEndPage, renderGamePage, renderGamePagestart} from "./index.js";
import {CheckMapCode} from "./world_File_check.js"
import {CheckBugCode} from "./bug_Ass_check.js"
import { BugBrain } from "./BugBrain.js";
import { Assembler } from "./utils.js";



let logResults = false;

export function settingsPage() {

    return `
<h2>Bug World</h2>

<ul class='options'>
    <error>
    </error>

  <li>
    Please upload a world map file
    <input type='file' id="worldMapFile">
  </li>
  
  <li>
    Please upload a bug assembler source code file #1
    <input type='file' id="assemblerCodeFile1">
  </li>
  
  <li>
    Please upload a bug assembler source code file #2
    <input type='file' id="assemblerCodeFile2">
  </li>

  <li>
    Please select the number of iterations

    <input type="number" id="iters" value="100">
  </li>
  
  <li>
    Do you want to log the results of the session?
    <input type="checkbox" id="logs" onchange="logResults = logs.checked">
  </li>
</ul>

<button id = 'file_check'>Next</button>

    <div class = "error_border">
        <div id='error'></div>
    </div>
`;
}

export function checkFileError(worldMapFile, asmFile1, asmFile2, myerror){

    let errorMessage = "";
    console.log("Now cheking!!")

    if (!worldMapFile) {
        errorMessage = "No world map uploaded";
        myerror.innerHTML = errorMessage;
        return errorMessage;
    }
    if (!asmFile1) {
        errorMessage = "No bug assembler source code file #1";
        myerror.innerHTML = errorMessage;
        return errorMessage;
    }
    if (!asmFile2 == null) {
        errorMessage = "No bug assembler source code file #2";
        myerror.innerHTML = errorMessage;
        return errorMessage;
    }
    
    errorMessage = CheckMapCode(worldMapFile)
    if (errorMessage){
      myerror.innerHTML = errorMessage;
      return;
    }

    errorMessage = CheckBugCode(asmFile1, 1);
    if(errorMessage){
      myerror.innerHTML = errorMessage;
      return;
    }

    errorMessage = CheckBugCode(asmFile1, 2);
    if(errorMessage){
      myerror.innerHTML = errorMessage;
      return;
    }

    return true;
}

export const startGame = window.startGame = (worldMapFile, bugfile1, bugfile2) => {
    //get width and height of the map from first and second line of the WorldMap file
    let instructions1 = Assembler.assemble(bugfile1);
    let instructions2 = Assembler.assemble(bugfile2);
    
    let width = parseInt(worldMapFile.split("\n")[0]);
    let height = parseInt(worldMapFile.split("\n")[1]);
    getGameProcess().world = new World(width, height, WorldMap.parseMap( worldMapFile, instructions1, instructions2)); // TODO get from file
    getGameProcess().iterations = parseInt(document.getElementById("iters").value);
    getGameProcess().logResults = logResults;
    renderGamePagestart();
}
