import React from "react";
import {FilterType} from "./App";
import {AddItemForm} from "./AddItemForm";


export type TaskType = {
    id: string,
    name: string,
    checked: boolean
}

export  type PropsType = {
    id:string,
    tasks: Array<TaskType>,
    removeTask: (id: string,todolistId:string) => void,
    FilterChenge: (param: FilterType,todolistId:string) => void,
    chengeChecked: (id: string,todolistId:string) => void,
    AddNewTodoTask: (title: string,todolistId:string) => void,
    title:string,
    DeleteTodo:(id:string)=>void,
    FilterStatus: FilterType
}

export function Todolists(props: PropsType) {




    const FilterAll=()=>{ props.FilterChenge("All",props.id)}
    const FilterCompleted=()=>{props.FilterChenge("Completed",props.id)}
    const FilterActive=()=>{props.FilterChenge("Active",props.id)}

    const addTask=(title:string)=>{
        props.AddNewTodoTask(title,props.id)
    }
    return (
        <div className={"todolist"}>
                <h1>{props.title}  <button onClick={() => {props.DeleteTodo(props.id)}}>x</button></h1>

                <AddItemForm key={props.id} AddItem={addTask} />
                <ul>
                    {
                        props.tasks.map(e =>{
                        const deleteFun=(id:string)=>{props.removeTask(e.id,props.id)}
                            return (
                                <li className={e.checked == true ? "Todolist-TasksList-ChekedTrue":""} key={e.id}>
                                    <input checked={e.checked} onClick={() => props.chengeChecked(e.id,props.id)} type="checkbox"/>
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
    )
}
