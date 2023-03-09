
import GameCell, { CellType, GameCellItem } from '@/components/GameCell'
import { useEffect, useMemo } from 'react'




export class GameBoardBase {

    public cells: Array<GameCellItem> = []

    private static ROWS_AMOUNT: number = 3
    private static COLUMNS_AMOUNT: number = 3



    constructor(available: boolean) {

        this.init(available)
    }


    private init(available: boolean) {

        for (let column = 0; column < GameBoardBase.COLUMNS_AMOUNT; column++) {

            for (let row = 0; row < GameBoardBase.ROWS_AMOUNT; row++) {

                const newCell = new GameCellItem(
                    column, row, available
                )

                this.cells.push(newCell)
            }
        }
    }


    public setAvailability(available: boolean) {

        this.cells.forEach(item => item.setAvailability(available))
    }
}



interface GameBoardProps {
    available: boolean,
    isFirstPlayer: boolean
}



function GameBoard(props: GameBoardProps) {

    const { available, isFirstPlayer } = props


    const gameBoardInstance: GameBoardBase = useMemo(() => new GameBoardBase(available), [])


    const handleCellClick = (cell: GameCellItem) => (): CellType => {

        return isFirstPlayer ? CellType.x : CellType.o
    }


    useEffect(() => {

        gameBoardInstance && gameBoardInstance.setAvailability(available)

    }, [available])


    return <div className="flex flex-row flex-wrap" style={{ width: '408px' }}>

        {gameBoardInstance.cells.map((cell: GameCellItem, index) => {

            return (<GameCell
                key={`cell-item-${index}`}
                item={cell}
                onCellClick={handleCellClick(cell)}
            />)
        })}
    </div>
}



export default GameBoard
