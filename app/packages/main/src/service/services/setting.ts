import { getContentSectionItemValue, getContentSectionsAndItems, loadSideSectionsAndItems, updateContentSectionItemValue } from "../../store/operations/settings";
import { Service, serviceEngine } from "../engine";
import type { LoadSideSectionsAndItemsChannelArgs, LoadSideSectionsAndItemsChannel, LoadSideSectionsAndItemsChannelReturn, GetContentSectionsAndItemsChannel, GetContentSectionsAndItemsChannelArgs, GetContentSectionsAndItemsChannelReturn, UpdateContentItemValueChannel, UpdateContentItemValueChannelArgs, UpdateContentItemValueChannelReturn, GetContentItemValueChannel, GetContentItemValueChannelReturn, GetContentItemValueChannelArgs } from 'types'

@serviceEngine.handle<LoadSideSectionsAndItemsChannel>("load-side-sections-and-items")
export class LoadSideSectionsAndItems extends Service {

    async process(_: any, _args: LoadSideSectionsAndItemsChannelArgs): Promise<LoadSideSectionsAndItemsChannelReturn> {
        const r = await loadSideSectionsAndItems()
        return r
    }

}

@serviceEngine.handle<GetContentSectionsAndItemsChannel>("get-content-sections-and-items")
export class GetContentSectionsAndItems extends Service {

    async process(_: any, { sideItemId }: GetContentSectionsAndItemsChannelArgs): Promise<GetContentSectionsAndItemsChannelReturn> {
        const sectionsAndItems = await getContentSectionsAndItems(sideItemId)
        return sectionsAndItems
    }

}


@serviceEngine.handle<UpdateContentItemValueChannel>("update-content-item-value")
export class UpdateContentSectionItemValue extends Service {

    async process(_: any, { contentItemId, value }: UpdateContentItemValueChannelArgs): Promise<UpdateContentItemValueChannelReturn> {
        await updateContentSectionItemValue(contentItemId, value)
    }

}

@serviceEngine.handle<GetContentItemValueChannel>("get-content-item-value")
export class GetContentItemValue extends Service {

    async process(_: any, args: GetContentItemValueChannelArgs): Promise<GetContentItemValueChannelReturn> {
        const r = await getContentSectionItemValue(args.sideSectionTitle, args.sideItemTitle, args.contentSectionTitle, args.contentItemTitle)
        return r
    }
}
