import {TodoTasksType} from "../App";
import {v1 as uuidv4, v4} from "uuid";
import {AddTodoAT, RemoveTodoAT, SetTodolistAC, SetTodolistAT, todolistId1, todolistId2} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses, TaskType, TodolistAPI} from "../api/TodolistAPI";
import {Dispatch} from "redux";


export  type RemoveTaskAT = {
    type: "Remove-Task",
    idTodo: string,
    idTask: string
}
export  type AddTaskAT = {
    type: "Add-Task",
    task:TaskType
}
export type ChengeTaskStatus = {
    type: "CHENGE-TASK-STATUS",
    idTodo: string,
    idTask: string,
    status: TaskStatuses
}
export type ChengeTaskName = {
    type: "CHENGE-TASK-TITLE",
    idTodo: string,
    idTask: string,
    name: string

}
export type SetTaskAT={
    type:"SET-TASK"
    todolistId: string
    tasks:Array<TaskType>

}
type ActionTypes = RemoveTaskAT | AddTaskAT | ChengeTaskStatus | ChengeTaskName | RemoveTodoAT | AddTodoAT | SetTodolistAT | SetTaskAT
const initialState:TodoTasksType={
    [todolistId1]: [
        {id: uuidv4(), title: "Frog1", status:TaskStatuses.Completed,todoListId:todolistId1,startDate:'',deadline:'',addedDate:'',order:0,priority:TaskPriorities.Low,description:''},
        {id: uuidv4(), title: "Frog2", status:TaskStatuses.Completed,todoListId:todolistId1,startDate:'',deadline:'',addedDate:'',order:0,priority:TaskPriorities.Low,description:''},
        {id: uuidv4(), title: "Frog3", status:TaskStatuses.Completed,todoListId:todolistId1,startDate:'',deadline:'',addedDate:'',order:0,priority:TaskPriorities.Low,description:''}
    ],
    [todolistId2]: [
        {id: uuidv4(), title: "Frog4", status:TaskStatuses.Completed,todoListId:todolistId2,startDate:'',deadline:'',addedDate:'',order:0,priority:TaskPriorities.Low,description:''},
        {id: uuidv4(), title: "Frog5", status:TaskStatuses.Completed,todoListId:todolistId2,startDate:'',deadline:'',addedDate:'',order:0,priority:TaskPriorities.Low,description:''},

    ]

}

export const tasksRedusers = (state: TodoTasksType=initialState, action: ActionTypes): TodoTasksType => {
    switch (action.type) {
        case 'Remove-Task': {
            const stateCopy = {...state}
            let todo = stateCopy[action.idTodo]
            let n = todo.filter(e => e.id != action.idTask)
            stateCopy[action.idTodo] = n

            return {...stateCopy}
        }
        case 'Add-Task': {
            const stateCopy = {...state}
            const newTask=action.task
           // const newTask: TaskType = {id: v4(), title: action.title, status: TaskStatuses.New,addedDate:"",deadline:"",description:"",order:0,priority:TaskPriorities.Low,startDate:"",todoListId:action.idTodo}
            let T = stateCopy[newTask.todoListId]
            let newTodoTasks = [newTask, ...T]
            stateCopy[newTask.todoListId] = newTodoTasks
            return stateCopy
        }
        case 'CHENGE-TASK-STATUS': {
            let stateCope= {...state}
            let Todolisttasks = stateCope[action.idTodo]
            stateCope[action.idTodo] = Todolisttasks.map(t=>t.id === action.idTask ? {...t,status:action.status} : t)

            // let task = tasks.find(t => t.id == action.idTask)
            // if (task) {
            //     task.checked = action.cheked
            // }
            // state[action.idTodo] = [...tasks]
            return stateCope
        }
        case 'CHENGE-TASK-TITLE': {

            let stateCope= {...state}
            let Todolisttasks = stateCope[action.idTodo]
            stateCope[action.idTodo] = Todolisttasks.map(t=>t.id === action.idTask ? {...t,title:action.name} : t)
            // let tasks = state[action.idTodo]
            //
            // let task = tasks.find(t => t.id == action.idTask)
            // if (task) {
            //     task.name = action.name
            // }
            // state[action.idTodo]=[...tasks]
            return stateCope
        }
        case "Remove-Todo": {
            let stateCope = {...state}
            delete stateCope[action.id]
            return stateCope
        }
        case "Add-Todo": {
            const statyCope ={...state}
            statyCope[action.TodolistId]=[]
            return statyCope
        }
        case "SET-TODOLIST":{
            const statyCope ={...state}
            action.todolist.forEach(tl=>{
                statyCope[tl.id]=[]
            })
            return statyCope
        }
        case "SET-TASK":{
            const statyCope ={...state}
            statyCope[action.todolistId]=action.tasks
            return statyCope
        }
        default :
            return state
    }
}
export const RemoveTaskAC = (idTodo: string, idTask: string): RemoveTaskAT => {
    return {type: "Remove-Task", idTodo, idTask}
}
export const AddTaskAC = (task:TaskType): AddTaskAT => {
    return {type: "Add-Task", task}
}
export const ChengeTaskCheckedAC = (idTodo: string, status: TaskStatuses, idTask: string): ChengeTaskStatus => {
    return {type: "CHENGE-TASK-STATUS", idTodo, status, idTask}
}
export const ChengeTaskTitleAC = (idTodo: string, idTask: string, name: string): ChengeTaskName => {
    return {type: "CHENGE-TASK-TITLE", idTodo, idTask, name}
}
export const SetTasksAC=(todolistId:string,tasks:Array<TaskType>):SetTaskAT=>{
    return {type:"SET-TASK",todolistId,tasks}
}
// thunks
export const fetchTasksTC=(todolistId:string)=>{
    return (dispatch:Dispatch)=>{
        TodolistAPI.getTasks(todolistId).then(res=>{
            const tasks=res.data.items
            dispatch(SetTasksAC(todolistId,tasks))
        })
    }
}
export const deleteTasksTC=( todolistId: string,TaskId: string)=>{
    return (dispatch:Dispatch)=>{
        TodolistAPI.deleteTask(todolistId,TaskId).then(res=>{
            dispatch(RemoveTaskAC(todolistId,TaskId))
        })
    }
}
export const addTaskTC=( todolistId:string,title:string)=>{
    return (dispatch:Dispatch)=>{
        TodolistAPI.createTask(todolistId,title).then(res=>{
            const task=res.data.data.item
            dispatch(AddTaskAC(task))
        })
    }
}