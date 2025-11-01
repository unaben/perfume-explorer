import { Dispatch, SetStateAction } from "react"
import { DisplayItem } from "../../types"

export type IPerfumeTableGridProps = {
    data: DisplayItem[]
    setToggleScreen: Dispatch<SetStateAction<"display" | "details">>
    setPerfumeCode: Dispatch<SetStateAction<string>>
} 