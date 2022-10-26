import axios from "axios";

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '865054b3-8839-41aa-aa3c-1dce403daa1b'
    }
}
const instance=axios.create({
    baseURL:"https://social-network.samuraijs.com/api/1.1/",
    ...settings,
})

//api
export const TodolistAPI = {
    getTodolists() {
        return instance.get<Array<TodolistAPIType>>('todo-lists');
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{ item: TodolistAPIType }>>('todo-lists', {title: title});
    },
    deleteTodolist(id: string) {
        return instance.delete<ResponseType>(`todo-lists/${id}`);
    },
    updateTodolist(id: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${id}`, {title: title});
    },
    getTasks(todolistId: string) {
        return instance.get<GetTaskRespons>(`todo-lists/${todolistId}/tasks`);
    },
    deleteTask(todolistId:string,taskId:string){
        return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`);
    },
    updateTask(tidilistId:string,taskId:string,model:updateTaskModelType){
        return instance.put<ResponseType>(`todo-lists/${tidilistId}/tasks/${taskId}`,model);
    },
    createTask(todolistId:string,taskTitle:string){
        return instance.post<ResponseType<{ item:TaskType }>>(`todo-lists/${todolistId}/tasks`,{title:taskTitle});
    }

}

//types
type GetTaskRespons = {
    error: string | null,
    totalCount:number,
    items:TaskType[]

}
export type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    data: D
}
export type TaskType={
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
export type updateTaskModelType={
    title: string
    description: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
}
export type TodolistAPIType = {
    id: string,
    title: string,
    addedDate: string,
    order: number
}

export enum TaskStatuses{
    New=0,
    InProgress=1,
    Completed=2,
    Draft=3
}
export enum TaskPriorities{
    Low=0,
    Middle=1,
    Hi=2,
    Urgently=3,
    Later=4
}