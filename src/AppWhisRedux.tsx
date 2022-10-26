import React, {useCallback, useEffect} from 'react';
import {Todolists} from "./Todolists";
import './App.css';
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, LinearProgress, Paper, Toolbar, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
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
import {useSelector} from "react-redux";
import {RootState, useAppDispatch} from "./State/store";
import {TaskStatuses, TaskType} from "./api/TodolistAPI";
import {CustomizedSnackbars} from "./ErrorSnakBar";


export  type TodoTasksType={
    [key:string]:Array<TaskType>
}

function AppWhisRedux() {
    const status=useSelector<RootState,string | null>(state => state.app.status)
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
        dispatch(ChehgeTitleTodolistTC(idTodo,NewTitle))
    },[dispatch])
    const ChengeTaskTitle= useCallback(function (idTodo:string,idTask:string,title:string){
        dispatch(updateTaskStatusTC(idTodo, {title},idTask))
    },[dispatch])
    const DeleteTodo= useCallback(function (id: string) {
        dispatch(deleteTodolistTC(id))
    },[dispatch])
    const chengeTaskChecked= useCallback(function ( idTask: string,status:TaskStatuses,idTodo: string) {
        dispatch(updateTaskStatusTC(idTodo, {status},idTask))
    },[dispatch])
    const chengeTasksFilter = useCallback(function (value: FilterType, todolistId: string) {
        dispatch(ChangeIsdoneTodoAC(value,todolistId))
    },[dispatch])
    const AddTodolistButtonProps = useCallback((title: string)=>{
        dispatch(addTodolistTC(title))

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
                { status === 'loading' &&  <LinearProgress color="secondary"/>}
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
            </Container>
            <CustomizedSnackbars/>
        </div>
    );
}

export default AppWhisRedux;