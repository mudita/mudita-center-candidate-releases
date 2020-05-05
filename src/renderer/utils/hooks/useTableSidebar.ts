import { useState } from "react"

const useTableSidebar = <T>() => {
  const [sidebarOpened, setSidebarVisibility] = useState<boolean>()
  const [activeRow, setActiveRow] = useState<T | undefined>()

  const openSidebar = (row: T) => {
    setActiveRow(row)
    setSidebarVisibility(true)
  }
  const closeSidebar = () => {
    setSidebarVisibility(false)
    setActiveRow(undefined)
  }

  return {
    openSidebar,
    closeSidebar,
    sidebarOpened,
    activeRow,
  }
}

export default useTableSidebar