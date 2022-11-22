import { Task } from "./Task"
import { User } from "./User"

export interface Board{
    id: string
    name: string
    tasks: Task[]
    users: User[]
}