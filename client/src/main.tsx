import { createRoot } from 'react-dom/client'
import App from './App'
import { ChakraProvider, extendTheme, ThemeConfig } from '@chakra-ui/react'

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: true,
}

const theme = extendTheme({ config })
import './index.css'

createRoot(document.getElementById('root')!).render(
  <ChakraProvider theme={theme}>
    <App />
  </ChakraProvider>
  ,
)
