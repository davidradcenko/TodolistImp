import {FilterType, TodolistType} from "../App";
import {v4} from "uuid";


export  type RemoveTodoAT={
    type:"Remove-Todo",
    id:string
}
export  type AddTodoAT={
    type:"Add-Todo",
    title:string
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

type ActionTypes = ChangeIsdoneTodoAT | ChengeTitleTodoAT | AddTodoAT | RemoveTodoAT

export const todolistsRedusers = (state: Array<TodolistType>, action: ActionTypes): Array<TodolistType> => {
    switch (action.type) {
        case 'Remove-Todo': {
            return state.filter(e=>e.id != action.id)
        }
        case  'Add-Todo':{
            return [...state,{id:"fefe",title:action.title,isDone:"All"}]
        }
        case 'ChengeTitle-Todo':{
            let newT=state.find(e=> e.id == action.id)
            if(newT){
                newT.title=action.title
                return [...state,newT]
            }
           return state
        }
        case 'Change-Isdone-Todo':{
            let newR=state.find(e=>e.id==action.id)
            if(newR){
                newR.isDone=action.isDone
            }
            return [...state]
        }
        default :
            throw new Error("I dont`t understand that action type")
    }
}
export const RemoveTodoAC=(id:string):RemoveTodoAT=>{
    return {type:"Remove-Todo",id}
}
export const AddTodoAC=( title:string):AddTodoAT=>{
    return {type:"Add-Todo",title}
}
export const ChengeTitleTodoAC=( id:string,title:string):ChengeTitleTodoAT=>{
    return {type:"ChengeTitle-Todo",id,title}
}
export const ChangeIsdoneTodoAC=(  isDone:FilterType,id:string):ChangeIsdoneTodoAT=>{
    return {type:"Change-Isdone-Todo", isDone,id}
}