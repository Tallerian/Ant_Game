## ---------------------------------- SPRINT 3 -----------------------------------------

 deployed at http://clabsql.clamv.jacobs-university.de/~iruvutokin/index.html

Tech used:
- javascript 
- html(including canvas)
- css
- (npm to run tests)



What was added:
- files world_File_Check and bug_Ass_check to check for warnings in uploaded files
- test cases for the Bug class and Assembler class
- Pre-files in order to start the game should you do not have to upload files(but you still can of course)

## Features: 

- display world graphically. <br>location: game.js
<br>function drawworld() takes the world object as an argument and draws the hexagonal grid, the obstacles, and the different food. Furthermore, it draws the ants according to their color and orientation on the map.


- Extend world and bug classes for further use.
<br> The world now has two arrays to store the positions of the different cells. 
<br>At initialization one iterates over all bugs and adds them to the array. 
<br> World also now has the adjacent and adjacentcoords functions. Both calculate the coordinates of the adjacent cell in the given direction but the first returns said cell and the latter only returns the coordinates.



- implement Engine in function start()
<br> The function start() in the gameProcess class will switch to the next iteration periodically.
<br>Proceeds to a call of runIteration()
- In runIteration()
  - Calls the world-class function to progress the world by one step and will draw the result and update the stats(not fully implemented yet)
  - We go through everybug and execute their current instruction
  - The next instruction is obtained from the Cell's Bug's brain
  - Note: when we read the assembly file, each instruction is given symbols and labels as can be observer in bug.js
  - The instruction is then passed to 'Switch Case' where the right instruction is executed accordingly
  - Once the instruction is executed we update the Cell's Bug's brain to the next instruction accordingly
  - In addition the Bug's position are updated should they be changed


  * To execute the instructions, the bugbrain gives the next instruction. This is then pattern matched against all possible instructions. The changes in the world (eg position changes of bugs, number of food in a cell changes etc.) are then applied. Next, the position in the instructions of the bugbrain of the bug is updated and the bug is put in the corresponding cell.

## Testing:

- extended already existing test cases

to run: 
 - navigate to pair53_sprint3/pair53_sprint2/pair53_sprint2 
    ```
    cd pair53_sprint2/pair53_sprint1/
    ``` 
 - run the following comands

    ```bash
        npm i
        npm run test
    ```
 - additionally added many files to test the website(world files and bug files) in TestFiles folder

 General Comments:
- One page application
- All functionality is in the src folder
- files are named to indicate classes or functinality they contain
