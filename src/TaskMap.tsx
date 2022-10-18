import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@mui/icons-material";
import {TaskStatuses, TaskType} from "./api/TodolistAPI";

type TaskMapPropsType = {
    removeTask: (id: string, todolistId: string) => void,
    ChengeTaskName: (idTodo: string, idTask: string, NewTitle: string) => void,
    chengeChecked: (id: string, status: TaskStatuses, todolistId: string) => void,
    task: TaskType,
    TodolistId: string
}
export const TaskMap = React.memo((props: TaskMapPropsType) => {

    const deleteFun = useCallback((id: string) => {
        props.removeTask(props.task.id, props.TodolistId)
    },[props.task.id, props.TodolistId])


    const SaveInputChekedNameHendler = useCallback((NewName: string) => {
        props.ChengeTaskName(props.TodolistId, props.task.id, NewName)
    },[props.TodolistId,props.task.id, props.ChengeTaskName])

    const onChangeStatus = useCallback((t: ChangeEvent<HTMLInputElement>) => {
        //let newIsDoneValue = !props.task.status
        let newIsDoneValue = t.currentTarget.checked
        props.chengeChecked(props.task.id,newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New, props.TodolistId)
        debugger
    },[props.task.id,props.TodolistId])

    return (
        <div key={props.task.id} className={props.task.status === TaskStatuses.Completed ? "Todolist-TasksList-ChekedTrue" : ""} >
            <Checkbox
                checked={props.task.status===TaskStatuses.Completed}
                color="primary"
                onChange={onChangeStatus}/>

            <EditableSpan ChengeTaskName={SaveInputChekedNameHendler} key={props.task.id} title={props.task.title}/>
            <IconButton onClick={() => deleteFun(props.task.id)}>
                <Delete/>
            </IconButton>
        </div>
    )

})