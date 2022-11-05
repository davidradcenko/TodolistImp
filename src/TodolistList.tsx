import React, {useCallback, useEffect} from "react";
import {useSelector} from "react-redux";
import {RootState, useAppDispatch} from "./State/store";
import {
    addTodolistTC,
    ChangeIsdoneTodoAC,
    ChehgeTitleTodolistTC,
    deleteTodolistTC,
    fetchTodolistTC,
    FilterType,
    TodolistDomainType
} from "./State/todolists-reducer";
import {addTaskTC, deleteTasksTC, updateTaskStatusTC} from "./State/tasks-reducer";
import {TaskStatuses} from "./api/TodolistAPI";
import {Grid, Paper} from "@mui/material";
import {AddItemForm} from "./AddItemForm";
import {Todolists} from "./Todolists";
import {TodoTasksType} from "./AppWhisRedux";
import {Navigate} from "react-router-dom";

type TodolistListPropsType = {}
export const TodolistList: React.FC<TodolistListPropsType> = (props) => {
    const dispatch = useAppDispatch()


    const isLoggedIn = useSelector<RootState, boolean>(state => state.login.isLoginIn)
    const TodolistData = useSelector<RootState, Array<TodolistDomainType>>(state => state.todolists)
    const tasksObj = useSelector<RootState, TodoTasksType>(state => state.tasks)


    //call thunks
    useEffect(() => {
        if (!isLoggedIn){
            return
        }
        dispatch(fetchTodolistTC())
    }, [])
    const removeTask = useCallback(function (id: string, todolistId: string) {
        dispatch(deleteTasksTC(todolistId, id))
    }, [dispatch])
    const AddNewTodoTask = useCallback(function (title: string, todolistId: string) {
        dispatch(addTaskTC(todolistId, title))
    }, [dispatch])
    const ChengeTitleTodo = useCallback(function (idTodo: string, NewTitle: string) {
        dispatch(ChehgeTitleTodolistTC(idTodo, NewTitle))
    }, [dispatch])
    const ChengeTaskTitle = useCallback(function (idTodo: string, idTask: string, title: string) {
        dispatch(updateTaskStatusTC(idTodo, {title}, idTask))
    }, [dispatch])
    const DeleteTodo = useCallback(function (id: string) {
        dispatch(deleteTodolistTC(id))
    }, [dispatch])
    const chengeTaskChecked = useCallback(function (idTask: string, status: TaskStatuses, idTodo: string) {
        dispatch(updateTaskStatusTC(idTodo, {status}, idTask))
    }, [dispatch])
    const chengeTasksFilter = useCallback(function (value: FilterType, todolistId: string) {
        dispatch(ChangeIsdoneTodoAC(value, todolistId))
    }, [dispatch])
    const AddTodolistButtonProps = useCallback((title: string) => {
        dispatch(addTodolistTC(title))

    }, [dispatch])



    if (!isLoggedIn){
        return <Navigate to={"/login"}/>
    }


    return <>
        <Grid container style={{padding: "20px 0px 20px 0px"}}>
            <AddItemForm AddItem={AddTodolistButtonProps}/>
        </Grid>
        <Grid container spacing={10}>
            {TodolistData.map((tl) => {

                // get tasks
                let taskfortodolist = tasksObj[tl.id]

                return (
                    <Grid key={tl.id} item>
                        <Paper style={{padding: "10px"}}>
                            <Todolists
                                todolist={tl}
                                key={tl.id}
                                ChengeTitleTodo={ChengeTitleTodo}
                                ChengeTaskName={ChengeTaskTitle}
                                tasks={taskfortodolist}
                                removeTask={removeTask}
                                FilterChenge={chengeTasksFilter}
                                chengeChecked={chengeTaskChecked}
                                DeleteTodo={DeleteTodo}
                                AddNewTodoTask={AddNewTodoTask}/>
                        </Paper>
                    </Grid>

                )
            })}
        </Grid>

    </>
}