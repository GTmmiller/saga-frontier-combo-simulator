import { describe, expect, test } from "@jest/globals"
import { Set } from "immutable"

import {Skill, ComboTypes, SkillTypes} from "./skills" 

import jsonSkills from "../../data/skills.json"

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