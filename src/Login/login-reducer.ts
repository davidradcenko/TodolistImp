import {authAPI, LoginParamsType, TaskType, TodolistAPI} from "../api/TodolistAPI";
import {Dispatch} from "redux";
import {SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType} from "../State/app-reducer";
import {handelServerAppError, handelServerNetworkError} from "../utils/error-utils";
import {updateTaskAC} from "../State/tasks-reducer";




const initialState: InitialStateType = {
    isLoginIn:false,

}


export const loginReducer = (state: InitialStateType = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case "login/SET-IS-LOGIN-IN":{
            return {...state,isLoginIn:action.value}
        }
        default :
            return state
    }
}

//action
export const setIsLoginIn = (value:boolean) => ({type: "login/SET-IS-LOGIN-IN", value}) as const


// thunks
export const loginTC = (data:LoginParamsType) => {
    return (dispatch: Dispatch<ActionTypes | SetAppStatusActionType | SetAppErrorActionType>) => {
        dispatch(setAppStatusAC('loading'))
        authAPI.login(data).then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoginIn(true))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handelServerAppError(res.data, dispatch)
            }
        })
            .catch((error) => {
                handelServerNetworkError(error, dispatch)
            })
    }
}

//types
export type ActionTypes =
    ReturnType<typeof setIsLoginIn>

type InitialStateType={
    isLoginIn:boolean
}