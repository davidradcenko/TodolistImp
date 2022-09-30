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

export type FilterType = "All" | "Completed" | "Active";
export type TodolistType = {
    id: string,
    title: string,
    isDone: FilterType
}
export  type TodoTasksType={
    [key:string]:Array<TaskType>
}

function AppWhisReducer() {
    let todolistId1 = uuidv4()
    let todolistId2 = uuidv4()

    let [TodolistData,dispadchTodo] = useReducer(todolistsRedusers,[
        {id: todolistId1, title: "Books", isDone: "All"},
        {id: todolistId2, title: "Pets", isDone: "Active"}
    ])
    let [tasksObj,dispadchTasks] = useReducer(tasksRedusers,{
        [todolistId1]: [
            {id: uuidv4(), name: "Frog", checked: false},
            {id: uuidv4(), name: "Dog", checked: true},
            {id: uuidv4(), name: "Cat", checked: false},
            {id: uuidv4(), name: "Bags", checked: true}
        ],
        [todolistId2]: [
            {id: uuidv4(), name: "Leonardo", checked: true},
            {id: uuidv4(), name: "7 age", checked: false}
        ]

    })

    function removeTask(id: string, todolistId: string) {
           dispadchTasks(RemoveTaskAC(todolistId,id))
    }
    function AddNewTodoTask(title: string, todolistId: string) {
        dispadchTasks(AddTaskAC(todolistId,title))
    }
    const ChengeTitleTodo=(idTodo:string,NewTitle:string)=>{

        dispadchTodo(ChengeTitleTodoAC(idTodo,NewTitle))
    }
    const ChengeTaskName=(idTodo:string,idTask:string,NewTitle:string)=>{

        dispadchTasks(ChengeTaskTitleAC(idTodo,idTask,NewTitle))
    }
    function DeleteTodo(id: string) {
        dispadchTodo(RemoveTodoAC(id))

    }
    function chengeTaskChecked( todolistId: string,id: string,cheked:boolean) {

        dispadchTasks(ChengeTaskCheckedAC(id,todolistId,cheked))
    }
    function chengeTasksFilter(value: FilterType, todolistId: string) {
       dispadchTodo(ChangeIsdoneTodoAC(value,todolistId))
    }


    function AddTodolistButtonProps (title: string){
        debugger
        dispadchTodo(AddTodoAC(title))
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

export default AppWhisReducer;