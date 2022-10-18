import {TodoTasksType} from "../App";
import {v1 as uuidv4, v4} from "uuid";
import {AddTodoAT, RemoveTodoAT, todolistId1, todolistId2} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses, TaskType} from "../api/TodolistAPI";


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
    status: TaskStatuses
}
export type ChengeTaskName = {
    type: "CHENGE-TASK-TITLE",
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
        {id: uuidv4(), title: "Frog1", status:TaskStatuses.Completed,todoListId:todolistId1,startDate:'',deadline:'',addedDate:'',order:0,priority:TaskPriorities.Low,description:''},
        {id: uuidv4(), title: "Frog2", status:TaskStatuses.Completed,todoListId:todolistId1,startDate:'',deadline:'',addedDate:'',order:0,priority:TaskPriorities.Low,description:''},
        {id: uuidv4(), title: "Frog3", status:TaskStatuses.Completed,todoListId:todolistId1,startDate:'',deadline:'',addedDate:'',order:0,priority:TaskPriorities.Low,description:''}
    ],
    [todolistId2]: [
        {id: uuidv4(), title: "Frog4", status:TaskStatuses.Completed,todoListId:todolistId2,startDate:'',deadline:'',addedDate:'',order:0,priority:TaskPriorities.Low,description:''},
        {id: uuidv4(), title: "Frog5", status:TaskStatuses.Completed,todoListId:todolistId2,startDate:'',deadline:'',addedDate:'',order:0,priority:TaskPriorities.Low,description:''},

    ]

}

export const tasksRedusers = (state: TodoTasksType=initialState, action: ActionTypes): TodoTasksType => {
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
            const newTask: TaskType = {id: v4(), title: action.title, status: TaskStatuses.New,addedDate:"",deadline:"",description:"",order:0,priority:TaskPriorities.Low,startDate:"",todoListId:action.idTodo}
            let T = stateCopy[action.idTodo]
            let newTodoTasks = [newTask, ...T]
            //stateCopy[action.idTodo].push(newTask)
            stateCopy[action.idTodo] = newTodoTasks

            return stateCopy
        }
        case 'CHENGE-TASK-STATUS': {
            let stateCope= {...state}
            let Todolisttasks = stateCope[action.idTodo]
            stateCope[action.idTodo] = Todolisttasks.map(t=>t.id === action.idTask ? {...t,status:action.status} : t)

            // let task = tasks.find(t => t.id == action.idTask)
            // if (task) {
            //     task.checked = action.cheked
            // }
            // state[action.idTodo] = [...tasks]
            return stateCope
        }
        case 'CHENGE-TASK-TITLE': {

            let stateCope= {...state}
            let Todolisttasks = stateCope[action.idTodo]
            stateCope[action.idTodo] = Todolisttasks.map(t=>t.id === action.idTask ? {...t,title:action.name} : t)
            // let tasks = state[action.idTodo]
            //
            // let task = tasks.find(t => t.id == action.idTask)
            // if (task) {
            //     task.name = action.name
            // }
            // state[action.idTodo]=[...tasks]
            return stateCope
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
export const ChengeTaskCheckedAC = (idTodo: string, status: TaskStatuses, idTask: string): ChengeTaskStatus => {
    return {type: "CHENGE-TASK-STATUS", idTodo, status, idTask}
}
export const ChengeTaskTitleAC = (idTodo: string, idTask: string, name: string): ChengeTaskName => {
    return {type: "CHENGE-TASK-TITLE", idTodo, idTask, name}
}

// export const ChengeTitleTodoAC=( id:string,title:string):ChengeTitleTodoAT=>{
//     return {type:"ChengeTitle-Todo",id,title}
// }
// export const ChangeIsdoneTodoAC=(  isDone:FilterType,id:string):ChangeIsdoneTodoAT=>{
//     return {type:"Change-Isdone-Todo", isDone,id}
// }