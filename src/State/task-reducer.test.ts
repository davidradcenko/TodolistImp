import { TodoTasksType} from "../App";
import {AddTaskAC, RemoveTaskAC, tasksRedusers} from "./tasks-reducer";

test('remove task',()=>{

    let task:TodoTasksType={
        "todo1":[
            {id: "1", name: "Frog", checked: false},
            {id:"2", name: "Dog", checked: true},
            {id: "3", name: "Cat", checked: false},
            {id: "4", name: "Bags", checked: true}
        ],
       "todo2":[
            {id: "1", name: "Frog", checked: false},
            {id:"2", name: "Dog", checked: true},
            {id: "3", name: "Cat", checked: false},
            {id: "4", name: "Bags", checked: true}
        ]
    }

    let result= tasksRedusers(task,RemoveTaskAC("todo1","1"))

    expect(result["todo1"].length).toBe(3)
})
test('Add task',()=>{

    let task:TodoTasksType={
        "todo1":[
            {id: "1", name: "Frog", checked: false},
            {id:"2", name: "Dog", checked: true},
            {id: "3", name: "Cat", checked: false},
            {id: "4", name: "Bags", checked: true}
        ],
        "todo2":[
            {id: "1", name: "Frog", checked: false},
            {id:"2", name: "Dog", checked: true},
            {id: "3", name: "Cat", checked: false},
            {id: "4", name: "Bags", checked: true}
        ]
    }

    let result= tasksRedusers(task,AddTaskAC("todo1","myNewTask"))

    expect(result["todo1"].length).toBe(5)
    expect(result["todo1"][4].name).toBe("myNewTask")
    expect(result["todo1"][0].id).toBeDefined()
})