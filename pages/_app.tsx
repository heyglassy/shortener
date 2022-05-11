import '../styles/globals.css'
import { AppType } from 'next/dist/shared/lib/utils'
import { AppRouter } from './api/trpc/[trpc]'
import { withTRPC } from '@trpc/next'
import { getUrl } from '../utils/url'

const MyApp: AppType = ({ Component, pageProps }) => {
  return <Component {...pageProps} />
}

export default withTRPC<AppRouter>({
  config() {

    const url = getUrl()

    return {
      url
    }
  }
})(MyApp)

