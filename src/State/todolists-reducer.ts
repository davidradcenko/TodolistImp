import {v1 as uuidv4, v4} from "uuid";
import {TodolistAPI, TodolistAPIType} from "../api/TodolistAPI";
import {Dispatch} from "redux";
import {RequestStatusType, setAppStatusAC, SetAppStatusActionType} from "./app-reducer";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;
import {handelServerNetworkError} from "../utils/error-utils";


export let todolistId1 = uuidv4()
export let todolistId2 = uuidv4()
const initialState: Array<TodolistDomainType> = []


export const todolistsRedusers = (state: Array<TodolistDomainType> = initialState, action: ActionTypes): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'Remove-Todo': {
            return state.filter(e => e.id != action.id)
        }
        case  'Add-Todo': {
            const DomainTodo:TodolistDomainType={...action.NewTodo,filter:"All",entityStatus:'idle'}
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
                return {...tl, filter:"All",entityStatus:'idle'}
            })
        }
        case 'CHENGE-TODOLIST-ENTITY-STATUS':{
            return state.map(tl=>tl.id===action.id ? {...tl,entityStatus:action.status} : tl)
        }
        default :
            return state
    }
}

//Action Creator
export const RemoveTodoAC = (id: string) => ({type: "Remove-Todo", id}) as const
export const AddTodoAC = (NewTodo: TodolistAPIType) =>({type: "Add-Todo", NewTodo}) as const
export const ChengeTitleTodoAC = (id: string, title: string) => ({type: "ChengeTitle-Todo", id, title}) as const
export const ChangeIsdoneTodoAC = (isDone: FilterType, id: string) =>({type: "Change-Isdone-Todo", isDone, id})as const
export const SetTodolistAC = (todolist: Array<TodolistAPIType>) => ({type: "SET-TODOLIST", todolist}) as const
export const chengeTodolistEntityStatusAC = (id: string, status: RequestStatusType) => ({type: "CHENGE-TODOLIST-ENTITY-STATUS",id,status}) as const

// thunks
export const fetchTodolistTC=()=>{
    return (dispatch:Dispatch<ActionTypes | SetAppStatusActionType>)=>{
        dispatch(setAppStatusAC('loading'))
        TodolistAPI.getTodolists().then(res=>{
            dispatch(SetTodolistAC(res.data))
            dispatch(setAppStatusAC('succeeded'))
        }).catch(error=>{
            handelServerNetworkError(error,dispatch)
        })
    }
}
export const deleteTodolistTC=(IdTodo:string)=>{
    return (dispatch:Dispatch<ActionTypes| SetAppStatusActionType>)=>{
        dispatch(setAppStatusAC('loading'))
        dispatch(chengeTodolistEntityStatusAC(IdTodo,'loading'))
        TodolistAPI.deleteTodolist(IdTodo).then(res=>{
            dispatch(RemoveTodoAC(IdTodo))
            dispatch(setAppStatusAC('succeeded'))
        })
    }
}
export const addTodolistTC=(title:string)=>{
    return (dispatch:Dispatch<ActionTypes | SetAppStatusActionType>)=>{
        dispatch(setAppStatusAC('loading'))
        TodolistAPI.createTodolist(title).then(res=>{
            dispatch(AddTodoAC(res.data.data.item))
            dispatch(setAppStatusAC('succeeded'))
        })
    }
}
export const ChehgeTitleTodolistTC=(id: string, title: string)=>{
    return (dispatch:Dispatch<ActionTypes>)=>{
        TodolistAPI.updateTodolist(id, title).then(res=>{
            dispatch(ChengeTitleTodoAC(id, title))
        })
    }
}

//types
export type FilterType = "All" | "Completed" | "Active";
type ActionTypes =
    | ReturnType<typeof RemoveTodoAC>
    | ReturnType<typeof AddTodoAC >
    | ReturnType<typeof ChengeTitleTodoAC >
    | ReturnType<typeof ChangeIsdoneTodoAC >
    | ReturnType<typeof SetTodolistAC>
    | ReturnType<typeof chengeTodolistEntityStatusAC>

export type TodolistDomainType = TodolistAPIType & {
    filter: FilterType,
    entityStatus: RequestStatusType
}