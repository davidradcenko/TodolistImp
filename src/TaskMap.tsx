import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@mui/icons-material";
import {TaskType} from "./Todolists";

type TaskMapPropsType = {
    removeTask: (id: string, todolistId: string) => void,
    ChengeTaskName: (idTodo: string, idTask: string, NewTitle: string) => void,
    chengeChecked: (id: string, todolistId: string, cheked: boolean) => void,
    task: TaskType,
    TodolistId: string
}
export const TaskMap = React.memo((props: TaskMapPropsType) => {

    const deleteFun = (id: string) => {
        props.removeTask(props.task.id, props.TodolistId)
    }
    const SaveInputChekedNameHendler = useCallback((NewName: string) => {
        props.ChengeTaskName(props.TodolistId, props.task.id, NewName)
    },[props.TodolistId,props.task.id, props.ChengeTaskName])
    const onChangeStatus = (t: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = !props.task.checked
        props.chengeChecked(props.task.id, props.TodolistId, newIsDoneValue)
    }
    return (
        <div className={props.task.checked == true ? "Todolist-TasksList-ChekedTrue" : ""} key={props.task.id}>
            <Checkbox
                checked={props.task.checked}
                color="primary"
                onChange={onChangeStatus}/>

            <EditableSpan ChengeTaskName={SaveInputChekedNameHendler} key={props.task.id} title={props.task.name}/>
            <IconButton onClick={() => deleteFun(props.task.id)}>
                <Delete/>
            </IconButton>
        </div>
    )

})