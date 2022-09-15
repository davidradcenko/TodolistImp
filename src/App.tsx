import React, {useState} from 'react';
import {TaskType, Todolists} from "./Todolists";
import {v1 as uuidv4} from 'uuid';
import './App.css';

export type FilterType = "All" | "Completed" | "Active";

function App() {
    let [TodolistData, SetTodolistData] = useState([
        {id: uuidv4(), name : "Pets", checked: false},
        {id: uuidv4(), name: "Dog", checked: true},
        {id: uuidv4(), name: "Cat", checked: false},
        {id: uuidv4(), name: "Bags", checked: true}
    ])
    let [Filter, setFilter] = useState<FilterType>("All")

    function removeTask(id: string) {
        let task = TodolistData.filter(e => id != e.id)
        SetTodolistData(task)
    }

    function AddNewTodoTask(title: string) {
        let newTodo = {id: uuidv4(), name: title, checked: false}
        let newTask = [newTodo, ...TodolistData]
        SetTodolistData(newTask)
    }

    function chengeChecked(id: string) {
        let newMass = TodolistData.find(e => {
            if (e.id == id) {
            e.checked= !e.checked
                return e
            }
        })
       let soldeMass=[...TodolistData]
            SetTodolistData(soldeMass)


    }

    function chengeFilter(value: FilterType) {
        setFilter(value)
    }


    let filtrData = TodolistData
    if (Filter == "Completed") {
        filtrData = TodolistData.filter(e => e.checked == false)
    }
    if (Filter == "Active") {
        filtrData = TodolistData.filter(e => e.checked == true)
    }

    return (
        <div className="App">
            <Todolists tasks={filtrData}
                       removeTask={removeTask}
                       FilterChenge={chengeFilter}
                       FilterStatus={Filter}
                       chengeChecked={chengeChecked}
                       AddNewTodoTask={AddNewTodoTask}/>
        </div>
    );
}


export default App;
