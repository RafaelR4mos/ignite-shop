import { AppProps } from 'next/app'
import { globalStyles } from '../styles/global'
import { Container } from '../styles/pages/app'

import Image from 'next/image'

import logoImg from '../assets/logo.svg'
import { Header } from '../components/Header'
import { ShoppingCartProvider } from '../context/ShoppingCartContext'

globalStyles()

function App({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <ShoppingCartProvider>
        <Header />

        <Component {...pageProps} />
      </ShoppingCartProvider>
    </Container>
  )
}

export default App
