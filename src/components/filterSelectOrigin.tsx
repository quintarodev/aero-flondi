import type { FC } from "react"

interface FilterSelectOriginProps {
  origins: string[]
  onFilterSelectOrigin: (origin: string) => void
}
const FilterSelectOrigin: FC<FilterSelectOriginProps> = ({
  origins,
  onFilterSelectOrigin,
}) => {
  return (
    <div className="flex items-center space-x-2">
      <label>Origen</label>
      <select
        name=""
        id=""
        onChange={(e) => onFilterSelectOrigin(e.target.value)}
      >
        {Array.from(origins).map((origin) => (
          <option key={origin} value={origin}>
            {origin}
          </option>
        ))}
      </select>
    </div>
  )
}

export default FilterSelectOrigin
