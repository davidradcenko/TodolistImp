import React, {useCallback, useEffect} from "react";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {TaskMap} from "./TaskMap";
import {TaskStatuses, TaskType} from "./api/TodolistAPI";
import {FilterType, TodolistDomainType} from "./State/todolists-reducer";
import {useAppDispatch} from "./State/store";
import {fetchTasksTC} from "./State/tasks-reducer";


export  type PropsType = {
    todolist:TodolistDomainType
    ChengeTitleTodo: (idTodo: string, NewTitle: string) => void,
    tasks: Array<TaskType>,
    removeTask: (id: string, todolistId: string) => void,
    ChengeTaskName: (idTodo: string, idTask: string, NewTitle: string) => void,
    chengeChecked: (id: string, status: TaskStatuses, todolistId: string) => void,
    FilterChenge: (param: FilterType, todolistId: string) => void,
    AddNewTodoTask: (title: string, todolistId: string) => void,
    DeleteTodo: (id: string) => void
}

export const Todolists = React.memo(function (props: PropsType) {
    console.log("Todolists is called")
    const dispatch=useAppDispatch()

    const addTask = useCallback((title: string) => {
        props.AddNewTodoTask(title, props.todolist.id)
    }, [props.AddNewTodoTask, props.todolist.id])
    const removeTodolist = () => {
        props.DeleteTodo(props.todolist.id)
    }
    const ChegeTitleTodo = useCallback((Newtitle: string) => {
        props.ChengeTitleTodo(props.todolist.id, Newtitle)
    }, [props.todolist.id, props.ChengeTitleTodo])


    const FilterAll = useCallback(() => {
        props.FilterChenge("All", props.todolist.id)
    }, [])
    const FilterCompleted = useCallback(() => {
        props.FilterChenge("Completed", props.todolist.id)
    }, [])
    const FilterActive = useCallback(() => {
        props.FilterChenge("Active", props.todolist.id)
    }, [])

    useEffect(()=>{
        dispatch(fetchTasksTC(props.todolist.id))
    },[])


    let TaskForTodolist = props.tasks
    if (props.todolist.filter === "Completed") {
        TaskForTodolist = props.tasks.filter(e => e.status == TaskStatuses.Completed)
    }
    if (props.todolist.filter === "Active") {
        TaskForTodolist = props.tasks.filter(e => e.status == TaskStatuses.New)
    }

    return (
        <div className={"todolist"}>
            <h1>
                <EditableSpan title={props.todolist.title} ChengeTaskName={ChegeTitleTodo}/>
                <IconButton onClick={removeTodolist} disabled={props.todolist.entityStatus === 'loading' }>
                    <Delete/>
                </IconButton>
            </h1>

            <AddItemForm key={props.todolist.id} AddItem={addTask} disabled={props.todolist.entityStatus === 'loading' }/>
            <div>
                {
                    TaskForTodolist.map(e => <TaskMap
                        key={e.id}
                        TodolistId={props.todolist.id}
                        ChengeTaskName={props.ChengeTaskName}
                        removeTask={props.removeTask}
                        chengeChecked={props.chengeChecked}
                        task={e}
                    />)
                }
            </div>
            <Button variant={props.todolist.filter == "All" ? "contained" : "outlined"} onClick={() => {
                FilterAll()
            }}>All
            </Button>
            <Button variant={props.todolist.filter == "Active" ? "contained" : "outlined"} onClick={() => {
                FilterActive()
            }}>Active
            </Button>
            <Button variant={props.todolist.filter == "Completed" ? "contained" : "outlined"} onClick={() => {
                FilterCompleted()
            }}>Completed
            </Button>

        </div>
    )
})

