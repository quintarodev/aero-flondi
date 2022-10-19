import type { FC } from "react"

interface FilterInputMountProps {
  onFilterInputMount: (mount: number) => void
}
const FilterInputMount: FC<FilterInputMountProps> = ({
  onFilterInputMount,
}) => {
  return (
    <div className="mb-4 flex space-x-2">
      <label>Monto iniciales</label>
      <input
        type="text"
        placeholder="Ingrese el monot"
        onChange={(e) => onFilterInputMount(parseFloat(e.target.value))}
      />
    </div>
  )
}
export default FilterInputMount
