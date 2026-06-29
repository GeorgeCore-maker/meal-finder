import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ChakraProvider } from '@chakra-ui/react'
import { LanguageProvider } from './contexts/LanguageContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ChakraProvider>
    <LanguageProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </LanguageProvider>
  </ChakraProvider>,
)
