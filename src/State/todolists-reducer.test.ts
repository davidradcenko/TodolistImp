import {v1} from "uuid";
import {
    AddTodoAC,
    ChengeTitleTodoAC,
    FilterType,
    RemoveTodoAC,
    TodolistDomainType,
    todolistsRedusers
} from "./todolists-reducer";


test('Remove todo from state',()=>{
    let todo1=v1()
    let todo2=v1()

    let todo:Array<TodolistDomainType>= [
        {id: todo1, title: "Me", filter: "All",order:0,addedDate:''},
        {id: todo2, title: "No me", filter: "Active",order:0,addedDate:''}
    ]

    const result= todolistsRedusers(todo,RemoveTodoAC(todo2))
    expect(result.length).toBe(1)
    expect(result[0].id).toBe(todo1)
})

test('Add todo in state',()=>{
    let todo1=v1()
    let todo2=v1()

    let todo:Array<TodolistDomainType>= [
        {id: todo1, title: "Me", filter: "All",order:0,addedDate:''},
        {id: todo2, title: "No me", filter: "Active",order:0,addedDate:''}
    ]
let newTitle="Yes it`s me"
    const result= todolistsRedusers(todo,AddTodoAC(newTitle))
    expect(result.length).toBe(3)
    expect(result[0].id).toBe(todo1)
})

test('Chenge title in todolist',()=>{
    let todo1=v1()
    let todo2=v1()

    let todo:Array<TodolistDomainType>= [
        {id: todo1, title: "Me", filter: "All",order:0,addedDate:''},
        {id: todo2, title: "No me", filter: "Active",order:0,addedDate:''}
    ]
    let newTitle="Yes it`s me"

    const result= todolistsRedusers(todo,ChengeTitleTodoAC(todo1,newTitle))

    expect(result[0].title).toBe("Yes it`s me")
    expect(result[0].id).toBe(todo1)
})

test('Chenge isDone in todolist',()=>{
    let todo1=v1()
    let todo2=v1()

    let todo:Array<TodolistDomainType>= [
        {id: todo1, title: "Me", filter: "All",order:0,addedDate:''},
        {id: todo2, title: "No me", filter: "Active",order:0,addedDate:''}
    ]
    let newIsdone:FilterType="Completed"

    const result= todolistsRedusers(todo,{type:"Change-Isdone-Todo",isDone:newIsdone,id:todo1})

    expect(result[0].filter).toBe("Completed")
    expect(result[0].id).toBe(todo1)
})