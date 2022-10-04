import {combineReducers, createStore} from "redux";
import {todolistsRedusers} from "./todolists-reducer";
import {tasksRedusers} from "./tasks-reducer";





const rootReducer = combineReducers({
    todolists:todolistsRedusers,
    tasks:tasksRedusers
})
// type AppRootState={
//     todolists:Array<TodolistType>,
//     tasks:TodoTasksType
// }
export type AppRootState=ReturnType<typeof rootReducer>
export const store=createStore(rootReducer)


//@ts-ignore
window.store=store