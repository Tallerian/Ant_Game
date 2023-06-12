export class WorldCell {
    #obstructed;
    #food;
    #baseColor;
    #bug;
    #marker;

    constructor(obstructed, food = 0, base = null) {
        this.#obstructed = obstructed;
        this.#food = food;
        this.#baseColor = base;
        this.#bug = null;
        this.#marker = null;
    }
    // If Cell is a rock(obstacle).
    isObstructed() {
        return this.#obstructed;
    }

    // If there is a bug in the cell.
    isOccupied() {
        return this.#bug != null;
    }

    // Bug setter.
    setBug(bug) {
        this.#bug = bug;
    }

    // Bug getter.
    getBug() {
        return this.#bug;
    }

    // Remove bug.
    removeBug() {
        this.#bug = null;
    }

    // Put food in the Cell.
    setFood(food) {
        this.#food = food;
    }

    // Get the amount of food in the Cell.
    getFood() {
        return this.#food;
    }

    // If the Cell has the same color as the color provided.
    isFriendlyBase(color) {
        return this.#baseColor === color;
    }

    // If the Cell has the opposite color from the color provided.
    isEnemyBase(color) {
        return this.#baseColor != null && !this.isFriendlyBase(color);
    }

    // Mark the Cell.
    setMarker(color, n) {
        this.#marker = { color, n };
    }

    // Remove the mark.
    clearMarker() {
        this.#marker = null;
    }

    // If the mark of the Cell has the same color as the color provided.
    isFriendlyMarker(color) {
        return this.#marker?.color === color;
    }

    // If the mark of thr Cell has the opposite color from the color provided.
    isEnemyMarker(color) {
        return this.#marker?.color !== color;
    }

    // Returns true if the cell satisfies the conditions.
    cellMatches(bugCondition, color) {
        // TODO
    }

    toString() {
        // TODO
    }
}