import React, {useState} from 'react';
import {Todolists} from "./Todolists";
import {v1 as uuidv4} from 'uuid';
import './App.css';
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, LinearProgress, Paper, Toolbar, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {TaskPriorities, TaskStatuses, TaskType} from "./api/TodolistAPI";
import {FilterType, TodolistDomainType} from "./State/todolists-reducer";


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
        let newTodo = {id: uuidv4(), title: title, status:TaskStatuses.New,todoListId:todolistId,startDate:'',deadline:'',addedDate:'',order:0,priority:TaskPriorities.Low,description:''}
            let T = tasksObj[todolistId]
        let newTask = [newTodo, ...T]
        tasksObj[todolistId] = newTask
        SetTasksObj({...tasksObj})
    }
    function chengeChecked(id: string, status:TaskStatuses, todolistId: string) {
        let T = tasksObj[todolistId]
        let newMass = T.find(e => e.id == id)
        if (newMass) {
            newMass.status = status
            SetTasksObj({...tasksObj})
        }


    }
    const ChengeTaskName=(idTodo:string,idTask:string,NewTitle:string)=>{
        debugger
        let Todo= tasksObj[idTodo]
        let task=Todo.find(e=>e.id == idTask)
        if(task){
            task.title=NewTitle
            SetTasksObj({...tasksObj})

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
            todo.filter = value
            console.log(todo)
            debugger
            SetTodolistData([...TodolistData])
            debugger
        }

    }



    let todolistId1 = uuidv4()
    let todolistId2 = uuidv4()

    let [TodolistData, SetTodolistData] = useState<Array<TodolistDomainType>>([
        {id: todolistId1, title: "Books", filter: "All",order:0,addedDate:'',entityStatus:"idle"},
        {id: todolistId2, title: "Pets", filter: "All",order:0,addedDate:'',entityStatus:"idle"}
    ])
    let [tasksObj, SetTasksObj] = useState<TodoTasksType>({
        [todolistId1]: [
            {id: uuidv4(), title: "Frog1", status:TaskStatuses.Completed,todoListId:todolistId1,startDate:'',deadline:'',addedDate:'',order:0,priority:TaskPriorities.Low,description:''},
            {id: uuidv4(), title: "Frog2", status:TaskStatuses.Completed,todoListId:todolistId1,startDate:'',deadline:'',addedDate:'',order:0,priority:TaskPriorities.Low,description:''},
            {id: uuidv4(), title: "Frog3", status:TaskStatuses.Completed,todoListId:todolistId1,startDate:'',deadline:'',addedDate:'',order:0,priority:TaskPriorities.Low,description:''}
        ],
        [todolistId2]: [
            {id: uuidv4(), title: "Frog4", status:TaskStatuses.Completed,todoListId:todolistId2,startDate:'',deadline:'',addedDate:'',order:0,priority:TaskPriorities.Low,description:''},
            {id: uuidv4(), title: "Frog5", status:TaskStatuses.Completed,todoListId:todolistId2,startDate:'',deadline:'',addedDate:'',order:0,priority:TaskPriorities.Low,description:''},

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
        let generatId = uuidv4()
        let todolist: TodolistDomainType =  {id: generatId, title: title, filter: "All",order:0,addedDate:'',entityStatus:"idle"}
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
                <LinearProgress color="secondary" />
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
                                todolist={tl}
                                key={tl.id}
                                ChengeTitleTodo={ChengeTitleTodo}
                                ChengeTaskName={ChengeTaskName}
                                tasks={filtrData}
                                removeTask={removeTask}
                                FilterChenge={chengeFilter}
                                chengeChecked={chengeChecked}
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