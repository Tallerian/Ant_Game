# BugWorld sprint 2

## Notes by Arkadii Sapozhnikov, did this sprint alone

### Frontend
- Added correct page switching between each other 
- Added an implementation of an error message with incorrect settings (currently commented out so that it is more convenient to test deeper parts to check the work -- uncomment the call of the `isError` method in `settings.js` file in 102-104 lines)
- Added visualization of parameters on the game page 
- Implemented missing pages -- Options and Quit
### Backend
- Split the entire code into several files for easier readability 
- Implemented interaction with html -- using some variables and functions inside html (to visualize data about the current state of the game and to run methods with updating game parameters). Also receiving data from user interaction through the interface (set settings and options selected by the user in the project variables)
- Added initial implementation of the game Process structure for more convenient storage of game state data
### Tests
- Added tests to `WorldCell`
### Link
- https://10.72.1.14/~asapozhnik/pair53_sprint2/