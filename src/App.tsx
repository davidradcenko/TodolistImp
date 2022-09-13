import React, {useState} from 'react';
import {TaskType, Todolists} from "./Todolists";

export type FilterType = "All" | "Completed" | "Active";

function App() {
    let [TodolistData, SetTodolistData] = useState<Array<TaskType>>([
        {id: 1, name: "Pets", checked: false},
        {id: 2, name: "Dog", checked: true},
        {id: 3, name: "Cat", checked: false},
        {id: 4, name: "Bags", checked: true}
    ])
    let [Filter, setFilter] = useState<FilterType>("All")

    function removeTask(id: number) {
        let task = TodolistData.filter(e => id != e.id)
        SetTodolistData(task)
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
            <Todolists tasks={filtrData} removeTask={removeTask} chengeFilter={chengeFilter}/>
        </div>
    );
}


export default App;
