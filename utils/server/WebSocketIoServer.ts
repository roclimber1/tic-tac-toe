
import { Server } from 'socket.io'

import GameRoom from '@/utils/GameRoom'


import type { ServerOptions, Socket } from 'socket.io'
import type { GameRoomBase } from '@/utils/GameRoom'




export class WebSocketIoServer {

    public io: Server
    public socket: Socket | null = null

    private static instance: WebSocketIoServer

    private roomNumber: number = 1

    public rooms: Map<string, GameRoom> = new Map<string, GameRoom>()


    private constructor(
        public serverOptions: ServerOptions
    ) {

        this.io = new Server(this.serverOptions)

        this.init()
    }


    private init() {

        this.io.on('connection', (socket: Socket) => {

            this.socket = socket

            this.initRooms()
            this.setMessageHandler()
        })
    }


    private initRooms() {

        const roomId = GameRoom.getRoomId(this.roomNumber)


        this.socket && this.socket.join(roomId)


        const rooms = this.io.of('/').adapter.rooms

        const roomsVisitorsAmount = rooms.get(roomId)?.size


        if (!this.rooms.get(roomId)) {

            this.rooms.set(roomId, new GameRoom(this.roomNumber, rooms))
        }


        this.sendRoomsData()


        if (roomsVisitorsAmount && (roomsVisitorsAmount > 1)) {

            this.roomNumber += 1
        }
    }


    public static getInstance(serverOptions: ServerOptions): WebSocketIoServer {

        if (!WebSocketIoServer.instance) {

            WebSocketIoServer.instance = new WebSocketIoServer(serverOptions)
        }

        return WebSocketIoServer.instance
    }


    private sendRoomsData() {

        const roomId = GameRoom.getRoomId(this.roomNumber)
        const room = this.rooms.get(roomId)

        const roomData: GameRoomBase | null = room ? room?.getRoomData(this.socket?.id as string) : null


        roomData && this.io.to(roomId).emit('setRoomsData', roomData)
    }


    public setMessageHandler() {

        this.socket && this.socket.on('createdMessage', (data) => {

            const { message, roomNumber } = data
            const roomId = GameRoom.getRoomId(roomNumber)


            this.io.to(roomId).emit('newIncomingMessage', message)
        })
    }
}
