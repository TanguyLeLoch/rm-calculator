class RmCalculator {

    values = [];

    constructor(lastWeight, lastReps, increment, minRep, maxRep) {
        this.storeDataInNumber(lastWeight, lastReps, increment, minRep, maxRep);
        if (!this.validateData()) {
            return;
        }
        this.computeRmValues();
    }

    storeDataInNumber(lastWeight, lastReps, increment, minRep, maxRep) {
        try {
            this.checkIsNumber(lastWeight);
            this.checkIsNumber(lastReps);
            this.checkIsNumber(increment);
            this.checkIsNumber(minRep);
            this.checkIsNumber(maxRep);
            this.lastWeight = Number(lastWeight);
            this.lastReps = Number(lastReps);
            this.increment = Number(increment);
            this.minRep = Number(minRep);
            this.maxRep = Number(maxRep);
        } catch (error) {
            console.log("Error parsing data");
        }
    }

    checkIsNumber(value) {
        if (isNaN(value)) {
            throw new Error("Value is not a number");
        }
    }

    calculateRm(weight, reps) {
        return weight *(1 + 1/30 * reps)
    }


    computeRmValues() {

        let currentRm = this.calculateRm(this.lastWeight, this.lastReps);
        let setColorPerRep = new Set();
        let yellows = [];
        for (let w = this.lastWeight - 5 * this.increment; w <= this.lastWeight + 4 * this.increment; w += this.increment) {
            const line = [];
            for (let r = this.minRep; r <= this.maxRep; r++) {
                let rm = this.calculateRm(w, r);
                let color;
                let textColor = "white"
                if (rm < currentRm) {
                    color = 'gray';
                } else if (w === this.lastWeight && r === this.lastReps) {
                    color = 'green';
                    textColor = "black"
                } else if (r !== this.lastReps && rm > currentRm && !setColorPerRep.has(r)) {
                    setColorPerRep.add(r);
                    color = 'yellow';
                    textColor = "black"
                } else {
                    color = 'black';
                }
                const rmValues = new RmValues(rm, color, r, w, textColor);
                line.push(rmValues);
                if (color === 'yellow') {
                    yellows.push(rmValues);
                }
            }
            this.values.push(line);
        }
        let minValue = yellows[0];
        if (minValue === undefined) {
            return;
        }
        minValue.color = "orange";
        for (let y of yellows) {
            if (y.value < minValue.value) {
                minValue.color = "yellow";
                minValue = y;
                minValue.color = "orange";
            }
        }
    }


    validateData() {
        const fields = [this.lastWeight, this.lastReps, this.increment, this.minRep, this.maxRep];
        for (let field of fields) {
            if (field === undefined) {
                console.log("Missing data")
                return false;
            }
            if (field < 0) {
                console.log("Data must be positive")
                return false;
            }
            if (isNaN(field)) {
                console.log("Data must be a number")
                return false;
            }
            if (this.maxRep < this.minRep) {
                console.log("Max reps must be greater than min reps")
                return false;
            }
        }
        if (!this.isIncrementValid()) {
            console.log("Increment must be greater than 0")
            return false;
        }
        return true;
    }

    isIncrementValid() {
        return this.increment > 0;
    }


}

class RmValues {
    constructor(value, color, reps, weight, textColor) {
        this.value = value;
        this.color = color;
        this.reps = reps;
        this.weight = weight;
        this.textColor = textColor;
    }
}

export default RmCalculator;