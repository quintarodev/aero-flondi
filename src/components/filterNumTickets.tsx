import type { FC } from "react"
interface FilterNumTicketsProps {
  initialValue?: number
  onFilterTickets: (tickets: number) => void
}
const FilterNumTickets: FC<FilterNumTicketsProps> = ({
  onFilterTickets,
  initialValue,
}) => {
  return (
    <div className="flex items-center space-x-2">
      <label># pasajeros</label>
      <input
        type="number"
        value={initialValue}
        min={1}
        onChange={(e) => onFilterTickets(parseInt(e.target.value))}
      />
    </div>
  )
}
export default FilterNumTickets
