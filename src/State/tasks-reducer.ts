import {FilterType, TodolistType, TodoTasksType} from "../App";
import {v4} from "uuid";
import {TaskType} from "../Todolists";
import {RemoveTodoAT} from "./todolists-reducer";


export  type RemoveTaskAT = {
    type: "Remove-Task",
    idTodo: string,
    idTask: string
}
export  type AddTaskAT = {
    type: "Add-Task",
    title: string,
    idTodo: string
}
export type ChengeTaskStatus = {
    type: "CHENGE-TASK-STATUS",
    idTodo: string,
    idTask: string,
}
export type ChengeTaskName = {
    type: "CHENGE-TASK-NAME",
    idTodo: string,
    idTask: string,
    name: string

}
// export type ChengeTitleTodoAT={
//     type:"ChengeTitle-Todo",
//     id:string,
//     title:string
// }
// export type ChangeIsdoneTodoAT={
//     type:"Change-Isdone-Todo",
//     isDone:FilterType
//     id:string
// }
//
type ActionTypes = RemoveTaskAT | AddTaskAT | ChengeTaskStatus | ChengeTaskName | RemoveTodoAT

export const tasksRedusers = (state: TodoTasksType, action: ActionTypes): TodoTasksType => {
    switch (action.type) {
        case 'Remove-Task': {
            const stateCopy = {...state}
            let todo = stateCopy[action.idTodo]
            let n = todo.filter(e => e.id != action.idTask)
            stateCopy[action.idTodo] = n
            return {...stateCopy}
        }
        case 'Add-Task': {
            const stateCopy = {...state}
            const newTask: TaskType = {id: v4(), name: action.title, checked: false}
            stateCopy[action.idTodo].push(newTask)
            return stateCopy
        }
        case 'CHENGE-TASK-STATUS': {
            let StateCopy = {...state}
            let tasks = StateCopy[action.idTodo]
            let task = tasks.find(t => t.id == action.idTask)
            if (task) {
              task.checked  = !task.checked
                StateCopy[action.idTodo][0]=task
            }
            return {...StateCopy}
        }
        case 'CHENGE-TASK-NAME': {
            let StateCopy = {...state}
            let tasks = state[action.idTodo]
            let task = tasks.find(t => t.id == action.idTask)
            if (task) {
                task.name = action.name
            }

            return StateCopy
        }
        case "Remove-Todo":{
            let stateCope={...state}
            delete stateCope[action.id]
            return stateCope
        }
        default :
            throw new Error("I dont`t understand that action type")
    }
}
export const RemoveTaskAC = (idTodo: string, idTask: string): RemoveTaskAT => {
    return {type: "Remove-Task", idTodo, idTask}
}
export const AddTaskAC = (idTodo: string, title: string): AddTaskAT => {
    return {type: "Add-Task", idTodo, title}
}
export const ChengeTaskStatusAC = (idTodo: string, idTask: string): ChengeTaskStatus => {
    return {type: "CHENGE-TASK-STATUS", idTodo, idTask}
}
export const ChengeTaskTitleAC = (idTodo: string, idTask: string, name: string): ChengeTaskName => {
    return {type: "CHENGE-TASK-NAME", idTodo, idTask, name}
}

// export const ChengeTitleTodoAC=( id:string,title:string):ChengeTitleTodoAT=>{
//     return {type:"ChengeTitle-Todo",id,title}
// }
// export const ChangeIsdoneTodoAC=(  isDone:FilterType,id:string):ChangeIsdoneTodoAT=>{
//     return {type:"Change-Isdone-Todo", isDone,id}
// }