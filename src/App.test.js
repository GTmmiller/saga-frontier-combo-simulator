import { describe, expect, test, beforeEach } from "@jest/globals"
import {render, screen, fireEvent} from '@testing-library/vue'
import '@testing-library/jest-dom'

import App from './App.vue'

describe('Top-Level App', () => {
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
        
        fireEvent.click(dropDowns[0])

        const swords = screen.getAllByText("Sword")
        const kneeSplits = screen.getAllByText("Knee Split")

        expect(swords[0]).toBeVisible()
        expect(kneeSplits[0]).toBeVisible()
        expect(swords[1]).not.toBeVisible()
        expect(kneeSplits[1]).not.toBeVisible()
    })
})
