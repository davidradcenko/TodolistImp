import React, {useReducer, useState} from 'react';
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
    ChengeTitleTodoAC, FilterType,
    RemoveTodoAC,
    todolistsRedusers
} from "./State/todolists-reducer";
import {AddTaskAC, ChengeTaskCheckedAC, ChengeTaskTitleAC, RemoveTaskAC, tasksRedusers} from "./State/tasks-reducer";
import {TaskPriorities, TaskStatuses, TaskType} from "./api/TodolistAPI";

export  type TodoTasksType={
    [key:string]:Array<TaskType>
}

function AppWhisReducer() {
    let todolistId1 = uuidv4()
    let todolistId2 = uuidv4()

    let [TodolistData,dispadchTodo] = useReducer(todolistsRedusers,[
        {id: todolistId1, title: "Books", filter: "All",order:0,addedDate:''},
        {id: todolistId2, title: "Pets", filter: "All",order:0,addedDate:''}
    ])
    let [tasksObj,dispadchTasks] = useReducer(tasksRedusers,{
        [todolistId1]: [
            {id: uuidv4(), title: "Frog1", status:TaskStatuses.Completed,todoListId:todolistId1,startDate:'',deadline:'',addedDate:'',order:0,priority:TaskPriorities.Low,description:''},
            {id: uuidv4(), title: "Frog2", status:TaskStatuses.Completed,todoListId:todolistId1,startDate:'',deadline:'',addedDate:'',order:0,priority:TaskPriorities.Low,description:''},
            {id: uuidv4(), title: "Frog3", status:TaskStatuses.Completed,todoListId:todolistId1,startDate:'',deadline:'',addedDate:'',order:0,priority:TaskPriorities.Low,description:''}

        ],
        [todolistId2]: [
            {id: uuidv4(), title: "Frog4", status:TaskStatuses.Completed,todoListId:todolistId2,startDate:'',deadline:'',addedDate:'',order:0,priority:TaskPriorities.Low,description:''},
            {id: uuidv4(), title: "Frog5", status:TaskStatuses.Completed,todoListId:todolistId2,startDate:'',deadline:'',addedDate:'',order:0,priority:TaskPriorities.Low,description:''}
        ]

    })

    function removeTask(id: string, todolistId: string) {
           dispadchTasks(RemoveTaskAC(todolistId,id))
    }
    function AddNewTodoTask(title: string, todolistId: string) {
        //dispadchTasks(AddTaskAC(todolistId,title))
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
    function chengeTaskChecked( todolistId: string,status:TaskStatuses,id: string) {

        dispadchTasks(ChengeTaskCheckedAC(id,status,todolistId))
    }
    function chengeTasksFilter(value: FilterType, todolistId: string) {
       dispadchTodo(ChangeIsdoneTodoAC(value,todolistId))
    }


    function AddTodolistButtonProps (title: string){
        debugger
        const action=AddTodoAC(title)
        dispadchTasks(action)
        dispadchTodo(action)
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
                        if (tl.filter == "Completed") {
                            filtrData = filtrData.filter(e => e.status == TaskStatuses.Completed)
                        }
                        if (tl.filter == "Active") {
                            filtrData = filtrData.filter(e => e.status == TaskStatuses.New)
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

export default AppWhisReducer;