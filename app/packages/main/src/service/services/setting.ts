import { getContentSectionItemValue, getContentSectionsAndItems, loadSideSectionsAndItems, updateContentSectionItemValue } from "../../store/operations/settings";
import { Service, serviceEngine } from "../engine";
import type {
    LoadSideSectionsAndItems as LoadSideSectionsAndItemsChannel,
    GetContentSectionsAndItems as GetContentSectionsAndItemsChannel,
    UpdateContentItemValue as UpdateContentItemValueChannel,
    GetContentItemValue as GetContentItemValueChannel,
} from 'types'

@serviceEngine.handle<LoadSideSectionsAndItemsChannel>("load-side-sections-and-items")
export class LoadSideSectionsAndItems extends Service<LoadSideSectionsAndItemsChannel> {

    constructor() {
        super()
        this.process = async () => {
            const data = await loadSideSectionsAndItems()
            const r = data.map(sideSection => {
                return {
                    title: sideSection.title,
                    items: sideSection.items || []
                }
            })
            return r
        }
    }

}

@serviceEngine.handle<GetContentSectionsAndItemsChannel>("get-content-sections-and-items")
export class GetContentSectionsAndItems extends Service<GetContentSectionsAndItemsChannel> {

    constructor() {
        super()
        this.process = async (_: any, { sideItemId }) => {
            const sectionsAndItems = await getContentSectionsAndItems(sideItemId)
            const r = sectionsAndItems.map(contentSection => {
                return {
                    title: contentSection.title,
                    items: contentSection.items || []
                }
            })
            return r
        }
    }

}


@serviceEngine.handle<UpdateContentItemValueChannel>("update-content-item-value")
export class UpdateContentSectionItemValue extends Service<UpdateContentItemValueChannel> {


    constructor() {
        super()
        this.process = async (_: any, { contentItemId, value }) => {
            await updateContentSectionItemValue(contentItemId, value)
        }
    }


}

@serviceEngine.handle<GetContentItemValueChannel>("get-content-item-value")
export class GetContentItemValue extends Service<GetContentItemValueChannel> {

    constructor() {
        super()
        this.process = async (_: any, { sideItemTitle, sideSectionTitle, contentSectionTitle, contentItemTitle }) => {
            const r = await getContentSectionItemValue(sideSectionTitle, sideItemTitle, contentSectionTitle, contentItemTitle)
            return r
        }
    }

}
