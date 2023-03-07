

export interface PlayerBase {
    id: string,
    name?: string
}


export class Player implements PlayerBase {

    public name: string = 'Alice'


    constructor(
        public id: string
    ) {}


    public setName(name: string) {

        this.name = name
    }
}


export interface GameRoomBase {
    firstPlayerIndex: number,
    id: string,
    players: Array<PlayerBase>,
    roomNumber: number
}


class GameRoom implements GameRoomBase {

    public players: Array<PlayerBase> = []
    public firstPlayerIndex: number = 0

    public id: string = ''

    static roomPrefix: string = 'tic-tac-room-'


    public static getRoomId(roomNumber: number): string {

        return `${this.roomPrefix}${roomNumber}`
    }


    constructor(
        public roomNumber: number,
        rooms: Map<string, Set<string>>
    ) {

        this.id = GameRoom.getRoomId(this.roomNumber)
        const playersSet = rooms.get(this.id)


        playersSet?.forEach((value) => {

            this.players.push(new Player(value))
        })

        this.tossUp()
    }


    private tossUp() {

        this.firstPlayerIndex = Math.round(Math.random())
    }


    public getRoomData(): GameRoomBase {

        return {
            firstPlayerIndex: this.firstPlayerIndex,
            id: this.id,
            players: this.players.map((item) => ({
                id: item.id,
                name: item.name
            })),
            roomNumber: this.roomNumber
        }
    }
}



export default GameRoom
