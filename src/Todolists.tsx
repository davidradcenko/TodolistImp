import React from "react";
import {FilterType} from "./App";


export type TaskType = {
    id: number,
    name: string,
    checked: boolean
}

export  type PropsType = {
    tasks: Array<TaskType>,
    removeTask: (id: number) => void,
    chengeFilter: (param: FilterType) => void
}

export function Todolists(props: PropsType) {
    return (
        <>
            <div>
                <h1>Todolist</h1>
                <ul>
                    {
                        props.tasks.map(e => <li key={e.id}>
                                <input checked={e.checked} type="checkbox"/><span>{e.name}</span>
                                <button onClick={() => props.removeTask(e.id)} type="button" value={"Delete"}/>
                            </li>
                        )
                    }
                </ul>
                <button onClick={() => {
                    props.chengeFilter("All")
                }}>All
                </button>
                <button onClick={() => {
                    props.chengeFilter("Active")
                }}>Active
                </button>
                <button onClick={() => {
                    props.chengeFilter("Completed")
                }}>Completed
                </button>
            </div>
        </>
    )
}