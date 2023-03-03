
import { WebSocketIoServer } from '@/utils/server/webSocket'


import type { NextApiRequest, NextApiResponse } from 'next'




export default function handler(req: NextApiRequest, res: NextApiResponse) {

    const instance: WebSocketIoServer = WebSocketIoServer.getInstance(res.socket.server)

    res.socket.server.io = instance.io


    res.end()
}
