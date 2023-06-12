import { WorldCell } from "./world_cell.js";
import { Bug } from "./bug.js";
import { BugBrain } from "./BugBrain.js";
import { Color } from "./utils.js";

export class WorldMap {
    static parseMap(mapFile, bug1, bug2) {
        let cells = [];

        const [w, h, ...worldMap] = mapFile
            .split("\n")
            .map((line) => line.trim())
            .filter((line) => line !== "");

        const obstacle = () => new WorldCell(true);
        const empty = () => new WorldCell(false);
        const black = () => new WorldCell(false, 0, Color.black);
        const red = () => new WorldCell(false, 0, Color.red);

        let redcount = 0;
        let blackcount = 0;

        worldMap.forEach(line => {
            [...line].forEach(char => {

                if (char === '#') {
                    cells.push(obstacle());
                }

                if (char === '.') {
                    cells.push(empty());
                }

                if (char === '-') {
                    cells.push(black());
                    //add black bug to last cell
                    cells.slice(-1)[0].setBug(new Bug(redcount++, Color.black, 0, new BugBrain(bug1)));
                }

                if (char === '+') {
                    cells.push(red());
                    //add red bug to last cell
                    cells.slice(-1)[0].setBug(new Bug(blackcount++, Color.red, 0, new BugBrain(bug2)));
                }

                if (!isNaN(Number(char))) {
                    cells.push(new WorldCell(false, Number(char)));
                }

            });
        });

        return cells;
    }
}