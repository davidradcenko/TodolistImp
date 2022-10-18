import {v1 as uuidv4, v4} from "uuid";
import {TodolistAPIType} from "../api/TodolistAPI";


export  type RemoveTodoAT={
    type:"Remove-Todo",
    id:string
}
export  type AddTodoAT={
    type:"Add-Todo",
    title:string,
    TodolistId:string
}
export type ChengeTitleTodoAT={
    type:"ChengeTitle-Todo",
    id:string,
    title:string
}
export type ChangeIsdoneTodoAT={
    type:"Change-Isdone-Todo",
    isDone:FilterType
    id:string
}

export let todolistId1 = uuidv4()
export let todolistId2 = uuidv4()
export type FilterType = "All" | "Completed" | "Active";
type ActionTypes = ChangeIsdoneTodoAT | ChengeTitleTodoAT | AddTodoAT | RemoveTodoAT


export type TodolistDomainType = TodolistAPIType & {
    filter: FilterType
}
const initialState: Array<TodolistDomainType>=[

]



export const todolistsRedusers = (state: Array<TodolistDomainType>=initialState, action: ActionTypes): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'Remove-Todo': {
            return state.filter(e=>e.id != action.id)
        }
        case  'Add-Todo':{
            return [...state,{
                id:action.TodolistId,
                title:action.title,
                filter:"All",
                addedDate:'',
                order:0
            }]
        }
        case 'ChengeTitle-Todo':{
            const stateCope=[...state]
            let newT= stateCope.find(e=> e.id == action.id)
            if(newT){
                newT.title=action.title
                debugger
                // return [...stateCope,newT]
            }
           return stateCope
        }
        case 'Change-Isdone-Todo':{
            let newR=state.find(e=>e.id==action.id)
            if(newR){
                newR.filter=action.isDone
            }
            return [...state]
        }
        default :
          return state
    }
}
export const RemoveTodoAC=(id:string):RemoveTodoAT=>{
    return {type:"Remove-Todo",id}
}
export const AddTodoAC=( title:string):AddTodoAT=>{
    return {type:"Add-Todo",title,TodolistId:v4()}
}
export const ChengeTitleTodoAC=( id:string,title:string):ChengeTitleTodoAT=>{
    return {type:"ChengeTitle-Todo",id,title}
}
export const ChangeIsdoneTodoAC=(  isDone:FilterType,id:string):ChangeIsdoneTodoAT=>{
    return {type:"Change-Isdone-Todo", isDone,id}
}