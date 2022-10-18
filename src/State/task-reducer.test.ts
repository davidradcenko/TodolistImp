import {TodoTasksType} from "../App";
import {AddTaskAC, ChengeTaskCheckedAC, ChengeTaskTitleAC, RemoveTaskAC, tasksRedusers} from "./tasks-reducer";
import {RemoveTodoAC} from "./todolists-reducer";
import {v1 as uuidv4} from "uuid";
import {TaskPriorities, TaskStatuses} from "../api/TodolistAPI";

test('remove task',()=>{

    let task:TodoTasksType={
        "todolistId1": [
            {id: uuidv4(), title: "Frog1", status:TaskStatuses.Completed,todoListId:"todolistId1",startDate:'',deadline:'',addedDate:'',order:0,priority:TaskPriorities.Low,description:''},
            {id: uuidv4(), title: "Frog2", status:TaskStatuses.Completed,todoListId:"todolistId1",startDate:'',deadline:'',addedDate:'',order:0,priority:TaskPriorities.Low,description:''},
            {id: uuidv4(), title: "Frog3", status:TaskStatuses.Completed,todoListId:"todolistId1",startDate:'',deadline:'',addedDate:'',order:0,priority:TaskPriorities.Low,description:''}
        ],
        "todolistId2": [
            {id: uuidv4(), title: "Frog4", status:TaskStatuses.Completed,todoListId:"todolistId2",startDate:'',deadline:'',addedDate:'',order:0,priority:TaskPriorities.Low,description:''},
            {id: uuidv4(), title: "Frog5", status:TaskStatuses.Completed,todoListId:"todolistId2",startDate:'',deadline:'',addedDate:'',order:0,priority:TaskPriorities.Low,description:''},

        ]
    }

    let result= tasksRedusers(task,RemoveTaskAC("todolistId1","1"))

    expect(result["todolistId1"].length).toBe(3)
})
test('Add task',()=>{

    let task:TodoTasksType={
        "todolistId1": [
            {id: uuidv4(), title: "Frog1", status:TaskStatuses.Completed,todoListId:"todolistId1",startDate:'',deadline:'',addedDate:'',order:0,priority:TaskPriorities.Low,description:''},
            {id: uuidv4(), title: "Frog2", status:TaskStatuses.Completed,todoListId:"todolistId1",startDate:'',deadline:'',addedDate:'',order:0,priority:TaskPriorities.Low,description:''},
            {id: uuidv4(), title: "Frog3", status:TaskStatuses.Completed,todoListId:"todolistId1",startDate:'',deadline:'',addedDate:'',order:0,priority:TaskPriorities.Low,description:''}
        ],
        "todolistId2": [
            {id: uuidv4(), title: "Frog4", status:TaskStatuses.Completed,todoListId:"todolistId2",startDate:'',deadline:'',addedDate:'',order:0,priority:TaskPriorities.Low,description:''},
            {id: uuidv4(), title: "Frog5", status:TaskStatuses.Completed,todoListId:"todolistId2",startDate:'',deadline:'',addedDate:'',order:0,priority:TaskPriorities.Low,description:''},

        ]
    }

    let result= tasksRedusers(task,AddTaskAC("todolistId1","myNewTask"))

    expect(result["todolistId1"].length).toBe(3)

})
test("change task isDone",()=>{
    let task:TodoTasksType={
        "todolistId1": [
            {id: uuidv4(), title: "Frog1", status:TaskStatuses.Completed,todoListId:"todolistId1",startDate:'',deadline:'',addedDate:'',order:0,priority:TaskPriorities.Low,description:''},
            {id: uuidv4(), title: "Frog2", status:TaskStatuses.Completed,todoListId:"todolistId1",startDate:'',deadline:'',addedDate:'',order:0,priority:TaskPriorities.Low,description:''},
            {id: uuidv4(), title: "Frog3", status:TaskStatuses.Completed,todoListId:"todolistId1",startDate:'',deadline:'',addedDate:'',order:0,priority:TaskPriorities.Low,description:''}
        ],
        "todolistId2": [
            {id: uuidv4(), title: "Frog4", status:TaskStatuses.Completed,todoListId:"todolistId2",startDate:'',deadline:'',addedDate:'',order:0,priority:TaskPriorities.Low,description:''},
            {id: uuidv4(), title: "Frog5", status:TaskStatuses.Completed,todoListId:"todolistId2",startDate:'',deadline:'',addedDate:'',order:0,priority:TaskPriorities.Low,description:''},

        ]
    }
    let result= tasksRedusers(task,ChengeTaskCheckedAC("todolistId1",TaskStatuses.New, "0"))
    expect(result['todolistId1'][0].status).toBe(TaskStatuses.New)
    expect(result['todolistId1'][0].title).toBe("Frog1")
})

test("change task Title",()=>{
    let task:TodoTasksType={
        "todolistId1": [
            {id: uuidv4(), title: "Frog1", status:TaskStatuses.Completed,todoListId:"todolistId1",startDate:'',deadline:'',addedDate:'',order:0,priority:TaskPriorities.Low,description:''},
            {id: uuidv4(), title: "Frog2", status:TaskStatuses.Completed,todoListId:"todolistId1",startDate:'',deadline:'',addedDate:'',order:0,priority:TaskPriorities.Low,description:''},
            {id: uuidv4(), title: "Frog3", status:TaskStatuses.Completed,todoListId:"todolistId1",startDate:'',deadline:'',addedDate:'',order:0,priority:TaskPriorities.Low,description:''}
        ],
        "todolistId2": [
            {id: uuidv4(), title: "Frog4", status:TaskStatuses.Completed,todoListId:"todolistId2",startDate:'',deadline:'',addedDate:'',order:0,priority:TaskPriorities.Low,description:''},
            {id: uuidv4(), title: "Frog5", status:TaskStatuses.Completed,todoListId:"todolistId2",startDate:'',deadline:'',addedDate:'',order:0,priority:TaskPriorities.Low,description:''},

        ]
    }
    let result= tasksRedusers(task,ChengeTaskTitleAC("todolistId1","1","Hellow"))
    expect(result['todolistId1'][0].title).toBe("Hellow")
})
test("properties of todo hood be deleted",()=>{
    let task:TodoTasksType={
        "todolistId1": [
            {id: uuidv4(), title: "Frog1", status:TaskStatuses.Completed,todoListId:"todolistId1",startDate:'',deadline:'',addedDate:'',order:0,priority:TaskPriorities.Low,description:''},
            {id: uuidv4(), title: "Frog2", status:TaskStatuses.Completed,todoListId:"todolistId1",startDate:'',deadline:'',addedDate:'',order:0,priority:TaskPriorities.Low,description:''},
            {id: uuidv4(), title: "Frog3", status:TaskStatuses.Completed,todoListId:"todolistId1",startDate:'',deadline:'',addedDate:'',order:0,priority:TaskPriorities.Low,description:''}
        ],
        "todolistId2": [
            {id: uuidv4(), title: "Frog4", status:TaskStatuses.Completed,todoListId:"todolistId2",startDate:'',deadline:'',addedDate:'',order:0,priority:TaskPriorities.Low,description:''},
            {id: uuidv4(), title: "Frog5", status:TaskStatuses.Completed,todoListId:"todolistId2",startDate:'',deadline:'',addedDate:'',order:0,priority:TaskPriorities.Low,description:''},

        ]
    }
    let deletedF=RemoveTodoAC("todolistId1")
    let result= tasksRedusers(task,deletedF)

    const keys=Object.keys(result)
    expect(result["todolistId1"]).not.toBeDefined()
    expect(keys.length).toBe(1)
})