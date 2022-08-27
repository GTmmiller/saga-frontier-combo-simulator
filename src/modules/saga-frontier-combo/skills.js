import { Set } from 'immutable'

export const ComboTypes = Object.freeze(
    {
        "Dead Stop": "Dead Stop",
        Down: "Down",
        "Instant Stop": "Instant Stop",
        Move: "Move",
        Hot: "Hot",
        Cold: "Cold",
        "Black Out": "Black Out",
        Snow: "Snow"
    }
)

export const ComboTypeKeys = Set(Object.keys(ComboTypes))

export const SkillTypes = Object.freeze(
    {
        Sword: "Sword",
        Katana: "Katana",
        Gun: "Gun",
        "Martial Arts": "Martial Arts",
        Alkaiser: "Alkaiser",
        "Item-Inherent": "Item-Inherent",
        "Heavy Weapons": "Heavy Weapons",
        "Mec Parts": "Mec Parts",
        "Mec Programs": "Mec Programs",
        "Monster (Head)": "Monster (Head)",
        "Monster (Arm)": "Monster (Arm)",
        "Monster (Leg)": "Monster (Leg)",
        "Monster (Body)": "Monster (Body)",
        "Monster (Breath)": "Monster (Breath)",
        "Monster (Magical)": "Monster (Magical)",
        "Mystic Sword": "Mystic Sword",
        "Mystic Glove": "Mystic Glove",
        "Mystic Boots": "Mystic Boots",
        "Light Magic": "Light Magic",
        "Shadow Magic": "Shadow Magic",
        "Space Magic": "Space Magic",
        "Time Magic": "Time Magic",
        "Realm Magic": "Realm Magic",
        "Mystic Magic": "Mystic Magic",
        "Mind Magic": "Mind Magic",
        "Evil Magic": "Evil Magic",
        "Arcane Magic": "Arcane Magic",
        "Rune Magic": "Rune Magic",
        "Mirage Magic": "Mirage Magic",
        "Consumable Items": "Consumable Items"
    }  
)


export class Skill {
    /**
     * Represents a Skill in SaGa Frontier
     * @param {String} newName - The name of the skill in the remake 
     * @param {String} oldName - The name of the skill in the original version
     * @param {String} skillType - The type of skill it is. Should be included in SkillTypes  
     * @param {Array<String>} sends - The combo types this skill sends to the next attack. 
     * @param {Array<String>} recieves - The combo types this skill can combo from 
     * @param {Boolean} multiTarget - If the attack is single or multi target. Multi target attacks can only end combos.
     */
    constructor(newName, oldName, skillType, sends, recieves, multiTarget) {
        if(SkillTypes[skillType] === undefined) {
            throw new Error("Skill Type '" + skillType + "' is not a known Skill Type")
        }

        if(!ComboTypeKeys.keySeq().isSuperset(sends)) {
            throw new Error("Unknown combo type in sends array. sends: " + sends)
        }

        if (!ComboTypeKeys.keySeq().isSuperset(recieves)) {
            throw new Error("Unknown combo type in recieves array. recieves: " + recieves)
        }
        
        this.newName = newName
        this.oldName = oldName
        this.skillType = skillType
        this.sends = Set(sends)
        this.recieves = Set(recieves)
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
        return (this.multiTarget === false) && (this.sends.intersect(nextSkill.recieves).count() > 0)
    }

    /**
     * Checks if a skill that was activated previously would cause this skill to combo
     * @param {Skill} previousSkill - The skill performed on the previous turn
     * @returns True if this skill would combo with the previous skill
     */
    canRecieveCombo(previousSkill) {
        return (previousSkill.multiTarget === false) && (this.recieves.intersect(previousSkill.sends).count() > 0)
    }

    static fromJson(jsonObject) {
        return new Skill(
            jsonObject.newName, 
            jsonObject.oldName,
            jsonObject.skillType,
            jsonObject.sends,
            jsonObject.recieves,
            jsonObject.multiTarget
        )
    }
}

export const PLACEHOLDER_SKILL = new Skill("No Skill Selected", "No Skill Selected", "Sword", Set(), Set(), false)
