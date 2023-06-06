import { In, Not } from "typeorm";
import { AppDataSource } from "../data-source";
import { SettingContentSection, SettingContentSectionItem, SettingSideSection, SettingSideSectionItem } from "../entities/settings";
import { BUILT_IN_MODELS_PLUGINS_PATH } from "../../utils";
import { readFile } from 'fs/promises'
import path from "path";
import { getChildrenDirectories } from "../../utils/fs";
import { parse } from 'yaml'
import type { Manifest } from 'types'

/**
 * prepare and initialize default/built-in settings
 */
export async function initDefaultSettings() {

    const sideSectionIds: any[] = []
    const sideSectionItemIds: any[] = []
    const contentSectionIds: any[] = []
    const contentSectionItemIds: any[] = []

    // === Define helper functions ===

    // Clear redundant function:
    // to clearn up the database by remove non macthed previous data
    // to only leave new default settings
    const clearRedundant = async (entity: any, ids: any[]) => {
        const toRemoved = await AppDataSource.getRepository(entity).find({
            where: {
                id: Not(In(ids))
            }
        })
        await AppDataSource.getRepository(entity).remove(toRemoved)
    }


    /** 
    * Load manifest: load a Side Section settings from manifest data
    *
    * @param title: the title of the side section
    * @param manifests: the manifests data
    *
    */
    const loadManifests = async ({ title, manifests }: { title: string, manifests: Manifest[] }) => {

        // Side Section: init ${title} side section
        let sideSection = new SettingSideSection()
        sideSection.title = title
        try {
            sideSection = await AppDataSource.getRepository(SettingSideSection).findOneOrFail({
                where: {
                    title: title
                }
            })
        } catch (e) {
            sideSection = await AppDataSource.getRepository(SettingSideSection).save(sideSection)
        }
        sideSectionIds.push(sideSection.id)

        for (const manifest of manifests) {
            // Side Section Item: init "Side Section > manifest.name" side section item
            let sideSectionItem = new SettingSideSectionItem()
            sideSectionItem.title = manifest.name
            sideSectionItem.section = sideSection
            try {
                sideSectionItem = await AppDataSource.getRepository(SettingSideSectionItem).findOneOrFail({
                    where: {
                        title: manifest.name
                    }
                })
            } catch (e) {
                sideSectionItem = await AppDataSource.getRepository(SettingSideSectionItem).save(sideSectionItem)
            }
            sideSectionItemIds.push(sideSectionItem.id)

            // Content Section: init "Side Section > manifest.name > manifest.sections" content section
            for (const section of manifest.sections) {
                let contentSection = new SettingContentSection()
                contentSection.title = section.title
                contentSection.sideSectionItem = sideSectionItem
                try {
                    contentSection = await AppDataSource.getRepository(SettingContentSection).findOneOrFail({
                        where: {
                            title: section.title,
                            sideSectionItem: sideSectionItem
                        }
                    })
                } catch (e) {
                    contentSection = await AppDataSource.getRepository(SettingContentSection).save(contentSection)
                }
                contentSectionIds.push(contentSection.id)


                // Content Section Item: init "Side Section > manifest.name > manifest.sections > items" content section item
                for (const item of section.items) {
                    let contentSectionItem = new SettingContentSectionItem()
                    contentSectionItem.title = item.title
                    contentSectionItem.description = item.description || ""
                    contentSectionItem.section = contentSection
                    try {
                        contentSectionItem = await AppDataSource.getRepository(SettingContentSectionItem).findOneOrFail({
                            where: {
                                title: item.title,
                                section: contentSection
                            }
                        })
                    } catch (e) {
                        contentSectionItem = await AppDataSource.getRepository(SettingContentSectionItem).save(contentSectionItem)
                    }
                    contentSectionItemIds.push(contentSectionItem.id)
                }
            }
        }
    }


    //  === General Side Section  ===

    // General > Appearance Manifest
    const appearanceManifest: Manifest = {
        name: "Appearance",
        sections: [
            {
                title: "Theme",
                items: [
                    {
                        title: "Theme name",
                        description: "Type your preferred theme name"
                    }
                ]
            },
            {
                title: "Font",
                items: [
                    {
                        title: "Font size",
                        description: "Type your preferred font size"
                    },
                    {
                        title: "Font family",
                        description: "Type your preferred font family"
                    }
                ]
            }
        ]
    }

    // load manifests
    await loadManifests({
        title: "General",
        manifests: [appearanceManifest]
    })


    // === Models Side Section ===

    // Get built-in models manifests
    const modelsPaths = await getChildrenDirectories(BUILT_IN_MODELS_PLUGINS_PATH)
    const modelsManifests: Manifest[] = []
    for (const modelPath of modelsPaths) {
        const menifestPath = path.join(modelPath, "manifest.yaml")
        const menifestString = (await readFile(menifestPath)).toString()
        const manifest: Manifest = parse(menifestString)
        modelsManifests.push(manifest)
    }

    // Load manifests
    await loadManifests({
        title: "Models",
        manifests: modelsManifests
    })


    // === Clear Redundant ===
    clearRedundant(SettingSideSection, sideSectionIds)
    clearRedundant(SettingSideSectionItem, sideSectionItemIds)
    clearRedundant(SettingContentSection, contentSectionIds)
    clearRedundant(SettingContentSectionItem, contentSectionItemIds)
}


export async function loadSideSectionsAndItems() {
    const sideSectionsAndItems = await AppDataSource.getRepository(SettingSideSection).find({
        relations: {
            items: true
        },
    })
    return sideSectionsAndItems
}

export async function getContentSectionsAndItems(sideItemId: number) {
    const contentSectionsAndItems = await AppDataSource.getRepository(SettingContentSection).find({
        relations: {
            items: true
        },
        where: {
            sideSectionItem: {
                id: sideItemId
            }
        }
    })
    return contentSectionsAndItems
}

export async function updateContentSectionItemValue(contentItemId: number, value: string) {
    const contentSectionItem = await AppDataSource.getRepository(SettingContentSectionItem).findOneOrFail({
        where: {
            id: contentItemId
        }
    })
    contentSectionItem.value = value
    await AppDataSource.getRepository(SettingContentSectionItem).save(contentSectionItem)
}


export async function getContentSectionItemValue(sideSectionTitle: string, sideItemTitle: string, contentSectionTitle: string, contentItemTitle: string) {
    const contentSectionItem = await AppDataSource.getRepository(SettingContentSectionItem).findOneOrFail({
        where: {
            title: contentItemTitle,
            section: {
                title: contentSectionTitle,
                sideSectionItem: {
                    title: sideItemTitle,
                    section: {
                        title: sideSectionTitle
                    }
                }
            }
        }
    })
    return contentSectionItem.value
}

export async function getManifest(modelName: string): Promise<Manifest> {
    const sideItem = await AppDataSource.getRepository(SettingSideSectionItem).findOneOrFail({
        relations: {
            contentSections: {
                items: true
            }
        },
        where: {
            title: modelName,
            section: {
                title: "Models"
            }
        }
    })

    const contentSections = sideItem.contentSections
    const manifest: Manifest = {
        name: sideItem.title,
        sections: contentSections?.map(contentSection => {
            return {
                title: contentSection.title,
                items: contentSection.items?.map(contentSectionItem => {
                    return {
                        title: contentSectionItem.title,
                        description: contentSectionItem.description,
                        value: contentSectionItem.value
                    }
                }) || []
            }
        }) || []
    }
    return manifest
}

export async function listAllModels() {
    const sideSection = await AppDataSource.getRepository(SettingSideSection).findOneOrFail({
        relations: {
            items: true
        },
        where: {
            title: "Models"
        }
    })
    return sideSection.items?.map(item => item.title) || []
}
