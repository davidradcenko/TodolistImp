import {Dispatch} from "redux";
import {authAPI} from "../api/TodolistAPI";
import {setIsLoginIn} from "../Login/login-reducer";

const initialState:InitialStateType = {
    status: 'idle' ,
    error: "null",
    initialized:false
}

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state,error:action.error}
        case 'APP/SET-INITIALIZED':
            return {...state,initialized:action.value}
        default:
            return state
    }
}
// Actions
export  const setAppErrorAC = (error:string | null)=>({type:'APP/SET-ERROR',error} as const )
export  const setAppStatusAC = (status:RequestStatusType)=>({type:'APP/SET-STATUS',status} as const )
export  const SetAppInitializedAC = (value:boolean)=>({type:'APP/SET-INITIALIZED',value} as const )


export  type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>;
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>;
export type SetAppInitializedActionType = ReturnType<typeof SetAppInitializedAC>;

//THUNK
export const initializeAppTC=()=>(dispath:Dispatch)=>{
    authAPI.me().then(res=>{
        if (res.data.resultCode === 0){
         dispath(setIsLoginIn(true))
         }else {

        }
    dispath(SetAppInitializedAC(true))
})
}



// types
type ActionsType = SetAppErrorActionType | SetAppStatusActionType |SetAppInitializedActionType
export type RequestStatusType= 'idle' | 'loading' | 'succeeded' | 'failed'
export type InitialStateType = {
    status: RequestStatusType,
    error: string | null,
    initialized:boolean
}