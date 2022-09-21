import { PLACEHOLDER_SKILL } from "./skills";

/**
 * This class represents a restricted round of combat in SaGa Frontier consisting of five skills.
 * The Combo class can evaluate how/if the skills will combo and provide the level of the combo.
 *
 */
export class Combo {
  /**
   * Create a Combo object with 5 placeholder slots
   */
  constructor() {
    this.skillArray = new Array(Combo.MAX_COMBO_SLOTS);
    for (let i = 0; i < this.skillArray.length; i++) {
      this.skillArray[i] = PLACEHOLDER_SKILL;
    }
  }

  /**
   * Iterate through the skillArray and return the potential combos.
   *
   * A combo object looks like this: { start: Number, end: Number, level: Number }
   * start is the starting index of the combo and end is the index of the skill ending the combo.
   * level indicates the level of the combo and is calculated by subtracting end from start.
   *
   * Skill compatibility for combos is covered in the Skill canSendCombo/canRecieveCombo methods.
   * Combos are filtered to remove level 2 combos that start with an attack-all skill.
   *
   * @returns {Array<Object>} An array of combo objects
   */
  getCombos() {
    let combos = [];
    let currentCombo = null;

    // Create possible combos
    for (let i = 0; i < this.skillArray.length - 1; i++) {
      let currentSkill = this.skillArray[i];
      let nextSkill = this.skillArray[i + 1];
      let canCombo = currentSkill.canSendCombo(nextSkill);

      if (canCombo && currentCombo === null) {
        // A combo is created if it does not exist yet
        currentCombo = { start: i, end: null, level: null };
      } else if (!canCombo && currentCombo !== null) {
        // A combo is stopped
        currentCombo.end = i;
        currentCombo.level = currentCombo.end - currentCombo.start + 1;
        combos.push(currentCombo);
        currentCombo = null;
      }
    }

    if (currentCombo !== null) {
      currentCombo.end = this.skillArray.length - 1;
      currentCombo.level = currentCombo.end - currentCombo.start + 1;
      combos.push(currentCombo);
      currentCombo = null;
    }

    // Filter impossible level 2 combos

    return combos.filter(
      (combo) => combo.level !== 2 || !this.getSkill(combo.end).multiTarget
    );
  }

  /**
   * Set a skill in the selected slot.
   *
   * @throws {RangeError} Will error if the index is negative or greater than 4.
   *
   * @param {Number} index The index to set the skill.
   * @param {Skill} skill The skill to set at the index position.
   */
  setSkill(index, skill) {
    this.#indexCheck(index);
    this.skillArray[index] = skill;
  }

  /**
   * Get the skill at the selected slot
   *
   * @throws {RangeError} Will error if the index is negative or greater than 4.
   *
   * @param {Number} index The index of the skill to return.
   * @returns {Skill} The skill at the index position.
   */
  getSkill(index) {
    this.#indexCheck(index);
    return this.skillArray[index];
  }

  /**
   * Gets the length of the skillArray.
   * @returns {Number} The length of the internal skillArray.
   */
  getLength() {
    return this.skillArray.length;
  }

  [Symbol.iterator]() {
    return this.skillArray[Symbol.iterator]();
  }

  #indexCheck(index) {
    if (index > Combo.MAX_COMBO_SLOTS - 1 || index < 0) {
      throw new RangeError("Index must be between 0 and 4");
    }
  }

  /**
   * Create a new combo object from an array of skills. Will pick the first
   * MAX_COMBO_SLOTS elements from the skillArray parameter.
   *
   * @param {Array<Skills>} skillArray An existing array of skills.
   * @returns {Combo} A combo object using the skill array.
   */
  static fromArray(skillArray) {
    const newCombo = new Combo();
    for (
      let i = 0;
      i < Math.min(this.MAX_COMBO_SLOTS, skillArray.length);
      i++
    ) {
      newCombo.setSkill(i, skillArray[i]);
    }
    return newCombo;
  }

  static MAX_COMBO_SLOTS = 5;
}
