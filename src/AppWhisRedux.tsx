import React, {useCallback, useEffect, useReducer, useState} from 'react';
import {Todolists} from "./Todolists";
import {v1 as uuidv4} from 'uuid';
import './App.css';
import {AddItemForm} from "./AddItemForm";
import {AppBar, Box, Container, IconButton, Typography, Button, Toolbar, Grid, Paper} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {Grade} from "@mui/icons-material";
import {
    AddTodoAC,
    ChangeIsdoneTodoAC,
    ChengeTitleTodoAC, fetchTodolistTC, FilterType,
    RemoveTodoAC, SetTodolistAC, TodolistDomainType,
    todolistsRedusers
} from "./State/todolists-reducer";
import {
    AddTaskAC, addTaskTC,
    ChengeTaskCheckedAC,
    ChengeTaskTitleAC,
    deleteTasksTC,
    RemoveTaskAC,
    tasksRedusers
} from "./State/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {RootState, useAppDispatch} from "./State/store";
import {TaskStatuses, TaskType, TodolistAPI} from "./api/TodolistAPI";


export  type TodoTasksType={
    [key:string]:Array<TaskType>
}

function AppWhisRedux() {
    console.log("App is called")
    const dispatch=useAppDispatch()

    const TodolistData=useSelector<RootState,Array<TodolistDomainType>>(state => state.todolists)
    const tasksObj=useSelector<RootState,TodoTasksType>(state => state.tasks)

    const removeTask= useCallback( function (id: string, todolistId: string) {
     dispatch(deleteTasksTC(todolistId,id))
    },[dispatch])
    const AddNewTodoTask= useCallback(function (title: string, todolistId: string) {
        dispatch(addTaskTC(todolistId,title))
    },[dispatch])
    const ChengeTitleTodo= useCallback(function (idTodo:string,NewTitle:string){

        dispatch(ChengeTitleTodoAC(idTodo,NewTitle))
    },[dispatch])
    const ChengeTaskTitle= useCallback(function (idTodo:string,idTask:string,NewTitle:string){
        dispatch(ChengeTaskTitleAC(idTodo,idTask,NewTitle))
    },[dispatch])
    const DeleteTodo= useCallback(function (id: string) {
        dispatch(RemoveTodoAC(id))

    },[dispatch])
    const chengeTaskChecked= useCallback(function ( todolistId: string,status:TaskStatuses,id: string) {
        dispatch(ChengeTaskCheckedAC(id,status,todolistId))
        debugger
    },[dispatch])
    const chengeTasksFilter = useCallback(function (value: FilterType, todolistId: string) {
        dispatch(ChangeIsdoneTodoAC(value,todolistId))
    },[dispatch])
    const AddTodolistButtonProps = useCallback((title: string)=>{
        const action=AddTodoAC(title)
        dispatch(action)

    },[dispatch])
//call thunks
  useEffect(()=>{
      dispatch(fetchTodolistTC())
  },[])


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
                            <Grid key={tl.id} item >
                                <Paper style={{padding:"10px"}}>
                                    <Todolists
                                        key={tl.id}
                                        id={tl.id}
                                        ChengeTitleTodo={ChengeTitleTodo}
                                        ChengeTaskName={ChengeTaskTitle}
                                        tasks={taskfortodolist}
                                        removeTask={removeTask}
                                        FilterChenge={chengeTasksFilter}
                                        FilterStatus={tl.filter}
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