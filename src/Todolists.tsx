import React from "react";
import {FilterType} from "./AppWhisReducer";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {IconButton, Button, Checkbox} from "@mui/material";
import {CheckBox, Delete} from "@mui/icons-material";



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
                <IconButton onClick={() => {props.DeleteTodo(props.id)}} >
                    <Delete/>
                </IconButton>
            </h1>

            <AddItemForm key={props.id} AddItem={addTask}/>
            <div>
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
                            <div className={e.checked == true ? "Todolist-TasksList-ChekedTrue" : ""} key={e.id}>
                                <Checkbox checked={e.checked} onClick={() => props.chengeChecked(e.id, props.id)}/>

                                <EditableSpan ChengeTaskName={SaveInputChekedNameHendler} key={e.id} title={e.name}/>

                                <IconButton onClick={() => deleteFun(e.id)} >
                                    <Delete />
                                </IconButton>
                            </div>
                        )
                    })
                }
            </div>
            <Button variant={props.FilterStatus == "All" ? "contained" : "outlined"}  onClick={() => {
                FilterAll()
            }}>All
            </Button>
            <Button variant={props.FilterStatus == "Active" ? "contained" : "outlined"}  onClick={() => {
                FilterActive()
            }}>Active
            </Button>
            <Button variant={props.FilterStatus == "Completed" ? "contained" : "outlined"}  onClick={() => {
                FilterCompleted()
            }}>Completed
            </Button>

        </div>
    )
}
