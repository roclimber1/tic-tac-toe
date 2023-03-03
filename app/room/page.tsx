
'use client'


import { useEffect, useMemo, useRef, useState } from 'react'

import { WebSocketIoClient } from '@/utils/client/webSocketClient'


import styles from '@/app/page.module.css'




import type { Message } from '@/utils/client/webSocketClient'





export default function Home() {

    const inputRef = useRef<HTMLInputElement>()

    const [userName, setUserName] = useState<string>('')
    const [messages, setMessages] = useState<Array<Message>>([])



    const updateMessages = (message: Message) => {

        setMessages((currentMessages) => [
            ...currentMessages,
            message
        ])
    }



    const socketInstance = useMemo(() => {

        const instance: WebSocketIoClient = WebSocketIoClient.getInstance({ callback: updateMessages })

        return instance
    }, [])



    const handleClick = async () => {

        const { value } = inputRef.current || {}


        if (value) {

            const message: string = value

            socketInstance && socketInstance.sendMessage({
                author: userName,
                message
            })


            if (inputRef.current) {

                inputRef.current.value = ''
            }
        }
    }


    useEffect(() => {

        if (socketInstance) {

            setUserName(socketInstance?.socket?.id || 'Alice')
        }

    }, [socketInstance?.socket?.id])



    return (
        <main className={styles.main}>

            <h1 className="pb-6 text-2xl">{'Tic Tac Toe application ⚔️'}</h1>

            {messages?.length ? (messages.map((item: Message, index: number) => (<div
                key={`msg-${item.author}-${index}`}
                className="rounded-sm bg-lime-600 hover:bg-lime-200 p-2 m-1 text-base"
            >
                {item.author}: {item.message}
            </div>))) : null}


            <input
                className="rounded-md bg-slate-800 hover:bg-slate-700 p-3 m-3 text-lg text-cyan-50"
                ref={inputRef}
            />

            <button
                className="rounded-md bg-orange-800 hover:bg-orange-600 p-3 m-3 text-lg"
                onClick={handleClick}
            >
                Send the message 📬
            </button>

        </main>
    )
}
