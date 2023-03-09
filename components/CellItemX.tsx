
import CellItem, { CellItemBase } from '@/components/CellItemBase'




function CellItemX(props: CellItemBase) {

    const { active } = props


    return <CellItem>

        <div className="rounded-full w-7 h-7 bg-gradient-to-b from-orange-500 to-yellow-300">

            X
        </div>

    </CellItem>
}



export default CellItemX
