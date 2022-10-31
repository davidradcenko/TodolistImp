import React, {useCallback, useEffect} from 'react';
import './App.css';
import {AppBar, Button, Container, Grid, IconButton, LinearProgress, Paper, Toolbar, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {TaskStatuses, TaskType} from "./api/TodolistAPI";
import {CustomizedSnackbars} from "./ErrorSnakBar";
import {TodolistList} from "./TodolistList";

import {Login} from "./Login/Login";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";



export  type TodoTasksType = {
    [key: string]: Array<TaskType>
}

function AppWhisRedux() {


    return (
        <BrowserRouter>
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
                    {status === 'loading' && <LinearProgress color="secondary"/>}
                </AppBar>
                <Container fixed>
                    <Routes>
                        <Route  path="/" element={ <Login/> }/>
                        <Route path="login" element={ <TodolistList/>}/>

                        <Route path="/404" element={<h1>404. Page not found</h1> }/>
                        <Route path="*" element={<Navigate to="/404"/>}/>
                    </Routes>
                </Container>
                <CustomizedSnackbars/>
            </div>
        </BrowserRouter>
    );
}


export default AppWhisRedux;