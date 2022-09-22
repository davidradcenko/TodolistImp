import {v1} from "uuid";
import {FilterType, TodolistType} from "../App";
import {AddTodoAC, ChengeTitleTodoAC, RemoveTodoAC, todolistsRedusers} from "./todolists-reducer";


test('Remove todo from state',()=>{
    let todo1=v1()
    let todo2=v1()

    let todo:Array<TodolistType>= [
        {id:todo1,title:"Me",isDone:"All"},
        {id:todo2,title:"No me",isDone:"Active"}
    ]

    const result= todolistsRedusers(todo,RemoveTodoAC(todo2))
    expect(result.length).toBe(1)
    expect(result[0].id).toBe(todo1)
})

test('Add todo in state',()=>{
    let todo1=v1()
    let todo2=v1()

    let todo:Array<TodolistType>= [
        {id:todo1,title:"Me",isDone:"All"},
        {id:todo2,title:"No me",isDone:"Active"}
    ]
let newTitle="Yes it`s me"
    const result= todolistsRedusers(todo,AddTodoAC(newTitle))
    expect(result.length).toBe(3)
    expect(result[0].id).toBe(todo1)
})

test('Chenge title in todolist',()=>{
    let todo1=v1()
    let todo2=v1()

    let todo:Array<TodolistType>= [
        {id:todo1,title:"Me",isDone:"All"},
        {id:todo2,title:"No me",isDone:"Active"}
    ]
    let newTitle="Yes it`s me"

    const result= todolistsRedusers(todo,ChengeTitleTodoAC(todo1,newTitle))

    expect(result[0].title).toBe("Yes it`s me")
    expect(result[0].id).toBe(todo1)
})

test('Chenge isDone in todolist',()=>{
    let todo1=v1()
    let todo2=v1()

    let todo:Array<TodolistType>= [
        {id:todo1,title:"Me",isDone:"All"},
        {id:todo2,title:"No me",isDone:"Active"}
    ]
    let newIsdone:FilterType="Completed"

    const result= todolistsRedusers(todo,{type:"Change-Isdone-Todo",isDone:newIsdone,id:todo1})

    expect(result[0].isDone).toBe("Completed")
    expect(result[0].id).toBe(todo1)
})