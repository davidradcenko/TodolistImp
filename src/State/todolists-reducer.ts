import {v1 as uuidv4, v4} from "uuid";
import {TodolistAPI, TodolistAPIType} from "../api/TodolistAPI";
import {Dispatch} from "redux";


export  type RemoveTodoAT = {
    type: "Remove-Todo",
    id: string
}
export  type AddTodoAT = {
    type: "Add-Todo",
    NewTodo: TodolistAPIType
}
export type ChengeTitleTodoAT = {
    type: "ChengeTitle-Todo",
    id: string,
    title: string
}
export type ChangeIsdoneTodoAT = {
    type: "Change-Isdone-Todo",
    isDone: FilterType
    id: string
}

export let todolistId1 = uuidv4()
export let todolistId2 = uuidv4()
export type FilterType = "All" | "Completed" | "Active";
type ActionTypes = ChangeIsdoneTodoAT | ChengeTitleTodoAT | AddTodoAT | RemoveTodoAT | SetTodolistAT

export  type SetTodolistAT = {
    type: "SET-TODOLIST",
    todolist: Array<TodolistAPIType>
}

export type TodolistDomainType = TodolistAPIType & {
    filter: FilterType
}
const initialState: Array<TodolistDomainType> = []


export const todolistsRedusers = (state: Array<TodolistDomainType> = initialState, action: ActionTypes): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'Remove-Todo': {
            return state.filter(e => e.id != action.id)
        }
        case  'Add-Todo': {
            const DomainTodo:TodolistDomainType={...action.NewTodo,filter:"All"}
            return [DomainTodo,...state]
        }
        case 'ChengeTitle-Todo': {
            const stateCope = [...state]
            let newT = stateCope.find(e => e.id == action.id)
            if (newT) {
                newT.title = action.title
                debugger
                // return [...stateCope,newT]
            }
            return stateCope
        }
        case 'Change-Isdone-Todo': {
            let newR = state.find(e => e.id == action.id)
            if (newR) {
                newR.filter = action.isDone
            }
            return [...state]
        }
        case 'SET-TODOLIST': {
            return action.todolist.map(tl => {
                return {...tl, filter:"All"}
            })
        }
        default :
            return state
    }
}
//Action Creator
export const RemoveTodoAC = (id: string): RemoveTodoAT => {
    return {type: "Remove-Todo", id}
}
export const AddTodoAC = (NewTodo: TodolistAPIType): AddTodoAT => {
    return {type: "Add-Todo", NewTodo}
}
export const ChengeTitleTodoAC = (id: string, title: string): ChengeTitleTodoAT => {
    return {type: "ChengeTitle-Todo", id, title}
}
export const ChangeIsdoneTodoAC = (isDone: FilterType, id: string): ChangeIsdoneTodoAT => {
    return {type: "Change-Isdone-Todo", isDone, id}
}
export const SetTodolistAC = (todolist: Array<TodolistAPIType>): SetTodolistAT => {
    return {type: "SET-TODOLIST", todolist}
}
// thunks
export const fetchTodolistTC=()=>{
    return (dispatch:Dispatch)=>{
        TodolistAPI.getTodolists().then(res=>{
            dispatch(SetTodolistAC(res.data))
        })
    }
}
export const deleteTodolistTC=(IdTodo:string)=>{
    return (dispatch:Dispatch)=>{
        TodolistAPI.deleteTodolist(IdTodo).then(res=>{
            dispatch(RemoveTodoAC(IdTodo))
        })
    }
}
export const addTodolistTC=(title:string)=>{
    return (dispatch:Dispatch)=>{
        TodolistAPI.createTodolist(title).then(res=>{
            dispatch(AddTodoAC(res.data.data.item))
        })
    }
}
export const ChehgeTitleTodolistTC=(id: string, title: string)=>{
    return (dispatch:Dispatch)=>{
        TodolistAPI.updateTodolist(id, title).then(res=>{
            dispatch(ChengeTitleTodoAC(id, title))
        })
    }
}