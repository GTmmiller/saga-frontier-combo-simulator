import { describe, expect, test } from "@jest/globals"
import { Combo } from "./combo"

import { Set } from "immutable"

import {Skill, ComboTypes, SkillTypes, PLACEHOLDER_SKILL} from "./skills" 

const remakeName = 'NewSlash'
const originalName = 'OldSlash'

const newSkill = new Skill(
    remakeName, 
    originalName, 
    SkillTypes.KATANA, 
    Set([ComboTypes.COLD]),
    Set([ComboTypes.MOVE]),
    false
)

const forwardSkill = new Skill(
    'Forward',
    'Forward',
    SkillTypes.KATANA,
    Set([ComboTypes.COLD, ComboTypes.DEADSTOP]),
    Set([ComboTypes.COLD]),
    false
)

const multiSkill = new Skill(
    'Multi',
    'Multi',
    SkillTypes.KATANA,
    Set([ComboTypes.COLD]),
    Set([ComboTypes.COLD]),
    true
)

describe('Combo Class', () => {
    test('Combos can be constructed', () => {
        expect(new Combo()).toBeTruthy()
    })

    test('No possible combos makes blank array', () => {
        let combo = new Combo()
        combo.setSkill(0, newSkill)
        combo.setSkill(1, newSkill)
        combo.setSkill(2, newSkill)
        combo.setSkill(3, newSkill)
        combo.setSkill(4, newSkill)
        expect(combo.getCombos()).toStrictEqual([])
    })

    // Make a placeholder skill
    test('Blank combo should have no combos', () => {
        let combo = new Combo()
        expect(combo.getCombos()).toStrictEqual([])
    })

    test('Should detect a small combo', () => {
        let combo = new Combo()
        combo.setSkill(0, newSkill)
        combo.setSkill(1, forwardSkill)
        expect(combo.getCombos()).toStrictEqual([
            {start: 0, end: 1}
        ])
    })

    test('Should detect multiple combos', () => {
        let combo = new Combo()
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
        let combo = new Combo()
        combo.setSkill(0, forwardSkill)
        combo.setSkill(1, forwardSkill)
        combo.setSkill(2, forwardSkill)
        combo.setSkill(3, forwardSkill)
        combo.setSkill(4, multiSkill)
        expect(combo.getCombos()).toStrictEqual([
            {start: 0, end: 4}
        ])
    })
    
})
