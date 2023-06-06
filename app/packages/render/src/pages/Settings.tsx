import { useEffect } from "react";
import SettingsContent from "../components/SettingsContent";
import SettingsSideBar from "../components/SettingsSideBar";
import { useAppDispatch, useAppSelector } from "../store";
import { setCurrentSideSection } from "../store/settingsSlice";
import { loadSideSectionsAndItems, setCurrentContentSection, updateContentItemValue } from "../store/settingsSlice/thunks";

export default function() {

    // States
    const sideSections = useAppSelector(state => state.settings.sideSectionsAndItems)
    const currentSideItemId = useAppSelector(state => state.settings.currentSideItemId)
    const currentContentSections = useAppSelector(state => state.settings.currentContentSections)
    // const theme = useAppSelector(state => state.settings.theme)


    // Dispatchs
    const dispatch = useAppDispatch()
    const dispatchSetCurrentSideSection = (sectionId: any) => {
        dispatch(setCurrentSideSection(sectionId))
    }
    const dispatchUpdateContentOptionItem = (contentItemId: any, value: string) => {
        dispatch(updateContentItemValue({
            contentItemId,
            value
        }))
    }
    const distpatchSetCurrentContentSections = () => {
        if (!currentSideItemId) return
        dispatch(setCurrentContentSection({
            sideItemId: currentSideItemId
        }))
    }


    // Effects
    useEffect(() => {
        dispatch(loadSideSectionsAndItems())
    }, [])

    useEffect(() => {
        distpatchSetCurrentContentSections()
    }, [
        currentSideItemId
    ])

    return (
        <div className="w-full h-full flex flex-row items-center">
            <div className="w-[25%] h-full bg-base-300 shrink-0" >
                <SettingsSideBar
                    sections={sideSections}
                    activeItemId={currentSideItemId}
                    onClick={dispatchSetCurrentSideSection} />
            </div>
            <div className="grow h-full bg-base-200 px-10 py-10">
                <SettingsContent sections={currentContentSections} onActionValueChange={(contentItemId, value) => {
                    dispatchUpdateContentOptionItem(contentItemId, value)
                }} />
            </div>
        </div>
    )
}
