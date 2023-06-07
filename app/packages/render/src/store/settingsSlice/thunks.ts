import { createAsyncThunk } from "@reduxjs/toolkit";
import { NAME } from "./constants";
import { invock } from "../../utils/service";
import type {
    UpdateContentItemValue,
    LoadSideSectionsAndItems,
    GetContentSectionsAndItems,
    GetContentItemValue
} from "types";
import { RootState } from "..";

export const updateContentItemValue = createAsyncThunk<
    void,
    {
        contentItemId: number,
        value: string
    },
    {
        state: RootState
    }
>(
    `${NAME}/updateContentItemValue`,
    async ({ contentItemId, value }, thunkAPI) => {
        await invock<UpdateContentItemValue>("update-content-item-value", { contentItemId, value })
        await thunkAPI.dispatch(loadAppearanceSettings())
        await thunkAPI.dispatch(setCurrentContentSection({ sideItemId: thunkAPI.getState().settings.currentSideItemId! }))
    }
)

export const loadSideSectionsAndItems = createAsyncThunk(
    `${NAME}/loadSideSectionsAndItems`,
    async () => {
        const r = await invock<LoadSideSectionsAndItems>("load-side-sections-and-items", undefined)
        return r
    }
)

export const setCurrentContentSection = createAsyncThunk(
    `${NAME}/setCurrentContentSection`,
    async ({ sideItemId }: {
        sideItemId: number
    }) => {
        const r = await invock<GetContentSectionsAndItems>("get-content-sections-and-items", {
            sideItemId
        })
        return r
    }
)

/**
 * Load settings from backend, e.g. theme, font, etc.
*/
export const loadAppearanceSettings = createAsyncThunk(
    `${NAME}/loadAppearanceSettings`,
    async () => {
        // Theme
        const theme = await invock<GetContentItemValue>("get-content-item-value", {
            sideSectionTitle: "General",
            sideItemTitle: "Appearance",
            contentSectionTitle: "Theme",
            contentItemTitle: "Theme name",
        })
        // Font size
        const fontSize = await invock<GetContentItemValue>("get-content-item-value", {
            sideSectionTitle: "General",
            sideItemTitle: "Appearance",
            contentSectionTitle: "Font",
            contentItemTitle: "Font size",
        })
        // Font family
        const fontFamily = await invock<GetContentItemValue>("get-content-item-value", {
            sideSectionTitle: "General",
            sideItemTitle: "Appearance",
            contentSectionTitle: "Font",
            contentItemTitle: "Font family",
        })
        return {
            theme,
            fontSize,
            fontFamily
        }
    }
)
