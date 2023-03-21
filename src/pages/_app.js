import '@/styles/globals.css'
import { KioskoProvider } from '../../context/KioskoProvider'

export default function App({ Component, pageProps }) {
  return (
    <KioskoProvider>
      <Component {...pageProps} />
    </KioskoProvider>
  )
}
