import {TodoTasksType} from "../App";
import {v1 as uuidv4, v4} from "uuid";
import {AddTodoAT, RemoveTodoAT, SetTodolistAC, SetTodolistAT, todolistId1, todolistId2} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses, TaskType, TodolistAPI, updateTaskModelType} from "../api/TodolistAPI";
import {Dispatch} from "redux";
import {RootState} from "./store";


export  type RemoveTaskAT = {
    type: "Remove-Task",
    idTodo: string,
    idTask: string
}
export  type AddTaskAT = {
    type: "Add-Task",
    task: TaskType
}
export type updateTaskAT = {
    type: "UPDATE-TASK",
    idTodo: string,
    idTask: string,
    model: updateDomainTaskModelType
}
export type ChengeTaskName = {
    type: "CHENGE-TASK-TITLE",
    idTodo: string,
    idTask: string,
    name: string

}
export type SetTaskAT = {
    type: "SET-TASK"
    todolistId: string
    tasks: Array<TaskType>

}
type ActionTypes =
    RemoveTaskAT
    | AddTaskAT
    | updateTaskAT
    | ChengeTaskName
    | RemoveTodoAT
    | AddTodoAT
    | SetTodolistAT
    | SetTaskAT
const initialState: TodoTasksType = {
    [todolistId1]: [
        {
            id: uuidv4(),
            title: "Frog1",
            status: TaskStatuses.Completed,
            todoListId: todolistId1,
            startDate: '',
            deadline: '',
            addedDate: '',
            order: 0,
            priority: TaskPriorities.Low,
            description: ''
        },
        {
            id: uuidv4(),
            title: "Frog2",
            status: TaskStatuses.Completed,
            todoListId: todolistId1,
            startDate: '',
            deadline: '',
            addedDate: '',
            order: 0,
            priority: TaskPriorities.Low,
            description: ''
        },
        {
            id: uuidv4(),
            title: "Frog3",
            status: TaskStatuses.Completed,
            todoListId: todolistId1,
            startDate: '',
            deadline: '',
            addedDate: '',
            order: 0,
            priority: TaskPriorities.Low,
            description: ''
        }
    ],
    [todolistId2]: [
        {
            id: uuidv4(),
            title: "Frog4",
            status: TaskStatuses.Completed,
            todoListId: todolistId2,
            startDate: '',
            deadline: '',
            addedDate: '',
            order: 0,
            priority: TaskPriorities.Low,
            description: ''
        },
        {
            id: uuidv4(),
            title: "Frog5",
            status: TaskStatuses.Completed,
            todoListId: todolistId2,
            startDate: '',
            deadline: '',
            addedDate: '',
            order: 0,
            priority: TaskPriorities.Low,
            description: ''
        },

    ]

}

export const tasksRedusers = (state: TodoTasksType = initialState, action: ActionTypes): TodoTasksType => {
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
            const newTask = action.task
            // const newTask: TaskType = {id: v4(), title: action.title, status: TaskStatuses.New,addedDate:"",deadline:"",description:"",order:0,priority:TaskPriorities.Low,startDate:"",todoListId:action.idTodo}
            let T = stateCopy[newTask.todoListId]
            let newTodoTasks = [newTask, ...T]
            stateCopy[newTask.todoListId] = newTodoTasks
            return stateCopy
        }
        case 'UPDATE-TASK': {

            let stateCope = {...state}
            let Todolisttasks = stateCope[action.idTodo]
            stateCope[action.idTodo] = Todolisttasks.map(t => t.id === action.idTask ? {...t, ...action.model} : t)
            return stateCope
        }
        case "Remove-Todo": {
            let stateCope = {...state}
            delete stateCope[action.id]
            return stateCope
        }
        case "Add-Todo": {
            const statyCope = {...state}
            statyCope[action.NewTodo.id] = []
            return statyCope
        }
        case "SET-TODOLIST": {
            const statyCope = {...state}
            action.todolist.forEach(tl => {
                statyCope[tl.id] = []
            })
            return statyCope
        }
        case "SET-TASK": {
            const statyCope = {...state}
            statyCope[action.todolistId] = action.tasks
            return statyCope
        }
        default :
            return state
    }
}
export const RemoveTaskAC = (idTodo: string, idTask: string): RemoveTaskAT => {
    return {type: "Remove-Task", idTodo, idTask}
}
export const AddTaskAC = (task: TaskType): AddTaskAT => {
    return {type: "Add-Task", task}
}
export const updateTaskAC = (idTodo: string, model: updateDomainTaskModelType, idTask: string): updateTaskAT => {
    return {type: "UPDATE-TASK", idTodo, model, idTask}
}
export const ChengeTaskTitleAC = (idTodo: string, idTask: string, name: string): ChengeTaskName => {
    return {type: "CHENGE-TASK-TITLE", idTodo, idTask, name}
}
export const SetTasksAC = (todolistId: string, tasks: Array<TaskType>): SetTaskAT => {
    return {type: "SET-TASK", todolistId, tasks}
}
// thunks
export const fetchTasksTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        TodolistAPI.getTasks(todolistId).then(res => {
            const tasks = res.data.items
            dispatch(SetTasksAC(todolistId, tasks))
        })
    }
}
export const deleteTasksTC = (todolistId: string, TaskId: string) => {
    return (dispatch: Dispatch) => {
        TodolistAPI.deleteTask(todolistId, TaskId).then(res => {
            dispatch(RemoveTaskAC(todolistId, TaskId))
        })
    }
}
export const addTaskTC = (todolistId: string, title: string) => {
    return (dispatch: Dispatch) => {
        TodolistAPI.createTask(todolistId, title).then(res => {
            const task = res.data.data.item
            dispatch(AddTaskAC(task))
        })
    }
}
export type updateDomainTaskModelType={
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}
export const updateTaskStatusTC = (idTodo: string, domainmodel: updateDomainTaskModelType, idTask: string) => {
    return (dispatch: Dispatch, getState: () => RootState) => {
        const state = getState()
        const task = state.tasks[idTodo].find(t => t.id === idTask)
        if (!task) {
            return
        }
        const apimodel: updateTaskModelType = {
            title: task.title,
            status: task.status,
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            ...domainmodel
        }
        TodolistAPI.updateTask(idTodo, idTask, apimodel).then(res => {
            dispatch(updateTaskAC(idTodo,domainmodel,idTask))
        })
    }
}