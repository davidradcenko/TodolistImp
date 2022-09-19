import React, {useState} from 'react';
import {TaskType, Todolists} from "./Todolists";
import {v1 as uuidv4} from 'uuid';
import './App.css';
import {AddItemForm} from "./AddItemForm";

export type FilterType = "All" | "Completed" | "Active";
type TodolistType = {
    id: string,
    title: string,
    isDone: FilterType
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
    let [tasksObj, SetTasksObj] = useState({
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
    const AddTodolistButtonProps = (title: string) => {
        let todolist: TodolistType = {id: uuidv4(), title, isDone: "All"}
        SetTodolistData([todolist, ...TodolistData])
        SetTasksObj({
            ...tasksObj,[todolist.id]:[]
        })
    }
    return (
        <div className="App">
            <AddItemForm AddItem={AddTodolistButtonProps}/>
            {TodolistData.map((tl) => {
                let filtrData = tasksObj[tl.id]
                if (tl.isDone == "Completed") {
                    filtrData = filtrData.filter(e => e.checked == false)
                }
                if (tl.isDone == "Active") {
                    filtrData = filtrData.filter(e => e.checked == true)
                }
                return (<Todolists
                    key={tl.id}
                    id={tl.id}
                    tasks={filtrData}
                    removeTask={removeTask}
                    FilterChenge={chengeFilter}
                    FilterStatus={tl.isDone}
                    chengeChecked={chengeChecked}
                    title={tl.title}
                    DeleteTodo={DeleteTodo}
                    AddNewTodoTask={AddNewTodoTask}/>)
            })
            }

        </div>
    );
}

export default App;