import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { store } from './store'
import { Provider } from 'react-redux'
import { ModalProvider } from './contexts/Modal.tsx'
import { AppearanceProvider } from './contexts/Appearance.tsx'
import { ErrorBoundary } from './contexts/ErrorBoundary.tsx'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <Provider store={store}>
            <ErrorBoundary>
                <AppearanceProvider>
                    <ModalProvider>
                        <App />
                    </ModalProvider>
                </AppearanceProvider>
            </ErrorBoundary >
        </Provider>
    </React.StrictMode>,
)
