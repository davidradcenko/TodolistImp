import React, {ChangeEvent, useState} from "react";
import Button from "@mui/material/Button";

type AddItemFormType = {
    AddItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormType) {
    let [ButtonAdd, SetButtonAdd] = useState("")
    let [ErrorMesage, SetErrorMessage] = useState<string | null>(null)

    const ChengeSetButtonAdd = (e: ChangeEvent<HTMLInputElement>) => {
        SetButtonAdd(e.currentTarget.value)
        SetErrorMessage(null)
    }
    const OnClikOnbutton = (e: string) => {
        if (e.trim() != "") {
            props.AddItem(e.trim())
            SetButtonAdd("")
            SetErrorMessage(null)
        } else {
            SetErrorMessage("You need to write something")
        }
    }
    return (
        <div>
            <input onKeyPress={(e) => {
                if (e.charCode == 13) {
                    OnClikOnbutton(ButtonAdd)
                }
            }}
                   onChange={(e) => {
                       ChengeSetButtonAdd(e)
                   }}
                   className={ErrorMesage ? "Todolist-AddTasks-input" : ""}
                   value={ButtonAdd} type="text"/>
            <Button onClick={() => {OnClikOnbutton(ButtonAdd)}}  variant={"outlined"} color={"primary"}  >+</Button>
            {ErrorMesage ? <div>{ErrorMesage}</div> : ''}
        </div>
    )
}