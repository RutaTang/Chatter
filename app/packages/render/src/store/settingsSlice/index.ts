import { createSlice } from "@reduxjs/toolkit";
import { NAME, } from "./constants";
import { SettingsContentSectionData } from "../../types";
import { loadAppearanceSettings, loadSideSectionsAndItems, setCurrentContentSection } from "./thunks";

interface SettingsState {
    sideSectionsAndItems: {
        title: string,
        items: {
            id: string,
            title: string,
        }[]
    }[],
    currentSideItemId?: string,
    currentContentSections?: SettingsContentSectionData[],

    // Seetings
    theme: string,
    fontSize: string,
    fontFamily: string,
}

const initialState: SettingsState = {
    sideSectionsAndItems: [],

    // Seetings
    theme: "",
    fontSize: "",
    fontFamily: "",
}

export const settingsSlice = createSlice({
    name: NAME,
    initialState,
    reducers: {
        setCurrentSideSection: (state, action) => {
            state.currentSideItemId = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadSideSectionsAndItems.fulfilled, (state, action) => {
                state.sideSectionsAndItems = action.payload
            })
            .addCase(setCurrentContentSection.fulfilled, (state, action) => {
                state.currentContentSections = action.payload
            })
            .addCase(loadAppearanceSettings.fulfilled, (state, action) => {
                state.theme = action.payload.theme
                state.fontSize = action.payload.fontSize
                state.fontFamily = action.payload.fontFamily
            })
    }
})

export default settingsSlice.reducer
export const { setCurrentSideSection } = settingsSlice.actions
