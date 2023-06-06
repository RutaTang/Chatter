import type { SettingContent, SettingSide } from "../general"

// LoadSideSectionsAndItems Channel
export interface LoadSideSectionsAndItems {
    name: "load-side-sections-and-items"
    args: void
    return: SettingSide
}

// GetContentSectionsAndItems Channel
export interface GetContentSectionsAndItems {
    name: "get-content-sections-and-items"
    args: { sideItemId: number }
    return: SettingContent
}

// UpdateContentItemValue Channel
export interface UpdateContentItemValue {
    name: "update-content-item-value"
    args: { contentItemId: number, value: string }
    return: void
}

// GetContentItemValue Channel
export interface GetContentItemValue {
    name: "get-content-item-value"
    args: { sideSectionTitle: string, sideItemTitle: string, contentSectionTitle: string, contentItemTitle: string }
    return: string
}
