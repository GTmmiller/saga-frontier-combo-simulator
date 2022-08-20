// import { OrderedMap, Set } from 'immutable'

export const ComboTypes = Object.freeze(
    {
        DEADSTOP: Symbol('Dead Stop'),
        DOWN: Symbol('Down'),
        INSTANTSTOP: Symbol('Instant Stop'),
        MOVE: Symbol('Move'),
        HOT: Symbol('Hot'),
        COLD: Symbol('Cold'),
        BLACKOUT: Symbol('Black Out'),
        SNOW: Symbol('Snow')
    }
)


export const SkillTypes = Object.freeze(
    {
        SWORD: Symbol('Sword'),
        KATANA: Symbol('Katana')
    } 
)

export class Skill {
    /**
     * Represents a Skill in SaGa Frontier
     * @param {String} newName - The name of the skill in the remake 
     * @param {String} oldName - The name of the skill in the original version
     * @param {Symbol} skillType - The type of skill it is. Should be a symbol from skillTypes.  
     * @param {Set<Symbol>} sends - The combo types this skill sends to the next attack. 
     * @param {Set<Symbol>} recieves - The combo types this skill can combo from 
     * @param {Boolean} multiTarget - If the attack is single or multi target. Multi target attacks can only end combos.
     */
    constructor(newName, oldName, skillType, sends, recieves, multiTarget) {
        this.newName = newName
        this.oldName = oldName
        this.skillType = skillType
        this.sends = sends
        this.recieves = recieves
        this.multiTarget = multiTarget
    }

    /**
     * This method returns the name of the skill given context
     * @param {Boolean} remake - True for the remake, false for the old name. 
     * @returns The name of the skill
     */
    getName(remake) {
        if (remake) {
            return this.newName
        } else {
            return this.oldName
        }
    }

    /**
     * Checks if a skill will combo if performed immediately after this skill
     * @param {Skill} nextSkill - The skill to follow the current skill
     * @returns True if the passed in skill will combo. False if it won't.
     */
    canSendCombo(nextSkill) {
        return this.multiTarget === false && this.sends.intersect(nextSkill.recieves).count() > 0
    }

    /**
     * Checks if a skill that was activated previously would cause this skill to combo
     * @param {Skill} previousSkill - The skill performed on the previous turn
     * @returns True if this skill would combo with the previous skill
     */
    canRecieveCombo(previousSkill) {
        return previousSkill.multiTarget === false && this.recieves.intersect(previousSkill.sends).count() > 0
    }
}
