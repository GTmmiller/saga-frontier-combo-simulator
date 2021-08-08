import { describe, expect, test } from "@jest/globals"
import { Set } from "immutable"

import {Skill, ComboTypes, SkillTypes} from "./main" 

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
})