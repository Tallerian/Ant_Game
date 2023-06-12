"use strict";
import {startPage} from "./start.js"
import {settingsPage, checkFileError, startGame} from "./settings.js";
import {drawWorld, gamePage} from "./game.js";
import {optionsPage} from "./options.js";
import {quitPage} from "./quit.js";
import {endPage} from "./end.js";
import {GameProcess} from "./gameProcess.js";

const container = document.querySelector(".container"); // never remove during the session
const gameProcess = new GameProcess();

let worldMapFile, asmFile1, asmFile2 = "";

//-- Adding pre-files
worldMapFile = `10
11
##########
##....---#
#.....#--#
#..#....-#
#...99...#
#...99...#
#+..4....#
#++..##..#
#+++....##
##########
##########`;
asmFile1 = `move 1 0 ; [0]
sense ahead 2 0 food ; [1]
move 3 0 ; [2]
pickup 4 0 ; [3]
turn left 5 ; [4]
turn left 6 ; [5]
turn left 7 ; [6]
move 8 0 ; [7]
move 9 0 ; [8]
drop 10 ; [9]
turn right 11 ; [10]
turn right 12 ; [11]
turn right 0; [12]`;

asmFile2 = `move 1 0 ; [0]
sense ahead 2 0 food ; [1]
move 3 0 ; [2]
pickup 4 0 ; [3]
turn left 5 ; [4]
turn left 6 ; [5]
turn left 7 ; [6]
move 8 0 ; [7]
move 9 0 ; [8]
drop 10 ; [9]
turn right 11 ; [10]
turn right 12 ; [11]
turn right 0; [12]`;

export const renderStartPage = window.renderStartPage = () => {
    container.innerHTML = startPage();
};

export const renderSettingsPage = window.renderSettingsPage = () => {
    container.innerHTML = settingsPage();

    // reading files -----------

    let file1 = document.getElementById("worldMapFile");
    file1.addEventListener('change', function(){
        console.log("I listened")
        reader_file(file1,1);
    })

    let file2 = document.getElementById("assemblerCodeFile1");
    file2.addEventListener('change', function(){
        reader_file(file2,2);
    })

    let file3 = document.getElementById("assemblerCodeFile2");
    file3.addEventListener('change', function(){
        reader_file(file3, 3);
    })

//preparing for checks -----------    
const file_check = document.getElementById('file_check');
file_check.addEventListener("click", function() {

    //grabing error class
    const myerror = document.getElementById("error");

    let Next = checkFileError(worldMapFile, asmFile1, asmFile2, myerror);

    if (Next == true){
        startGame(worldMapFile, asmFile1, asmFile2);
    }
  });
};
export const renderGamePagestart = window.renderGamePagestart = () => {
    container.innerHTML = gamePage();
    getGameProcess().start(); 
};

export const renderGamePage = window.renderGamePage = () => {
    container.innerHTML = gamePage();

    getGameProcess().resume();  //starting the engine
};

export const renderOptionsPage = window.renderOptionsPage = () => {
    container.innerHTML = optionsPage();
};

export const renderQuitPage = window.renderQuitPage = () => {
    container.innerHTML = quitPage();
};

export const renderEndPage = window.renderEndPage = () => {
    container.innerHTML = endPage();
};

export const getGameProcess = window.getGameProcess = () => {
    return gameProcess;
}


function reader_file(fileInput, i){
    console.log("Event listened")
    const file = fileInput.files[0];
    const reader = new FileReader();
    reader.readAsText(file);
    let fileContent = ""

    reader.onload = function() {
        fileContent = reader.result;
        if (i == 1){
            worldMapFile = fileContent
        }

        if (i == 2){
            asmFile1 = fileContent
        }

        if (i == 3){
            asmFile2 = fileContent
        }
    };
    
}