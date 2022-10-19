import React, {useCallback, useEffect} from "react";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {TaskMap} from "./TaskMap";
import {TaskStatuses, TaskType} from "./api/TodolistAPI";
import {FilterType} from "./State/todolists-reducer";
import {useAppDispatch} from "./State/store";
import {fetchTasksTC} from "./State/tasks-reducer";


export  type PropsType = {
    id: string,
    ChengeTitleTodo: (idTodo: string, NewTitle: string) => void,
    tasks: Array<TaskType>,
    removeTask: (id: string, todolistId: string) => void,
    ChengeTaskName: (idTodo: string, idTask: string, NewTitle: string) => void,
    chengeChecked: (id: string, status: TaskStatuses, todolistId: string) => void,
    FilterChenge: (param: FilterType, todolistId: string) => void,
    AddNewTodoTask: (title: string, todolistId: string) => void,
    title: string,
    DeleteTodo: (id: string) => void,
    FilterStatus: FilterType
}

export const Todolists = React.memo(function (props: PropsType) {
    console.log("Todolists is called")
    const dispatch=useAppDispatch()

    const addTask = useCallback((title: string) => {
        props.AddNewTodoTask(title, props.id)
    }, [props.AddNewTodoTask, props.id])
    const removeTodolist = () => {
        props.DeleteTodo(props.id)
    }
    const ChegeTitleTodo = useCallback((Newtitle: string) => {
        props.ChengeTitleTodo(props.id, Newtitle)
    }, [props.id, props.ChengeTitleTodo])


    const FilterAll = useCallback(() => {
        props.FilterChenge("All", props.id)
    }, [])
    const FilterCompleted = useCallback(() => {
        props.FilterChenge("Completed", props.id)
    }, [])
    const FilterActive = useCallback(() => {
        props.FilterChenge("Active", props.id)
    }, [])

    useEffect(()=>{
        dispatch(fetchTasksTC(props.id))
    },[])


    let TaskForTodolist = props.tasks
    if (props.FilterStatus === "Completed") {
        TaskForTodolist = props.tasks.filter(e => e.status == TaskStatuses.Completed)
    }
    if (props.FilterStatus === "Active") {
        TaskForTodolist = props.tasks.filter(e => e.status == TaskStatuses.New)
    }

    return (
        <div className={"todolist"}>
            <h1>
                <EditableSpan title={props.title} ChengeTaskName={ChegeTitleTodo}/>
                <IconButton onClick={removeTodolist}>
                    <Delete/>
                </IconButton>
            </h1>

            <AddItemForm key={props.id} AddItem={addTask}/>
            <div>
                {
                    TaskForTodolist.map(e => <TaskMap
                        key={e.id}
                        TodolistId={props.id}
                        ChengeTaskName={props.ChengeTaskName}
                        removeTask={props.removeTask}
                        chengeChecked={props.chengeChecked}
                        task={e}
                    />)
                }
            </div>
            <Button variant={props.FilterStatus == "All" ? "contained" : "outlined"} onClick={() => {
                FilterAll()
            }}>All
            </Button>
            <Button variant={props.FilterStatus == "Active" ? "contained" : "outlined"} onClick={() => {
                FilterActive()
            }}>Active
            </Button>
            <Button variant={props.FilterStatus == "Completed" ? "contained" : "outlined"} onClick={() => {
                FilterCompleted()
            }}>Completed
            </Button>

        </div>
    )
})

