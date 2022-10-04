import {FilterType, TodolistType, TodoTasksType} from "../App";
import {v1 as uuidv4, v4} from "uuid";
import {TaskType} from "../Todolists";
import {AddTodoAT, RemoveTodoAT, todolistId1, todolistId2} from "./todolists-reducer";


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
    cheked: boolean
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
type ActionTypes = RemoveTaskAT | AddTaskAT | ChengeTaskStatus | ChengeTaskName | RemoveTodoAT | AddTodoAT
const initialState:TodoTasksType={
    [todolistId1]: [
        {id: uuidv4(), name: "Frog", checked: false},
        {id: uuidv4(), name: "Dog", checked: true},
        {id: uuidv4(), name: "Cat", checked: false},
        {id: uuidv4(), name: "Bags", checked: true}
    ],
    [todolistId2]: [
        {id: uuidv4(), name: "Leonardo", checked: true},
        {id: uuidv4(), name: "7 age", checked: false}
    ]

}

export const tasksRedusers = (state: TodoTasksType=initialState, action: ActionTypes): TodoTasksType => {
    switch (action.type) {
        case 'Remove-Task': {
            const stateCopy = {...state}
            let todo = stateCopy[action.idTodo]
            let n = todo.filter(e => e.id != action.idTask)
            stateCopy[action.idTodo] = n
            debugger
            return {...stateCopy}
        }
        case 'Add-Task': {
            const stateCopy = {...state}
            const newTask: TaskType = {id: v4(), name: action.title, checked: false}
            let T = stateCopy[action.idTodo]
            let newTodoTasks = [newTask, ...T]
            //stateCopy[action.idTodo].push(newTask)
            stateCopy[action.idTodo] = newTodoTasks
            debugger
            return stateCopy
        }
        case 'CHENGE-TASK-STATUS': {
            let StateCopy = {...state}

            let tasks = StateCopy[action.idTodo]
            let task = tasks.find(t => t.id == action.idTask)
            if (task) {
                task.checked = action.cheked
                // StateCopy[action.idTodo][0] = task
                debugger
            }
            return StateCopy
        }
        case 'CHENGE-TASK-NAME': {
            let StateCopy = {...state}
            let tasks = state[action.idTodo]
            debugger
            let task = tasks.find(t => t.id == action.idTask)
            if (task) {
                task.name = action.name
                debugger
            }

            return StateCopy
        }
        case "Remove-Todo": {
            let stateCope = {...state}
            delete stateCope[action.id]
            return stateCope
        }
        case "Add-Todo": {
            const statyCope ={...state}
            statyCope[action.TodolistId]=[]
            return statyCope
        }
        default :
            return state
    }
}
export const RemoveTaskAC = (idTodo: string, idTask: string): RemoveTaskAT => {
    return {type: "Remove-Task", idTodo, idTask}
}
export const AddTaskAC = (idTodo: string, title: string): AddTaskAT => {
    return {type: "Add-Task", idTodo, title}
}
export const ChengeTaskCheckedAC = (idTodo: string, idTask: string, cheked: boolean): ChengeTaskStatus => {
    return {type: "CHENGE-TASK-STATUS", idTodo, idTask, cheked}
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