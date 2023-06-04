import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { store } from './store'
import { Provider } from 'react-redux'
import { ModalProvider } from './contexts/Modal.tsx'
import { AppearanceProvider } from './contexts/Appearance.tsx'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <Provider store={store}>
            <AppearanceProvider>
                <ModalProvider>
                    <App />
                </ModalProvider>
            </AppearanceProvider>
        </Provider>
    </React.StrictMode>,
)
