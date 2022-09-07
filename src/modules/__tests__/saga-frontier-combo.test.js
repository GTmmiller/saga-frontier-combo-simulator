import { describe, expect, test } from "vitest";
import { Set } from "immutable";

import {
  Skill,
  ComboTypes,
  SkillTypes,
  Combo,
  PLACEHOLDER_SKILL,
} from "../saga-frontier-combo";

import jsonSkills from "../../data/skills.json";

const remakeName = "NewSlash";
const originalName = "OldSlash";

const newSkill = new Skill(
  remakeName,
  originalName,
  SkillTypes.Katana,
  [ComboTypes.Cold],
  [ComboTypes.Move],
  false
);

const forwardSkill = new Skill(
  "Forward",
  "Forward",
  SkillTypes.Katana,
  [ComboTypes.Cold, ComboTypes["Dead Stop"]],
  [ComboTypes.Cold],
  false
);

const multiSkill = new Skill(
  "Multi",
  "Multi",
  SkillTypes.Katana,
  [ComboTypes.Cold],
  [ComboTypes.Cold],
  true
);

describe("Skill Class", () => {
  test("skills can be constructed", () => {
    expect(newSkill).toBeTruthy();
  });

  test("getName respects the passed in field", () => {
    expect(newSkill.getName(true)).toBe(remakeName);
    expect(newSkill.getName(false)).toBe(originalName);
  });

  test("a send/recieve pair should combo", () => {
    expect(newSkill.canSendCombo(forwardSkill)).toBe(true);
    expect(forwardSkill.canRecieveCombo(newSkill)).toBe(true);
  });

  test("a multitarget skill can recieve a combo", () => {
    expect(forwardSkill.canSendCombo(multiSkill)).toBe(true);
    expect(multiSkill.canRecieveCombo(forwardSkill)).toBe(true);
  });

  test("a multitarget skill can sent a combo", () => {
    expect(multiSkill.canSendCombo(forwardSkill)).toBe(true);
    expect(forwardSkill.canRecieveCombo(multiSkill)).toBe(true);
  });

  test("can be created with a json object", () => {
    const jsonSkill = Skill.fromJson(jsonSkills["Sword"]["StunSlash"]);
    expect(jsonSkill.oldName).toBe("StunSlash");
    expect(jsonSkill.newName).toBe("Knee Split");
    expect(jsonSkill.skillType).toBe(SkillTypes.Sword);
    expect(jsonSkill.sends).toStrictEqual(
      Set([ComboTypes.Down, ComboTypes["Instant Stop"]])
    );
    expect(jsonSkill.recieves).toStrictEqual(
      Set([ComboTypes["Dead Stop"], ComboTypes.Move])
    );
    expect(jsonSkill.multiTarget).toBeFalsy();
  });

  test("errors on invalid skilltype", () => {
    expect(() => {
      new Skill("badSkill", "badSkill", "Invalid SkillType");
    }).toThrow("Skill Type 'Invalid SkillType' is not a known Skill Type");
  });

  test("errors on invalid sending combotype", () => {
    expect(() => {
      new Skill("badSkill", "badSkill", "Sword", ["HotDog"]);
    }).toThrow("Unknown combo type in sends array. sends: " + ["HotDog"]);
  });

  test("errors on invalid recieves combotypes", () => {
    expect(() => {
      new Skill("badSkill", "badSkill", "Sword", [], ["HotDog"], false);
    }).toThrow("Unknown combo type in recieves array. recieves: " + ["HotDog"]);
  });

  test("A skill with the same combo type in send and receives should self combo", () => {
    expect(forwardSkill.canSelfCombo()).toBeTruthy();
  });

  test("A skill that would self combo but is a multitarget skill should not self combo", () => {
    expect(multiSkill.canSelfCombo()).toBeFalsy();
  });

  test("PopKnight should not self combo because it's multitarget", () => {
    expect(
      Skill.fromJson(jsonSkills["Mec Programs"]["Pop-Knight"]).canSelfCombo()
    ).toBeFalsy();
  });

  test("DarkSphere should self combo", () => {
    expect(
      Skill.fromJson(jsonSkills["Shadow Magic"].DarkSphere).canSelfCombo()
    ).toBeTruthy();
  });
});

describe("Combo Class", () => {
  test("Combos can be constructed", () => {
    expect(new Combo()).toBeTruthy();
  });

  test("No possible combos makes blank array", () => {
    const combo = Combo.fromArray([
      newSkill,
      newSkill,
      newSkill,
      newSkill,
      newSkill,
    ]);
    expect(combo.getCombos()).toStrictEqual([]);
  });

  // Make a placeholder skill
  test("Blank combo should have no combos", () => {
    expect(new Combo().getCombos()).toStrictEqual([]);
  });

  test("Should detect a small combo", () => {
    const combo = Combo.fromArray([newSkill, forwardSkill]);
    expect(combo.getCombos()).toStrictEqual([{ start: 0, end: 1, level: 2 }]);
  });

  test("Should detect multiple combos", () => {
    const combo = Combo.fromArray([
      newSkill,
      forwardSkill,
      newSkill,
      forwardSkill,
    ]);
    expect(combo.getCombos()).toStrictEqual([
      { start: 0, end: 1, level: 2 },
      { start: 2, end: 3, level: 2 },
    ]);
  });

  test("Should detect a continuous combo", () => {
    const combo = Combo.fromArray([
      forwardSkill,
      forwardSkill,
      forwardSkill,
      forwardSkill,
      multiSkill,
    ]);
    expect(combo.getCombos()).toStrictEqual([{ start: 0, end: 4, level: 5 }]);
  });

  test("can iterate using iterator", () => {
    const combo = new Combo();
    let count = 0;
    for (const skill of combo) {
      expect(skill).toEqual(PLACEHOLDER_SKILL);
      count += 1;
    }
    expect(count).toEqual(combo.getLength());
  });
});

describe("Real Skill Combos", () => {
  const realSkills = Skill.skillsFromJson(jsonSkills);

  // Two skill combo
  test("Simple two skill combo", () => {
    const combo = Combo.fromArray([
      realSkills["Martial Arts"].AirThrow,
      realSkills.Sword.BearCrush,
    ]);
    expect(combo.getCombos()).toStrictEqual([{ start: 0, end: 1, level: 2 }]);
  });

  // Test attack all invalid combo level 2
  test("Attack all invalid combo level 2", () => {
    const combo = Combo.fromArray([
      realSkills.Sword.RisingNova,
      realSkills.Sword["Haze-to-Wheel"],
    ]);
    expect(combo.getCombos()).toStrictEqual([]);
  });

  // Test attack all valid combo level 2
  test("Attack all valid combo level 2", () => {
    const combo = Combo.fromArray([
      realSkills.Sword["Haze-to-Wheel"],
      realSkills.Sword.Smash,
    ]);
    expect(combo.getCombos()).toStrictEqual([{ start: 0, end: 1, level: 2 }]);
  });

  // Test attack all invalid combo level 3
  test("Attack all invalid combo level 3", () => {
    const combo = Combo.fromArray([
      realSkills["Monster (Body)"].Oscillation,
      realSkills.Gun.TotalShot,
      realSkills.Sword.HardSlash,
    ]);
    expect(combo.getCombos()).toStrictEqual([{ start: 1, end: 2, level: 2 }]);
  });

  // Test attack all valid combol level 3
  test("Attack all valid combo level 3", () => {
    const combo = Combo.fromArray([
      realSkills.Sword.HeadWind,
      realSkills["Martial Arts"].RollingCradle,
      realSkills["Light Magic"].MegaWindblast,
    ]);
    expect(combo.getCombos()).toStrictEqual([{ start: 0, end: 2, level: 3 }]);
  });

  // Test attack all valid level 4
  test("Attack all valid combo level 4", () => {
    const combo = Combo.fromArray([
      realSkills["Mec Programs"]["Pop-Knight"],
      realSkills["Heavy Weapons"].HyperionBazooka,
      realSkills.Gun.BoundShot,
      realSkills["Heavy Weapons"].Blaster,
    ]);
    expect(combo.getCombos()).toStrictEqual([{ start: 0, end: 3, level: 4 }]);
  });

  // Test attack all valid level 5
  test("Attack all valid combo level 5", () => {
    // headwind - rolling cradle - mega windblast
    const combo = Combo.fromArray([
      realSkills["Mec Parts"].CosmicRave,
      realSkills["Light Magic"].MegaWindblast,
      realSkills.Sword.LifeSprinkler,
      realSkills.Sword.RisingNova,
      realSkills.Sword.LifeSprinkler,
    ]);
    expect(combo.getCombos()).toStrictEqual([{ start: 0, end: 4, level: 5 }]);
  });
});
