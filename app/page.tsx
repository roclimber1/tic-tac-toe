
import { Inter } from 'next/font/google'
import Link from 'next/link'

import styles from './page.module.css'


const inter = Inter({ subsets: ['latin'] })



export default function Home() {

    return (
        <main className={styles.main}>

            <h1 className="pb-6 text-2xl">{'Tic Tac Toe application ⚔️'}</h1>

            <Link href={'/room'}>
                <button className="rounded-md bg-orange-800 hover:bg-orange-600 p-3 m-3 text-lg">
                    Let's the battle begins 💫
                </button>
            </Link>
        </main>
    )
}
