import { Set } from "immutable";

/**
 * A pseudo-enum containing all the combo types a skill could send or recieve.
 */
export const ComboTypes = Object.freeze({
  "Dead Stop": "Dead Stop",
  Down: "Down",
  "Instant Stop": "Instant Stop",
  Move: "Move",
  Hot: "Hot",
  Cold: "Cold",
  "Black Out": "Black Out",
  Snow: "Snow",
});

/**
 * A Set of all the possible ComboTypes keys for validation purposes.
 */
export const ComboTypeKeys = Set(Object.keys(ComboTypes));

/**
 * A pseudo-enum containing all the possible types of skills.
 */
export const SkillTypes = Object.freeze({
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
  "Consumable Items": "Consumable Items",
});

export class Skill {
  /**
   * Represents a Skill in SaGa Frontier
   * @param {String} newName - The name of the skill in the remake
   * @param {String} oldName - The name of the skill in the original version
   * @param {String} skillType - The type of skill it is. Should be included in SkillTypes
   * @param {Array<String>} sends - The combo types this skill sends to the next attack.
   * @param {Array<String>} receives - The combo types this skill can combo from
   * @param {Boolean} attackAll - If the attack is single or multi target. Multi target attacks can only end combos.
   */
  constructor(newName, oldName, skillType, sends, receives, attackAll) {
    if (SkillTypes[skillType] === undefined) {
      throw new Error(
        "Skill Type '" + skillType + "' is not a known Skill Type"
      );
    }

    if (!ComboTypeKeys.keySeq().isSuperset(sends)) {
      throw new Error("Unknown combo type in sends array. sends: " + sends);
    }

    if (!ComboTypeKeys.keySeq().isSuperset(receives)) {
      throw new Error(
        "Unknown combo type in receives array. receives: " + receives
      );
    }

    this.newName = newName;
    this.oldName = oldName;
    this.skillType = skillType;
    this.sends = Set(sends);
    this.receives = Set(receives);
    this.attackAll = attackAll;
  }

  /**
   * This method returns the name of the skill given context
   * @param {Boolean} remake - True for the remake, false for the old name.
   * @returns The name of the skill
   */
  getName(remake) {
    if (remake) {
      return this.newName;
    } else {
      return this.oldName;
    }
  }

  /**
   * Checks if a skill will combo if performed immediately after this skill
   * Note: This does not consider combo-wide attackAll behavior
   *
   * @param {Skill} nextSkill - The skill to follow the current skill
   * @returns True if the passed in skill will combo. False if it won't.
   */
  canSendCombo(nextSkill) {
    const compatible = this.sends.intersect(nextSkill.receives).count() > 0;
    const doubleAttackAll = this.attackAll && nextSkill.attackAll;
    return compatible && !doubleAttackAll;
  }

  /**
   * Checks if a skill that was activated previously would cause this skill to combo
   * Note: This does not consider combo-wide attackAll behavior
   *
   * @param {Skill} previousSkill - The skill performed on the previous turn
   * @returns True if this skill would combo with the previous skill
   */
  canReceiveCombo(previousSkill) {
    const compatible = this.receives.intersect(previousSkill.sends).count() > 0;
    const doubleAttackAll = this.attackAll && previousSkill.attackAll;
    return compatible && !doubleAttackAll;
  }

  canSelfCombo() {
    return this.sends.intersect(this.receives).size > 0 && !this.attackAll;
  }

  static fromJson(jsonObject) {
    return new Skill(
      jsonObject.newName,
      jsonObject.oldName,
      jsonObject.skillType,
      jsonObject.sends,
      jsonObject.receives,
      jsonObject.attackAll
    );
  }

  /**
   * Converts a category-separated json payload of skills into skill objects
   *
   * @param {Object} jsonSkills - The json payload with the format {SkillType => {SkillName => Skill}}
   * @returns A frozen object containing Skill objects instead of json skill objects
   */
  static skillsFromJson(jsonSkills) {
    return Object.freeze(
      Object.fromEntries(
        Object.entries(jsonSkills).map(([skillType, skills]) => {
          const newSkills = Object.fromEntries(
            Object.entries(skills).map(([oldName, skill]) => [
              oldName,
              Skill.fromJson(skill),
            ])
          );
          return [skillType, newSkills];
        })
      )
    );
  }
}

/**
 * A default skill that is used as a placeholder.
 */
export const PLACEHOLDER_SKILL = new Skill(
  "No Skill Selected",
  "No Skill Selected",
  "Sword",
  Set(),
  Set(),
  false
);
