import React, {useCallback, useEffect} from 'react';
import './App.css';
import {AppBar, Button, Container, Grid, IconButton, LinearProgress, Paper, Toolbar, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {TaskStatuses, TaskType} from "./api/TodolistAPI";
import {CustomizedSnackbars} from "./ErrorSnakBar";
import {TodolistList} from "./TodolistList";


export  type TodoTasksType={
    [key:string]:Array<TaskType>
}

function AppWhisRedux() {

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
                <TodolistList/>
            </Container>
            <CustomizedSnackbars/>
        </div>

    );
}



export default AppWhisRedux;