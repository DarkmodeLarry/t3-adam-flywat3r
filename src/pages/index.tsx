import CalendarComponent from '../components/CalendarComponent'
import type { Day } from '@prisma/client'
import { formatISO } from 'date-fns'
import { type NextPage } from 'next'
import { useState } from 'react'

interface HomeProps {
  days: Day[]
  closedDays: string[] // as ISO string
}

const Home: NextPage<HomeProps> = ({ days, closedDays }) => {
  return (
    <>
      <main>
        <CalendarComponent days={days} closedDays={closedDays} />
      </main>
    </>
  )
}

export async function getServerSideProps() {
  const days = await prisma.day.findMany()
  const closedDays = (await prisma.closedDay.findMany()).map((d) => formatISO(d.date))
  return { props: { days, closedDays } }
}

export default Home
