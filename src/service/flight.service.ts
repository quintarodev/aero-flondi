import { Flight } from "@/types/flight"
import DATAFLIGHTS from "@/data/dataset.json"
export const flightService = {
  origin: {
    getAll: async (): Promise<Flight["origin"][]> => {
      const origins = new Set<Flight["origin"]>()
      DATAFLIGHTS.forEach((flight) => origins.add(flight.origin))
      return Array.from(origins)
    },
  },
}
