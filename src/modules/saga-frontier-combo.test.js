import { describe, expect, test } from "@jest/globals"
import { Set } from "immutable"

import {Skill, ComboTypes, SkillTypes, Combo, PLACEHOLDER_SKILL} from "./saga-frontier-combo" 

import jsonSkills from "../data/skills.json"

const remakeName = 'NewSlash'
const originalName = 'OldSlash'

const newSkill = new Skill(
    remakeName, 
    originalName, 
    SkillTypes.Katana, 
    [ComboTypes.Cold],
    [ComboTypes.Move],
    false
)

const forwardSkill = new Skill(
    'Forward',
    'Forward',
    SkillTypes.Katana,
    [ComboTypes.Cold, ComboTypes["Dead Stop"]],
    [ComboTypes.Cold],
    false
)

const multiSkill = new Skill(
    'Multi',
    'Multi',
    SkillTypes.Katana,
    [ComboTypes.Cold],
    [ComboTypes.Cold],
    true
)


describe('Skill Class', () => {
    test('skills can be constructed', () => {
        expect(newSkill).toBeTruthy()
    })

    test('getName respects the passed in field', () => {
        expect(newSkill.getName(true)).toBe(remakeName)
        expect(newSkill.getName(false)).toBe(originalName)
    })

    test('a send/recieve pair should combo', () => {
        expect(newSkill.canSendCombo(forwardSkill)).toBe(true)
        expect(forwardSkill.canRecieveCombo(newSkill)).toBe(true)
    })

    test('a multitarget skill can recieve a combo', () => {
         expect(forwardSkill.canSendCombo(multiSkill)).toBe(true)
         expect(multiSkill.canRecieveCombo(forwardSkill)).toBe(true)
    })

    test('a multitarget skill cannot sent a combo', () => {
        expect(multiSkill.canSendCombo(forwardSkill)).toBe(false)
        expect(forwardSkill.canRecieveCombo(multiSkill)).toBe(false)
    })

    test('can be created with a json object', () => {
        const jsonSkill = Skill.fromJson(jsonSkills["Sword"]["StunSlash"])
        expect(jsonSkill.oldName).toBe("StunSlash")
        expect(jsonSkill.newName).toBe("Knee Split")
        expect(jsonSkill.skillType).toBe(SkillTypes.Sword)
        expect(jsonSkill.sends).toStrictEqual(Set([ComboTypes.Down, ComboTypes["Instant Stop"]]))
        expect(jsonSkill.recieves).toStrictEqual(Set([ComboTypes["Dead Stop"], ComboTypes.Move]))
        expect(jsonSkill.multiTarget).toBeFalsy()
    })
})

describe('Combo Class', () => {
    let combo;

    beforeEach( () => {
        combo = new Combo()
    })

    test('Combos can be constructed', () => {
        expect(combo).toBeTruthy()
    })

    test('No possible combos makes blank array', () => {
        combo.setSkill(0, newSkill)
        combo.setSkill(1, newSkill)
        combo.setSkill(2, newSkill)
        combo.setSkill(3, newSkill)
        combo.setSkill(4, newSkill)
        expect(combo.getCombos()).toStrictEqual([])
    })

    // Make a placeholder skill
    test('Blank combo should have no combos', () => {
        expect(combo.getCombos()).toStrictEqual([])
    })

    test('Should detect a small combo', () => {
        combo.setSkill(0, newSkill)
        combo.setSkill(1, forwardSkill)
        expect(combo.getCombos()).toStrictEqual([
            {start: 0, end: 1, level: 2}
        ])
    })

    test('Should detect multiple combos', () => {
        combo.setSkill(0, newSkill)
        combo.setSkill(1, forwardSkill)
        combo.setSkill(2, newSkill)
        combo.setSkill(3, forwardSkill)
        expect(combo.getCombos()).toStrictEqual(
            [
                {start: 0, end: 1, level: 2},
                {start: 2, end: 3, level: 2}
            ]
        )
    })

    test('Should detect a continuous combo', () => {
        combo.setSkill(0, forwardSkill)
        combo.setSkill(1, forwardSkill)
        combo.setSkill(2, forwardSkill)
        combo.setSkill(3, forwardSkill)
        combo.setSkill(4, multiSkill)
        expect(combo.getCombos()).toStrictEqual([
            {start: 0, end: 4, level: 5}
        ])
    })

    test('can iterate using iterator', () => {
        let count = 0
        for(const skill of combo) {
            expect(skill).toEqual(PLACEHOLDER_SKILL)
            count += 1
        }
        expect(count).toEqual(combo.getLength())
    })
    
})