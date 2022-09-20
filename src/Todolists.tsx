import React from "react";
import {FilterType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";


export type TaskType = {
    id: string,
    name: string,
    checked: boolean
}

export  type PropsType = {
    id: string,
    ChengeTitleTodo: (idTodo: string, NewTitle: string) => void,
    ChengeTaskName: (idTodo: string, idTask: string, NewTitle: string) => void,
    tasks: Array<TaskType>,
    removeTask: (id: string, todolistId: string) => void,
    FilterChenge: (param: FilterType, todolistId: string) => void,
    chengeChecked: (id: string, todolistId: string) => void,
    AddNewTodoTask: (title: string, todolistId: string) => void,
    title: string,
    DeleteTodo: (id: string) => void,
    FilterStatus: FilterType
}

export function Todolists(props: PropsType) {

    const FilterAll = () => {
        props.FilterChenge("All", props.id)
    }
    const FilterCompleted = () => {
        props.FilterChenge("Completed", props.id)
    }
    const FilterActive = () => {
        props.FilterChenge("Active", props.id)
    }

    const addTask = (title: string) => {
        props.AddNewTodoTask(title, props.id)
    }
    const ChegeTitleTodo = (Newtitle: string) => {
        props.ChengeTitleTodo(props.id, Newtitle)
        debugger
    }

    return (
        <div className={"todolist"}>
            <h1>
                <EditableSpan title={props.title} ChengeTaskName={ChegeTitleTodo}/>
                <button onClick={() => {
                    props.DeleteTodo(props.id)
                }}>x
                </button>
            </h1>

            <AddItemForm key={props.id} AddItem={addTask}/>
            <ul>
                {
                    props.tasks.map(e => {
                        const deleteFun = (id: string) => {
                            props.removeTask(e.id, props.id)
                        }
                        const SaveInputChekedNameHendler = (NewName: string) => {
                            props.ChengeTaskName(props.id, e.id, NewName)
                            debugger
                        }
                        return (
                            <li className={e.checked == true ? "Todolist-TasksList-ChekedTrue" : ""} key={e.id}>
                                <input checked={e.checked} onClick={() => props.chengeChecked(e.id, props.id)}
                                       type="checkbox"/>
                                <EditableSpan ChengeTaskName={SaveInputChekedNameHendler} key={e.id} title={e.name}/>

                                <button onClick={() => deleteFun(e.id)} type="button">x</button>
                            </li>
                        )
                    })
                }
            </ul>
            <button className={props.FilterStatus == "All" ? "Todolist-button-filter" : ""} onClick={() => {
                FilterAll()
            }}>All
            </button>
            <button className={props.FilterStatus == "Active" ? "Todolist-button-filter" : ""} onClick={() => {
                FilterActive()
            }}>Active
            </button>
            <button className={props.FilterStatus == "Completed" ? "Todolist-button-filter" : ""} onClick={() => {
                FilterCompleted()
            }}>Completed
            </button>

        </div>
    )
}
