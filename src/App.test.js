import { describe, expect, test, beforeEach } from "@jest/globals"
import {render, screen, fireEvent} from '@testing-library/vue'
import '@testing-library/jest-dom'

import App from './App.vue'

describe.skip('Top-Level App', () => {
    beforeEach( () => {
        render(App)
    })

    test('App can be rendered', async () => {
        expect(screen.getByText("Combo Simulator")).toBeTruthy()
    })

    test('App has 5 visible skill cards', async () => {
        expect(screen.getAllByText("No Skill Selected")).toHaveLength(5)
    })

    test('App has no visible combo cards', async () => {
        expect(screen.queryAllByText(/^[1-5]$/)).toHaveLength(0)
    })

    test.skip('Clicking a skill drop down produces a menu', async () => {
        const dropDowns = screen.getAllByText("No Skill Selected")
        
        await fireEvent.click(dropDowns[0])

        const swords = screen.getAllByText("Sword")
        const kneeSplits = screen.getAllByText("StunSlash")

        expect(swords[0]).toBeVisible()
        expect(kneeSplits[0]).toBeVisible()
        expect(swords[1]).not.toBeVisible()
        expect(kneeSplits[1]).not.toBeVisible()
    })

    test('Clicking a skill in the dropdown changes the option', async () => {
        const dropDowns = screen.getAllByText("No Skill Selected")

        await fireEvent.click(dropDowns[0])

        const kneeSplits = screen.getAllByText("StunSlash")

        await fireEvent.click(kneeSplits[0])

        const afterSplits = screen.getAllByText("StunSlash")

        expect(afterSplits).toHaveLength(6)
    })

    test('Creating a level 2 combo shows a combo panel', async () => {
        const dropDowns = screen.getAllByText("No Skill Selected")
        const lunarBlades = screen.getAllByText("MoonlightCut")
        const kneeSplits = screen.getAllByText("StunSlash")

        await fireEvent.click(dropDowns[0])
        await fireEvent.click(lunarBlades[0])
        await fireEvent.click(dropDowns[1])
        await fireEvent.click(kneeSplits[1])

        expect(screen.getByText("2")).toBeTruthy()
    })

    test('Creating multiple combos shows multiple panels', async() => {
        const dropDowns = screen.getAllByText("No Skill Selected")
        const lunarBlades = screen.getAllByText("MoonlightCut")
        const kneeSplits = screen.getAllByText("StunSlash")
        const doubleVerts = screen.getAllByText("DoubleSlash")

        await fireEvent.click(dropDowns[0])
        await fireEvent.click(lunarBlades[0])
        await fireEvent.click(dropDowns[1])
        await fireEvent.click(kneeSplits[1])
        await fireEvent.click(dropDowns[2])
        await fireEvent.click(doubleVerts[2])
        await fireEvent.click(dropDowns[3])
        await fireEvent.click(lunarBlades[3])
        await fireEvent.click(dropDowns[4])
        await fireEvent.click(kneeSplits[4])

        expect(screen.getByText("2")).toBeTruthy()
        expect(screen.getAllByText("3")).toHaveLength(2)
    })

    test('Filtering skills on a non-comboable skill should show a message', async() => {
        const dropDowns = screen.getAllByText("No Skill Selected")
        const doubleVerts = screen.getAllByText("DoubleSlash")

        await fireEvent.click(dropDowns[0])
        await fireEvent.click(doubleVerts[0])
        await fireEvent.click(dropDowns[1])

        const filterBox = screen.getAllByText("Combo Skills Only")

        await fireEvent.click(filterBox[1])
        expect(screen.getByText("No skills selectable")).toBeTruthy()
    })

    test('Filtering skills should reduce the visible dropdown skills', async() => {
        const dropDowns = screen.getAllByText("No Skill Selected")
        const thrusts = screen.getAllByText("Thrust")

        await fireEvent.click(dropDowns[0])
        await fireEvent.click(thrusts[0])
        await fireEvent.click(dropDowns[1])

        const filterBox = screen.getAllByText("Combo Skills Only")

        await fireEvent.click(filterBox[1])
        
        expect(screen.getAllByText("StunSlash")).toHaveLength(4)
    })
})
