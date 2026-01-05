// pages/_app.js
import '../styles/globals.css'
import Layout from '../components/Layout'
import { appWithTranslation } from 'next-i18next'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

import { Outfit, Changa } from 'next/font/google'

// Latin font (used for non-Arabic locales)
const outfit = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-outfit',
  display: 'swap',
})

// Arabic-friendly font: Changa (used when locale === 'ar')
const changa = Changa({
  subsets: ['arabic','latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-changa',
  display: 'swap',
})

function MyApp({ Component, pageProps }) {
  const { locale } = useRouter()

  useEffect(() => {
    document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.lang = locale || 'en'
  }, [locale])

  // choose font class based on locale
  const fontClass = locale === 'ar' ? changa.className : outfit.className

  return (
    <main className={fontClass}>
      {/* keep your existing layout and components */}
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </main>
  )
}

export default appWithTranslation(MyApp)
