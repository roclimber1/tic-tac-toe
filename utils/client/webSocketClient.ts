
'use client'


import { io } from 'socket.io-client'

import type { Socket } from 'socket.io-client'




export type Message = {
    author: string
    message: string
}


type OptionsCallback = (message: Message) => void


interface Options {
    callback: OptionsCallback
}



export class WebSocketIoClient {

    public socket: Socket | null = null

    private static instance: WebSocketIoClient


    private constructor(options: Options) {

        this.init(options)
    }


    private async init(options: Options) {

        const { callback } = options


        await fetch('/api/socket')

        this.socket = io()


        this.socket.on('connect', () => {

            console.debug('connected')

            this.setMessageHandler(callback)
        })
    }


    public static getInstance(options: Options): WebSocketIoClient {

        if (!WebSocketIoClient.instance) {

            WebSocketIoClient.instance = new WebSocketIoClient(options)
        }

        return WebSocketIoClient.instance
    }


    public setMessageHandler(callback: OptionsCallback) {

        this.socket && this.socket.on('newIncomingMessage', (message) => {

            callback && callback(message)
        })
    }


    public sendMessage(message: Message) {

        this.socket && this.socket.emit('createdMessage', message)
    }
}
