import {AnyAction, applyMiddleware, combineReducers, createStore} from "redux";
import {todolistsRedusers} from "./todolists-reducer";
import {tasksRedusers} from "./tasks-reducer";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {appReducer} from "./app-reducer";





const rootReducer = combineReducers({
    todolists:todolistsRedusers,
    tasks:tasksRedusers,
    app:appReducer
})
// type AppRootState={
//     todolists:Array<TodolistType>,
//     tasks:TodoTasksType
// }
export const store=createStore(rootReducer,applyMiddleware(thunk))
//export type AppRootState=ReturnType<typeof rootReducer>
export type RootState= ReturnType<typeof store.getState>

export type AppDispatch = ThunkDispatch<RootState, unknown, AnyAction>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,RootState, unknown, AnyAction>

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
//@ts-ignore
window.store=store