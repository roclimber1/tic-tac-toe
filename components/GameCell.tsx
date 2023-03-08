
import { MouseEventHandler } from 'react'

import CellItemO from '@/components/CellItemO'
import CellItemX from '@/components/CellItemX'

import CellItem from '@/components/CellItemBase'



type Position = {
    column: number,
    row: number
}


export enum CellType {
    empty = 0,
    x = 1,
    o = 2,
    xActive = 3,
    oActive = 4
}


interface GameCellBase {
    position: Position
    type: CellType
}


export class GameCellItem implements GameCellBase {

    public position: Position
    public type: CellType


    public available: boolean


    constructor(
        column: number,
        row: number,
        available: boolean
    ) {
        this.position = { row, column }
        this.type = CellType.empty

        this.available = available
    }


    public updateType(type: CellType) {

        if (this.available) {

            this.type = type

            if (this.type != CellType.empty) {

                this.setAvailability(false)
            }
        }
    }


    public setAvailability(available: boolean) {

        this.available = available
    }
}


interface GameCellProps {
    item: GameCellItem,
    onCellClick: () => CellType
}



function GameCell(props: GameCellProps) {

    const { item, onCellClick } = props


    const handleCellClick: MouseEventHandler<HTMLDivElement> = (event) => {

        const newType: CellType = onCellClick()

        item.updateType(newType)
    }


    return <div
        onClick={handleCellClick}
    >
        {(item.type == CellType.empty) ? <CellItem /> : null}

        {(item.type == CellType.x) ? <CellItemX /> : null}
        {(item.type == CellType.o) ? <CellItemO /> : null}

        {(item.type == CellType.xActive) ? <CellItemX active /> : null}
        {(item.type == CellType.oActive) ? <CellItemO active /> : null}
    </div>
}



export default GameCell
