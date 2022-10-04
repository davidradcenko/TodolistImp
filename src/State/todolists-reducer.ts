import {FilterType, TodolistType} from "../App";
import {v1 as uuidv4, v4} from "uuid";


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

type ActionTypes = ChangeIsdoneTodoAT | ChengeTitleTodoAT | AddTodoAT | RemoveTodoAT

const initialState: Array<TodolistType>=[
    {id: todolistId1, title: "Books", isDone: "All"},
    {id: todolistId2, title: "Pets", isDone: "Active"}
]

export const todolistsRedusers = (state: Array<TodolistType>=initialState, action: ActionTypes): Array<TodolistType> => {
    switch (action.type) {
        case 'Remove-Todo': {
            return state.filter(e=>e.id != action.id)
        }
        case  'Add-Todo':{
            return [...state,{id:action.TodolistId,title:action.title,isDone:"All"}]
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
                newR.isDone=action.isDone
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