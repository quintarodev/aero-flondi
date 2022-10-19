import type { FC } from "react"

interface buttonProps {}
const Button: FC = () => {
  return (
    <button
      type="submit"
      className="bg-indigo-600 py-2 px-4 rounded-lg text-white text-lg font-bold hover:bg-indigo-500 transition-colors mt-4"
    >
      Buscar
    </button>
  )
}
export default Button
