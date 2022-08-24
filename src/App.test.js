import { describe, expect, test, beforeEach } from "@jest/globals"
import {render, screen, fireEvent} from '@testing-library/vue'
import App from './App.vue'

describe('Top-Level App', () => {
    beforeEach( () => {
        render(App)
    })


    test('App can be rendered', () => {
        expect(screen.queryByText("Combo Simulator")).toBeTruthy()
    })

    test('App has 5 visible skill cards', () => {
        expect(screen.queryAllByText("No Skill Selected")).toHaveLength(5)
    })

    test('App has no visible combo cards', () => {
        expect(screen.queryAllByText(/^[1-5]$/)).toHaveLength(0)
    })
})
