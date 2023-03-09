
import CellItem, { CellItemBase } from '@/components/CellItemBase'



function CellItemO(props: CellItemBase) {

    const { active } = props


    return <CellItem>

        <div className="rounded-full w-24 h-24 bg-gradient-to-b from-orange-500 to-yellow-300 flex justify-center items-center">
            O
        </div>

    </CellItem>
}



export default CellItemO
