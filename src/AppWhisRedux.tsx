import React, {useCallback, useEffect} from 'react';
import './App.css';
import {
    AppBar,
    Button,
    CircularProgress,
    Container,
    Grid,
    IconButton,
    LinearProgress,
    Paper,
    Toolbar,
    Typography
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {TaskStatuses, TaskType} from "./api/TodolistAPI";
import {CustomizedSnackbars} from "./ErrorSnakBar";
import {TodolistList} from "./TodolistList";

import {Login} from "./Login/Login";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState, useAppDispatch} from "./State/store";
import {initializeAppTC} from "./State/app-reducer";



export  type TodoTasksType = {
    [key: string]: Array<TaskType>
}

function AppWhisRedux() {
    const dispatch = useAppDispatch()
    const isInitialized = useSelector<RootState, boolean>(state => state.app.initialized)

    useEffect(()=>{
        dispatch(initializeAppTC())
    },[])

if (!isInitialized){
    return <div style={{position:"fixed",top:'30%',textAlign:"center",width:'100%'}}>
        <CircularProgress />
    </div>
}

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
                        <Route path="/" element={ <TodolistList/>}/>
                        <Route  path="login" element={ <Login/> }/>

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