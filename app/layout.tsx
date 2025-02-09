import { Footer, Layout, Navbar } from 'nextra-theme-docs'
import { Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import { useRouter } from 'next/router'
import 'nextra-theme-docs/style.css'

export const metadata = {
  // For more information on metadata API, see: https://nextjs.org/docs/app/building-your-application/optimizing/metadata
}

const navbar = (
  <Navbar
    logo={<b>Hayden Hong</b>}
    projectLink='https://github.com/AFRUITPIE/Hayden-Hong-Website'
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
      </body>
    </html>
  )
}
