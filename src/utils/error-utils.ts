import {ResponseType} from '../api/TodolistAPI'
import {setAppErrorAC, SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType} from "../State/app-reducer";
import {Dispatch} from "redux";

export const handelServerAppError = <D>(data: ResponseType<D>, dispatch:Dispatch<SetAppErrorActionType | SetAppStatusActionType>) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
    } else {
        dispatch(setAppErrorAC("Some error occurred"))
    }
    dispatch(setAppStatusAC('failed'))
}

export const handelServerNetworkError = (error: {message:string}, dispatch:Dispatch<SetAppErrorActionType | SetAppStatusActionType>) => {
    dispatch(setAppErrorAC(error.message ? error.message:"Some error occurred"))
    dispatch(setAppStatusAC('failed'))
}