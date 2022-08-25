import { describe, expect, test, beforeEach } from "@jest/globals"
import { Combo } from "./combo"

import { Set } from "immutable"

import {Skill, ComboTypes, SkillTypes, PLACEHOLDER_SKILL} from "./skills" 

const remakeName = 'NewSlash'
const originalName = 'OldSlash'

const newSkill = new Skill(
    remakeName, 
    originalName, 
    SkillTypes.Katana, 
    Set([ComboTypes.Cold]),
    Set([ComboTypes.Move]),
    false
)

const forwardSkill = new Skill(
    'Forward',
    'Forward',
    SkillTypes.Katana,
    Set([ComboTypes.Cold, ComboTypes["Dead Stop"]]),
    Set([ComboTypes.Cold]),
    false
)

const multiSkill = new Skill(
    'Multi',
    'Multi',
    SkillTypes.Katana,
    Set([ComboTypes.Cold]),
    Set([ComboTypes.Cold]),
    true
)

let combo = null;

describe('Combo Class', () => {
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
            {start: 0, end: 1}
        ])
    })

    test('Should detect multiple combos', () => {
        combo.setSkill(0, newSkill)
        combo.setSkill(1, forwardSkill)
        combo.setSkill(2, newSkill)
        combo.setSkill(3, forwardSkill)
        expect(combo.getCombos()).toStrictEqual(
            [
                {start: 0, end: 1},
                {start: 2, end: 3}
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
            {start: 0, end: 4}
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
