import React, {useState} from 'react';
import {TaskType, Todolists} from "./Todolists";
import {v1 as uuidv4} from 'uuid';
import './App.css';
import {AddItemForm} from "./AddItemForm";
import {AppBar, Box, Container, IconButton, Typography, Button, Toolbar, Grid, Paper} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {Grade} from "@mui/icons-material";

export type FilterType = "All" | "Completed" | "Active";
export type TodolistType = {
    id: string,
    title: string,
    isDone: FilterType
}
export  type TodoTasksType={
    [key:string]:Array<TaskType>
}

function App() {

    function removeTask(id: string, todolistId: string) {
        let T = tasksObj[todolistId]
        let FiltredTask = T.filter(e => id != e.id)
        tasksObj[todolistId] = FiltredTask
        SetTasksObj({...tasksObj})
    }

    function AddNewTodoTask(title: string, todolistId: string) {
        let newTodo = {id: uuidv4(), name: title, checked: false}
        let T = tasksObj[todolistId]
        let newTask = [newTodo, ...T]
        tasksObj[todolistId] = newTask
        SetTasksObj({...tasksObj})
    }

    function chengeChecked(id: string, todolistId: string) {
        let T = tasksObj[todolistId]
        let newMass = T.find(e => e.id == id)

        if (newMass) {

            newMass.checked = !newMass.checked
            SetTasksObj({...tasksObj})
        }


    }

    const ChengeTaskName=(idTodo:string,idTask:string,NewTitle:string)=>{
        debugger
        let Todo= tasksObj[idTodo]
        let task=Todo.find(e=>e.id == idTask)
        if(task){
            task.name=NewTitle
            SetTasksObj({...tasksObj})
            debugger
        }
    }

    function DeleteTodo(id: string) {
        let deleteTodo = TodolistData.filter(e => e.id !== id)
        SetTodolistData(deleteTodo)
        delete tasksObj[id]
        SetTasksObj({...tasksObj})

    }
    function chengeFilter(value: FilterType, todolistId: string) {
        let todo = TodolistData.find(tl => tl.id == todolistId)
        if (todo) {
            console.log(todo)
            todo.isDone = value
            console.log(todo)
            debugger
            SetTodolistData([...TodolistData])
            debugger
        }

    }



    let todolistId1 = uuidv4()
    let todolistId2 = uuidv4()

    let [TodolistData, SetTodolistData] = useState<Array<TodolistType>>([
        {id: todolistId1, title: "Books", isDone: "All"},
        {id: todolistId2, title: "Pets", isDone: "Active"}
    ])
    let [tasksObj, SetTasksObj] = useState<TodoTasksType>({
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
    const ChengeTitleTodo=(idTodo:string,NewTitle:string)=>{
        let todo=TodolistData.find(tl=> tl.id == idTodo)
        if(todo){
            todo.title=NewTitle
            SetTodolistData([...TodolistData])
            debugger
        }
    }
    const AddTodolistButtonProps = (title: string) => {
        let todolist: TodolistType = {id: uuidv4(), title, isDone: "All"}
        SetTodolistData([todolist, ...TodolistData])
        SetTasksObj({
            ...tasksObj,[todolist.id]:[]
        })
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
                                FilterChenge={chengeFilter}
                                FilterStatus={tl.isDone}
                                chengeChecked={chengeChecked}
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

export default App;