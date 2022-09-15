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
    FilterChenge: (param: FilterType) => void
    chengeChecked: (id: string) => void,
    AddNewTodoTask: (title: string) => void
    FilterStatus:FilterType
}

export function Todolists(props: PropsType) {

    let [ButtonAdd, SetButtonAdd] = useState("")
    let [ErrorMesage,SetErrorMessage]=useState<string | null>(null)
    const ChengeSetButtonAdd = (e: ChangeEvent<HTMLInputElement>) => {
        SetButtonAdd(e.currentTarget.value)
        SetErrorMessage(null)
    }
    const OnClikOnbutton = (e: string) => {
        if(e.trim() != ""){
            props.AddNewTodoTask(ButtonAdd)
            SetButtonAdd("")
            SetErrorMessage(null)
        }else {
            SetErrorMessage("You need to write something")
        }
    }

    const FilterAll=()=>{ props.FilterChenge("All")}
    const FilterCompleted=()=>{props.FilterChenge("Completed")}
    const FilterActive=()=>{props.FilterChenge("Active")}
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
                       className={ ErrorMesage ? "Todolist-AddTasks-input": ""}
                       value={ButtonAdd} type="text"/>
                <button onClick={() => {
                    OnClikOnbutton(ButtonAdd)
                }}>+
                </button>
              {ErrorMesage ?   <div>{ErrorMesage}</div> :''}
                <ul>
                    {
                        props.tasks.map(e =>{
                        const deleteFun=(id:string)=>{props.removeTask(e.id)}
                            return (
                                <li className={e.checked == true ? "Todolist-TasksList-ChekedTrue":""} key={e.id}>
                                    <input checked={e.checked} onClick={() => props.chengeChecked(e.id)} type="checkbox"/>
                                    <span>{e.name}</span>
                                    <button onClick={() => deleteFun(e.id)} type="button">x</button>
                                </li>
                            )
                            })
                    }
                </ul>
                <button className={props.FilterStatus == "All" ? "Todolist-button-filter":""} onClick={() => {FilterAll()}}>All</button>
                <button className={props.FilterStatus == "Active" ? "Todolist-button-filter":""} onClick={() => {FilterActive()}}>Active</button>
                <button className={props.FilterStatus == "Completed" ? "Todolist-button-filter":""} onClick={() => {FilterCompleted()}}>Completed</button>
            </div>
        </>
    )
}