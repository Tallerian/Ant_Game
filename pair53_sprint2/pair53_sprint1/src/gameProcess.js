import { drawWorld,makeStats, setcanvas } from "./game.js";
import { getGameProcess } from "./index.js";


export class GameProcess {
    constructor() {
        this.world = null;
        this.currentIteration = 0;
        this.iterations = 0;
        this.logResults = false;
        this.numberOfFirstBugsTeam = 0;
        this.numberOfSecondBugsTeam = 0;
        this.firstBugsTeamKilled = 0;
        this.secondBugsTeamKilled = 0;
        this.foodBroughtForFirstBugsTeam = 0;
        this.foodBroughtForSecondBugsTeam = 0;
        this.seconds = 1;
        this.shouldContinue = true;
        this.count = 0;

    }

    setWorld(world) {
        this.world = world;
        // TODO set numberOfFirstBugsTeam, numberOfSecondBugsTeam
    }

    getAmountOfUndetectedFood() {
        // TODO
        return 0;
    }

    start() {
        setcanvas();
        drawWorld(this.world)  // drawing the map

        //setting up an interval for the engine to run every 1 second
        const interval = setInterval(() => {
            if (!this.shouldContinue) {
                clearInterval(interval);
                return;
            }

            this.runIteration();   //running the interation on the world class

            this.count++;
            if (this.count === this.iterations) {
                clearInterval(interval);
            } else {
                setTimeout(() => {
                }, this.seconds * 1000);
            }
        }, this.seconds * 1000);

    }
    stop() {
        this.shouldContinue = false;
    }

    resume() {
        this.shouldContinue = true;
        //clearing the canvas
        setcanvas();        
        drawWorld(this.world);
        const interval = setInterval(() => {
            if (!this.shouldContinue) {
                clearInterval(interval);
                return;
            }

            this.runIteration();   //running the interation on the world class

            this.count++;
            if (this.count === this.iterations) {
                clearInterval(interval);
            } else {
                setTimeout(() => {
                }, this.seconds * 1000);
            }
        }, this.seconds * 1000);

    }


    runIteration() {
        this.currentIteration++;
        this.world.runIteration();
        //draw world after a second
        drawWorld(this.world);
        //todo update stats call the function makestats
        document.getElementById("stats").innerHTML = makeStats();
        //todo log results
    }
}
