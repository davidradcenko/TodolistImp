import React, {useReducer, useState} from 'react';
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
    const dispatch=useDispatch()

    const TodolistData=useSelector<AppRootState,Array<TodolistType>>(state => state.todolists)
    const tasksObj=useSelector<AppRootState,TodoTasksType>(state => state.tasks)

    function removeTask(id: string, todolistId: string) {
        dispatch(RemoveTaskAC(todolistId,id))
    }
    function AddNewTodoTask(title: string, todolistId: string) {
        dispatch(AddTaskAC(todolistId,title))
    }
    const ChengeTitleTodo=(idTodo:string,NewTitle:string)=>{

        dispatch(ChengeTitleTodoAC(idTodo,NewTitle))
    }
    const ChengeTaskName=(idTodo:string,idTask:string,NewTitle:string)=>{

        dispatch(ChengeTaskTitleAC(idTodo,idTask,NewTitle))
    }
    function DeleteTodo(id: string) {
        dispatch(RemoveTodoAC(id))

    }
    function chengeTaskChecked( todolistId: string,id: string,cheked:boolean) {

        dispatch(ChengeTaskCheckedAC(id,todolistId,cheked))
    }
    function chengeTasksFilter(value: FilterType, todolistId: string) {
        dispatch(ChangeIsdoneTodoAC(value,todolistId))
    }


    function AddTodolistButtonProps (title: string){
        debugger
        const action=AddTodoAC(title)
        dispatch(action)
        dispatch(action)
    }


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
                        if (tl.isDone == "Completed") {
                            filtrData = filtrData.filter(e => e.checked == false)
                        }
                        if (tl.isDone == "Active") {
                            filtrData = filtrData.filter(e => e.checked == true)
                        }
                        return (
                            <Grid item >
                                <Paper style={{padding:"10px"}}>
                                    <Todolists
                                        key={tl.id}
                                        id={tl.id}
                                        ChengeTitleTodo={ChengeTitleTodo}
                                        ChengeTaskName={ChengeTaskName}
                                        tasks={filtrData}
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