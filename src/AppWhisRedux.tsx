import React, {useCallback, useReducer, useState} from 'react';
import {TaskType, Todolists} from "./Todolists";
import {v1 as uuidv4} from 'uuid';
import './App.css';
import {AddItemForm} from "./AddItemForm";
import {AppBar, Box, Container, IconButton, Typography, Button, Toolbar, Grid, Paper} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {Grade} from "@mui/icons-material";
import {
    AddTodoAC,
    ChangeIsdoneTodoAC,
    ChengeTitleTodoAC,
    RemoveTodoAC,
    todolistsRedusers
} from "./State/todolists-reducer";
import {AddTaskAC, ChengeTaskCheckedAC, ChengeTaskTitleAC, RemoveTaskAC, tasksRedusers} from "./State/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./State/store";

export type FilterType = "All" | "Completed" | "Active";

export type TodolistType = {
    id: string,
    title: string,
    isDone: FilterType
}
export  type TodoTasksType={
    [key:string]:Array<TaskType>
}

function AppWhisRedux() {
    console.log("App is called")
    const dispatch=useDispatch()

    const TodolistData=useSelector<AppRootState,Array<TodolistType>>(state => state.todolists)
    const tasksObj=useSelector<AppRootState,TodoTasksType>(state => state.tasks)

    const removeTask= useCallback( function (id: string, todolistId: string) {
        dispatch(RemoveTaskAC(todolistId,id))
    },[dispatch])
    const AddNewTodoTask= useCallback(function (title: string, todolistId: string) {
        dispatch(AddTaskAC(todolistId,title))
    },[dispatch])
    const ChengeTitleTodo= useCallback(function (idTodo:string,NewTitle:string){

        dispatch(ChengeTitleTodoAC(idTodo,NewTitle))
    },[dispatch])
    const ChengeTaskName= useCallback(function (idTodo:string,idTask:string,NewTitle:string){

        dispatch(ChengeTaskTitleAC(idTodo,idTask,NewTitle))
    },[dispatch])
    const DeleteTodo= useCallback(function (id: string) {
        dispatch(RemoveTodoAC(id))

    },[dispatch])
    const chengeTaskChecked= useCallback(function ( todolistId: string,id: string,cheked:boolean) {

        dispatch(ChengeTaskCheckedAC(id,todolistId,cheked))
    },[dispatch])
    const chengeTasksFilter = useCallback(function (value: FilterType, todolistId: string) {
        dispatch(ChangeIsdoneTodoAC(value,todolistId))
    },[dispatch])


    const AddTodolistButtonProps = useCallback((title: string)=>{
        const action=AddTodoAC(title)
        dispatch(action)

    },[dispatch])


    return (
        <div className="App">

            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding:"20px 0px 20px 0px"}}>
                    <AddItemForm AddItem={AddTodolistButtonProps}/>
                </Grid>
                <Grid container spacing={10}>
                    {TodolistData.map((tl) => {

                        let filtrData = tasksObj[tl.id]
                        let taskfortodolist=filtrData

                        return (
                            <Grid item >
                                <Paper style={{padding:"10px"}}>
                                    <Todolists
                                        key={tl.id}
                                        id={tl.id}
                                        ChengeTitleTodo={ChengeTitleTodo}
                                        ChengeTaskName={ChengeTaskName}
                                        tasks={taskfortodolist}
                                        removeTask={removeTask}
                                        FilterChenge={chengeTasksFilter}
                                        FilterStatus={tl.isDone}
                                        chengeChecked={chengeTaskChecked}
                                        title={tl.title}
                                        DeleteTodo={DeleteTodo}
                                        AddNewTodoTask={AddNewTodoTask}/>
                                </Paper>
                            </Grid>

                        )
                    })}
                </Grid>
            </Container>
        </div>
    );
}

export default AppWhisRedux;