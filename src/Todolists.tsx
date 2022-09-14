import React, {ChangeEvent, useState} from "react";
import {FilterType} from "./App";


export type TaskType = {
    id: string,
    name: string,
    checked: boolean
}

export  type PropsType = {
    tasks: Array<TaskType>,
    removeTask: (id: string) => void,
    chengeFilter: (param: FilterType) => void
    chengeChecked: (id: string) => void,
    AddNewTodoTask: (title: string) => void
}

export function Todolists(props: PropsType) {

    let [ButtonAdd, SetButtonAdd] = useState("")
    const ChengeSetButtonAdd = (e: ChangeEvent<HTMLInputElement>) => {
        SetButtonAdd(e.currentTarget.value)
    }
    const OnClikOnbutton = (e: string) => {
        props.AddNewTodoTask(ButtonAdd)
        SetButtonAdd("")
    }

    const FilterAll=()=>{ props.chengeFilter("All")}
    const FilterCompleted=()=>{props.chengeFilter("Completed")}
    const FilterActive=()=>{props.chengeFilter("Active")}
    return (
        <>
            <div>
                <h1>Todolist</h1>
                <input onKeyPress={(e) => {
                    if(e.charCode == 13){
                        OnClikOnbutton(ButtonAdd)
                    }
                }}
                       onChange={(e) => {
                           ChengeSetButtonAdd(e)
                       }}
                       value={ButtonAdd} type="text"/>
                <button onClick={() => {
                    OnClikOnbutton(ButtonAdd)
                }}>+
                </button>
                <ul>
                    {
                        props.tasks.map(e =>{
                        const deleteFun=(id:string)=>{props.removeTask(e.id)}
                            return (
                                <li key={e.id}>
                                    <input checked={e.checked} onClick={() => props.chengeChecked(e.id)} type="checkbox"/>
                                    <span>{e.name}</span>
                                    <button onClick={() => deleteFun(e.id)} type="button">x</button>
                                </li>
                            )
                            })
                    }
                </ul>
                <button onClick={() => {FilterAll()}}>All</button>
                <button onClick={() => {FilterActive()}}>Active</button>
                <button onClick={() => {FilterCompleted()}}>Completed</button>
            </div>
        </>
    )
}