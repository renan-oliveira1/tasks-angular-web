import { TaskStatus } from "./TaskStatus"

export interface BoardTask{
    id: string,
    name: string,
    description: string,
    status: TaskStatus
}