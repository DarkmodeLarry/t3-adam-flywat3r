import CalendarComponent from './components/Calendar/Calendar'
import type { Day } from '@prisma/client'
import { formatISO } from 'date-fns'
import { type NextPage } from 'next'
import Head from 'next/head'
import { prisma } from '../server/db/client'

interface HomeProps {
  days: Day[]
  closedDays: string[] // as ISO string
}

const Home: NextPage<HomeProps> = ({ days, closedDays }) => {
  return (
    <>
      <Head>
        <title>Flywat3r Swim-Gym</title>
        <meta name='description' content='Generated by create-t3-app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>
        <CalendarComponent days={days} closedDays={closedDays} />
      </main>
    </>
  )
}

export default Home
