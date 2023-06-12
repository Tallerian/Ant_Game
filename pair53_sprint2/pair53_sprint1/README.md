# BugWorld sprint 1

## What was added during the sprint:

### Frontend implementation:

- StyleSheet **main.css** file added
- "Welcome to the Bug World" page
  - "Start button leads to the "Upload map amd bugs asm" page
- "Upload map amd bugs asm" page
  - The file can be uploaded from the computer. World map file is parsed to the **WorldMap class**
  - The file can be uploaded from the computer. Bug ASMs are parsed to the **BugBrain class**
  - **Logs are not supported is this version of the game**
- "Do you want to quit?" page
  - "Yes" button leads back to the game
  - "No" button leads to the start page
- Main page
  - "Options" window is not supported in this version of the game
  - Statistics is displayed as in the specification
  - Logs are not supported is this version of the game
  - The starting state of field is shown

### Backend implementation

- **WorldMap** file parsing
  - Use static method **parseMap(mapFile)** in WorldMap class
- **Bug** ASMs files parsing
  - Use static method **assemble(asmFile)** in Assembler class
- **WorldCell** class implemented
  - Except of cellMatches(bugCondition, color) and toString()
- **World** class implemented
  - Except of adjacent(x, y, direction), sensedCell(x, y, direction) and toString()
- **Bug** class implemented
  - Except of kill() ans toString()
- **BugBrain** class implemented
- **directions, conditions, cellDirections, instructions** ENUMs added

### Test coverage

- All implemented functionality is covered with Unit Tests

  - Use Intellij IDEA to run tests
  - Or run them using Node.js (in case of any errors make sure your's node version is 18)

    ```bash
    npm i
    npm run test
    ```

### Opening in browser

Since we use ES modules, you have to host page. Use your preferred server or run following:

````bash
npx http-server ./
````


