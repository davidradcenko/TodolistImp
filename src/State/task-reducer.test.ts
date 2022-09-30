import { TodoTasksType} from "../App";
import {AddTaskAC, ChengeTaskCheckedAC, ChengeTaskTitleAC, RemoveTaskAC, tasksRedusers} from "./tasks-reducer";
import {RemoveTodoAC, todolistsRedusers} from "./todolists-reducer";

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
            {id:"2", name: "Dog", checked: true}
        ],
        "todo2":[
            {id: "1", name: "Frog", checked: false},
            {id:"2", name: "Dog", checked: true},
            {id: "3", name: "Cat", checked: false},
            {id: "4", name: "Bags", checked: true}
        ]
    }

    let result= tasksRedusers(task,AddTaskAC("todo1","myNewTask"))

    expect(result["todo1"].length).toBe(3)

})
test("change task isDone",()=>{
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
    let result= tasksRedusers(task,ChengeTaskCheckedAC("todo1","0"))
    expect(result['todo1'][0].checked).toBe(true)
    expect(result['todo1'][0].name).toBe("Frog")
})

test("change task Title",()=>{
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
    let result= tasksRedusers(task,ChengeTaskTitleAC("todo1","1","Hellow"))
    expect(result['todo1'][0].name).toBe("Hellow")
})
test("properties of todo hood be deleted",()=>{
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
    let deletedF=RemoveTodoAC("todo1")
    let result= tasksRedusers(task,deletedF)

    const keys=Object.keys(result)
    expect(result["todo1"]).not.toBeDefined()
    expect(keys.length).toBe(1)
})