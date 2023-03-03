
import { Server } from 'socket.io'



import type { ServerOptions, Socket } from 'socket.io'




export class WebSocketIoServer {

    public io: Server
    public socket: Socket | null = null

    private static instance: WebSocketIoServer


    private constructor(
        public serverOptions: ServerOptions
    ) {

        this.io = new Server(this.serverOptions)

        this.init()
    }


    private init() {

        this.io.on('connection', (socket: Socket) => {

            this.socket = socket

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

        socket.on('createdMessage', (message) => {

            socket.broadcast.emit('newIncomingMessage', message)
        })
    }
}
