import type { GetStaticProps, NextPage } from "next"
import data from "@/data/dataset.json"
import { FC, useEffect, useState } from "react"
import FilterInputMount from "@/components/filterInputMount"
import FilterSelectOrigin from "@/components/filterSelectOrigin"
import FilterNumTickets from "@/components/filterNumTickets"
import Button from "@/components/button"
import { Flight } from "@/types/flight"
import { flightService } from "@/service/flight.service"

const initialData: Flight[] = data
export const getStaticProps: GetStaticProps = async (context) => {
  const origins = await flightService.origin.getAll()
  return {
    props: { origins },
  }
}
interface Props {
  origins: string[]
}
const Home: NextPage<Props> = ({ origins }) => {
  const [mount, setMount] = useState(0)
  const [origin, setOrigin] = useState<string>("")
  const [tickets, setTickets] = useState(1)

  const vuelos = initialData
    .filter((vuelo) => vuelo.origin === origin)
    .filter((vuelo) => vuelo.availability >= tickets)
    .filter((vuelo) => mount >= tickets * vuelo.price)

  const rows = sortArray(sortArray(vuelos, "data"), "destination")

  return (
    <>
      <main className="min-h-screen w-screen bg-slate-200">
        <div className="max-w-7xl m-auto">
          <div className=" p-8 flex-col items-center ">
            <h1 className="text-5xl text-center">
              Vaje con nosotros a los mejores precios
            </h1>
            <form>
              <div className="border border-gray-300 p-4 rounded-lg mt-8">
                <FilterInputMount onFilterInputMount={setMount} />
                <div className="flex space-x-4">
                  <FilterSelectOrigin
                    origins={origins}
                    onFilterSelectOrigin={setOrigin}
                  />
                  <FilterNumTickets
                    initialValue={tickets}
                    onFilterTickets={setTickets}
                  />
                </div>
                <Button />
              </div>
            </form>
            <div className="p-4 border border-gray-300 mt-8 rounded-lg bg-slate-100 shadow-sm">
              <h2>Vuelos para la abuelita</h2>
              {vuelos.length && <p>disponibles {vuelos.length}</p>}

              <FlightTable flights={rows} />
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
const FlightTable: FC<{ flights: Flight[] }> = ({ flights }) => {
  const rows: any[] = []
  let lastDestiny: string | null = null
  flights.forEach((flight) => {
    if (flight.destination !== lastDestiny) {
      rows.push(<FlightDestinityRow destinity={flight.destination} />)
    }
    rows.push(<FlightRow flight={flight} />)
    lastDestiny = flight.destination
  })

  return (
    <table className="table-auto w-full">
      <thead>
        <tr className="bg-yellow-300">
          <th>Fecha</th>
          <th>Disponibles</th>
          <th>Precios</th>
        </tr>
      </thead>
      <tbody className="">{rows}</tbody>
    </table>
  )
}
const FlightDestinityRow: FC<{ destinity: string }> = ({ destinity }) => {
  return (
    <tr className="bg-yellow-100">
      <th colSpan={3}>{destinity}</th>
    </tr>
  )
}
const FlightRow: FC<{ flight: Flight }> = ({ flight }) => {
  return (
    <tr className="even:bg-gray-200">
      <td>{flight.data}</td>
      <td>{flight.availability}</td>
      <td>{flight.price}</td>
    </tr>
  )
}
function sortArray<T>(array: Array<T>, t: keyof T) {
  return [...array].sort((a, b) => {
    if (a[t] < b[t]) {
      return -1
    }
    if (a[t] > b[t]) {
      return 1
    }
    return 0
  })
}
export default Home
