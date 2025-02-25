import { Footer, Layout, Navbar } from 'nextra-theme-docs'
import { Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import Image from 'next/image'
import hayden from '/public/assets/hayden.jpeg'
import 'nextra-theme-docs/style.css'
import { Analytics } from '@vercel/analytics/next'

export const metadata = {
  // For more information on metadata API, see: https://nextjs.org/docs/app/building-your-application/optimizing/metadata
}

const navbar = (
  <Navbar
    logo={
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <Image
          src={hayden} 
          alt="Picture of Hayden Hong"
          width={42}
          height={42}
          style={{ borderRadius: '50%' }} // Makes the image round
        />
        <b>Hayden Hong</b>
      </div>
    }
    projectLink="https://github.com/AFRUITPIE/Hayden-Hong-Website"
  />
)

const footer = <Footer>
MIT {new Date().getFullYear()} © Hayden Hong.
Made with ♥️ in Seattle
</Footer>

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      dir="ltr"
      suppressHydrationWarning
    >
      <Head
      >
      </Head>
      <body>
        <Layout
          navbar={navbar}
          pageMap={await getPageMap()}
          footer={footer}
          feedback={{content: null}}
        >
          {children}
        </Layout>
        <Analytics />
      </body>
    </html>
  )
}
