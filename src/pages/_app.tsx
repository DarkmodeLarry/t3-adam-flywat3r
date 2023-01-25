import { type AppType } from 'next/app'
import { trpc } from '../utils/trpc'

import '../styles/Calendar.css'
import '../styles/globals.css'

const MyApp: AppType = ({ Component, pageProps }) => {
  return <Component {...pageProps} />
}

export default trpc.withTRPC(MyApp)
