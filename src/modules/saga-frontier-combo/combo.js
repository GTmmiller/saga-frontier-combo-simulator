import { PLACEHOLDER_SKILL } from "./skills"

// TODO: future - Add a permutation function

// Idea here is we have 5 slots in the combo and the combo outputs
// What would happen if all the turns were taken "left to right"

// TODO: Add an array taking constructor

// TODO: put in same file or folder with skills

// TODO: make a placeholder skill

// TODO: make iterable


// [1] -> [2] -> [3] -> etc

export class Combo {
    // Constructor -> Creates a fresh combo with 5 static slots
    constructor() {
        this.skillArray = new Array(5)
        for (let i = 0; i < this.skillArray.length; i++) {
            this.skillArray[i] = PLACEHOLDER_SKILL
        }
    }
    // If I can extend array that would be nice -> too permissive

    // Add indexing if possible

    getCombos() {
        // Iterate through the skillArray
        // combo exists for only 2 or more matchups
        // State: no combo
        // iterate from 1 to 5
        // if n - 1 is comboable with n then create combo
        // State: in combo
        // if n -1 is comboable with n then add to combo
        // At end -> finalize combo if open

        // Combo has level and a range (start-stop)
        // Output an array of combo objects
        let combos = []
        let currentCombo = null

        // Lookahead instead

        for(let i = 0; i < this.skillArray.length - 1; i++) {
            let currentSkill = this.skillArray[i]
            let nextSkill = this.skillArray[i + 1]
            let canCombo = currentSkill.canSendCombo(nextSkill)

            if (canCombo && currentCombo === null) {
                // A combo is created if it does not exist yet
                currentCombo = { start: i, end: null }
            } else if (!canCombo && currentCombo !== null) {
                // A combo is stopped
                currentCombo.end = i
                combos.push(currentCombo)
                currentCombo = null
            }
        }

        if (currentCombo !== null) {
            currentCombo.end = this.skillArray.length - 1
            combos.push(currentCombo)
            currentCombo = null
        }

        return combos
    }

    setSkill(index, skill) {
        // TODO: make safer
        this.skillArray[index] = skill
    }

    getSkill(index) {
        return this.skillArray[index]
    }

    getLength() {
        return this.skillArray.length
    }

    [Symbol.iterator] () {
        return this.skillArray[Symbol.iterator]()
    }

}