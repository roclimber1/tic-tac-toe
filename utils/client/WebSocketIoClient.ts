
'use client'


import { io } from 'socket.io-client'

import type { Socket } from 'socket.io-client'
import type { GameRoomBase } from '@/utils/GameRoom'




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
    public roomConfig: GameRoomBase

    private static instance: WebSocketIoClient


    private constructor(options: Options) {

        this.init(options)
    }


    private async init(options: Options) {

        const { callback } = options


        await fetch('/api/socket')

        this.socket = io()


        this.socket.on('connect', () => {

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

        this.socket && this.socket.on('newIncomingMessage', (message: Message) => {

            callback && callback(message)
        })


        this.socket && this.socket.on('setRoomsData', (room: GameRoomBase) => {

            this.roomConfig = room
        })
    }


    public sendMessage(message: Message) {

        const { roomNumber } = this.roomConfig


        this.socket && this.socket.emit('createdMessage', {
            message,
            roomNumber
        })
    }
}
