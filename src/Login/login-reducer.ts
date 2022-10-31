import {TaskType, TodolistAPI} from "../api/TodolistAPI";
import {Dispatch} from "redux";



export type TodoTasksType={
    [key:string]:Array<TaskType>
}
const initialState: TodoTasksType = {}

export const loginReducer = (state: TodoTasksType = initialState, action: ActionTypes): TodoTasksType => {
    switch (action.type) {

        default :
            return state
    }
}

//action
export const RemoveTaskAC = (idTodo: string, idTask: string) => ({type: "Remove-Task", idTodo, idTask}) as const


// thunks
export const fetchTasksTC = (todolistId: string) => {
    return (dispatch: Dispatch<ActionTypes | SetAppStatusActionType> ) => {
        dispatch(setAppStatusAC('loading'))
        TodolistAPI.getTasks(todolistId).then(res => {
            const tasks = res.data.items
            dispatch(SetTasksAC(todolistId, tasks))
            dispatch(setAppStatusAC('succeeded'))
        })
    }
}
