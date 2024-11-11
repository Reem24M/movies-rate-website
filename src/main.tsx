// import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient,QueryClientProvider } from '@tanstack/react-query'
import App from './App.tsx'
import './index.css'
import {ToastContainer} from 'react-toastify'

const queryClient = new QueryClient()
// import 'semantic-ui-css/semantic.min.css'
import 'semantic-ui-css/semantic.min.css'
ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
    <QueryClientProvider client={queryClient}>
    <App />
    <ToastContainer />
    </QueryClientProvider>
  // </React.StrictMode>,
)
