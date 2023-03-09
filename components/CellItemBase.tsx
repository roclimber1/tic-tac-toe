

import type { PropsWithChildren } from 'react'


export const CELL_SIZE: number = 50




export interface CellItemBase {
    active?: boolean
}




function CellItem(props: PropsWithChildren<CellItemBase>) {

    const { children } = props



    return <div className="w-32 h-32 rounded-lg bg-orange-600 hover:bg-orange-500 cursor-pointer p-3 m-1 flex text-center justify-center items-center content-center bg-gradient-to-r from-orange-600 to-orange-500">

        {children}
    </div>
}



export default CellItem
