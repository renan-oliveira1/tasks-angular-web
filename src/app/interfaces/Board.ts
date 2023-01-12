import { BoardTask } from "./BoardTask"
import { User } from "./User"

export interface Board{
    id: string
    name: string
    tasks: BoardTask[]
    users: User[]
}