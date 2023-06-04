import { createContext, useEffect, } from "react";
import { themeChange } from "theme-change";
import { Helmet } from "react-helmet";
import { useAppDispatch, useAppSelector } from "../store";
import { loadAppearanceSettings } from "../store/settingsSlice/thunks";

interface Props {

}

const AppearanceContext = createContext<Props>({})

const AppearanceProvider = ({ children }: {
    children: React.ReactNode
}) => {

    // States
    const theme = useAppSelector(state => state.settings.theme)
    let fontSize = parseInt(useAppSelector(state => state.settings.fontSize)) || 15
    if (fontSize < 12) fontSize = 12
    if (fontSize > 25) fontSize = 25
    const fontFamily = useAppSelector(state => state.settings.fontFamily)

    // Disptachs
    const dispatch = useAppDispatch()
    const disptachLoadAppearnceSettings = () => {
        dispatch(loadAppearanceSettings())
    }

    // Effects
    useEffect(() => {
        themeChange(false)
        disptachLoadAppearnceSettings()
    }, [])

    return (
        <AppearanceContext.Provider value={{}}>
            <Helmet>
                {/* @ts-ignore */}
                <html data-theme={theme} style={`
font-size:${fontSize}px;
font-family: "${fontFamily}", sans-serif;
`} />
            </Helmet>
            {children}
        </AppearanceContext.Provider>
    )
}

export { AppearanceContext, AppearanceProvider }
