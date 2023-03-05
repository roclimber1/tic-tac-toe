
import { Server } from 'socket.io'



import type { ServerOptions, Socket } from 'socket.io'




export class WebSocketIoServer {

    public io: Server
    public socket: Socket | null = null

    private static instance: WebSocketIoServer

    private roomNumber: number = 1


    private constructor(
        public serverOptions: ServerOptions
    ) {

        this.io = new Server(this.serverOptions)

        this.init()
    }


    private init() {

        this.io.on('connection', (socket: Socket) => {

            this.socket = socket


            this.socket.join(`tic-tac-room-${this.roomNumber}`)


            const rooms = this.io.of('/').adapter.rooms

            const roomsVisitorsAmount = rooms.get(`tic-tac-room-${this.roomNumber}`)?.size


            this.io.to(`tic-tac-room-${this.roomNumber}`).emit('newIncomingMessage', {
                message: 'hi, there',
                author: socket.id
            })

            this.io.to(`tic-tac-room-${this.roomNumber}`).emit('setRoomNumber', { roomNumber: this.roomNumber })


            if (roomsVisitorsAmount && (roomsVisitorsAmount > 1)) {

                this.roomNumber += 1
            }


            this.setMessageHandler(socket)

            console.debug(socket.id)
        })
    }


    public static getInstance(serverOptions: ServerOptions): WebSocketIoServer {

        if (!WebSocketIoServer.instance) {

            WebSocketIoServer.instance = new WebSocketIoServer(serverOptions)
        }

        return WebSocketIoServer.instance
    }


    public setMessageHandler(socket: Socket) {

        socket.on('createdMessage', (data) => {

            const { message, roomNumber } = data

            this.io.to(`tic-tac-room-${roomNumber}`).emit('newIncomingMessage', message)
        })
    }
}
