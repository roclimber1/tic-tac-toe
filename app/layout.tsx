import './globals.css'


import type { ReactNode } from 'react'



export const metadata = {
    title: 'Tic Tac Toe',
    description: 'Tic Tac Toe game with Next.js 13 and Socket.io'
}


interface RootLayoutProps {
    children: ReactNode
}



export default function RootLayout({ children }: RootLayoutProps) {

    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    )
}
