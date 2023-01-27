import '../styles/globals.css'
import '../styles/patterns.css'
import type { AppProps } from 'next/app'
import { Inter } from '@next/font/google'

const inter = Inter({
  subsets: ['latin'],
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
  <>
    <style jsx global>
    {`
      :root {
        --inter-font: ${inter.style.fontFamily};
      }
    `}
    </style>
    <Component {...pageProps} />
    
  </>
  )
}

export default MyApp
