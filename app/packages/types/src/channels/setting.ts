import type { SettingContent, SettingSide } from "../general"

// LoadSideSectionsAndItems Channel
export type LoadSideSectionsAndItemsChannel = "load-side-sections-and-items"
export type LoadSideSectionsAndItemsChannelArgs = void
export type LoadSideSectionsAndItemsChannelReturn = SettingSide

// GetContentSectionsAndItems Channel
export type GetContentSectionsAndItemsChannel = "get-content-sections-and-items"
export type GetContentSectionsAndItemsChannelArgs = { sideItemId: number }
export type GetContentSectionsAndItemsChannelReturn = SettingContent

// UpdateContentItemValue Channel
export type UpdateContentItemValueChannel = "update-content-item-value"
export type UpdateContentItemValueChannelArgs = { contentItemId: number, value: string }
export type UpdateContentItemValueChannelReturn = void

// GetContentItemValue Channel
export type GetContentItemValueChannel = "get-content-item-value"
export type GetContentItemValueChannelArgs = { sideSectionTitle: string, sideItemTitle: string, contentSectionTitle: string, contentItemTitle: string }
export type GetContentItemValueChannelReturn = string
