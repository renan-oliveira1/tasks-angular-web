import { User } from "./User"

export interface Task{
    id?: string,
    name: string,
    description: string,
    date: string,
    complete?: boolean,
    user?: User
}