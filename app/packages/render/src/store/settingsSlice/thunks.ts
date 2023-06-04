import { createAsyncThunk } from "@reduxjs/toolkit";
import { NAME } from "./constants";
import { invock } from "../../utils/service";
import { LoadSideSectionsAndItemsChannelArgs, LoadSideSectionsAndItemsChannel, LoadSideSectionsAndItemsChannelReturn, GetContentSectionsAndItemsChannel, GetContentSectionsAndItemsChannelArgs, GetContentSectionsAndItemsChannelReturn, UpdateContentItemValueChannel, UpdateContentItemValueChannelArgs, UpdateContentItemValueChannelReturn, GetContentItemValueChannel, GetContentItemValueChannelArgs, GetContentItemValueChannelReturn } from "types";
import { RootState } from "..";

export const updateContentItemValue = createAsyncThunk<
    void,
    {
        contentItemId: string,
        value: string
    },
    {
        state: RootState
    }
>(
    `${NAME}/updateContentItemValue`,
    async (payload: { contentItemId: string, value: string }, thunkAPI) => {
        console.log(payload)
        await invock<UpdateContentItemValueChannel, UpdateContentItemValueChannelArgs>("update-content-item-value", payload) as UpdateContentItemValueChannelReturn
        await thunkAPI.dispatch(loadAppearanceSettings())
        await thunkAPI.dispatch(setCurrentContentSection({ sideItemId: thunkAPI.getState().settings.currentSideItemId! }))
    }
)

export const loadSideSectionsAndItems = createAsyncThunk(
    `${NAME}/loadSideSectionsAndItems`,
    async () => {
        const r = await invock<LoadSideSectionsAndItemsChannel, LoadSideSectionsAndItemsChannelArgs>("load-side-sections-and-items", undefined) as LoadSideSectionsAndItemsChannelReturn
        return r
    }
)

export const setCurrentContentSection = createAsyncThunk(
    `${NAME}/setCurrentContentSection`,
    async ({ sideItemId }: {
        sideItemId: string
    }) => {
        const r: GetContentSectionsAndItemsChannelReturn = await invock<GetContentSectionsAndItemsChannel, GetContentSectionsAndItemsChannelArgs>("get-content-sections-and-items", {
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
        const theme: GetContentItemValueChannelReturn = await invock<GetContentItemValueChannel, GetContentItemValueChannelArgs>("get-content-item-value", {
            sideSectionTitle: "General",
            sideItemTitle: "Appearance",
            contentSectionTitle: "Theme",
            contentItemTitle: "Theme name",
        })
        // Font size
        const fontSize: GetContentItemValueChannelReturn = await invock<GetContentItemValueChannel, GetContentItemValueChannelArgs>("get-content-item-value", {
            sideSectionTitle: "General",
            sideItemTitle: "Appearance",
            contentSectionTitle: "Font",
            contentItemTitle: "Font size",
        })
        // Font family
        const fontFamily: GetContentItemValueChannelReturn = await invock<GetContentItemValueChannel, GetContentItemValueChannelArgs>("get-content-item-value", {
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
