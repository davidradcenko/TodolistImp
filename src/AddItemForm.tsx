import React, {ChangeEvent, EventHandler,KeyboardEvent, KeyboardEventHandler, useState} from "react";
import Button from "@mui/material/Button";

import {IconButton, TextField} from "@mui/material";
import {ControlPoint} from "@mui/icons-material";

type AddItemFormType = {
    AddItem: (title: string) => void,
    disabled?: boolean
}

export const AddItemForm=React.memo((props: AddItemFormType)=> {
    console.log("AddItemForm is colled")
    let [ButtonAdd, SetButtonAdd] = useState("")
    let [ErrorMesage, SetErrorMessage] = useState<string | null>(null)

    const ChengeSetButtonAdd = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
    const OnKeyPres: EventHandler<KeyboardEvent<HTMLInputElement>> =(event)=>{
        if(ErrorMesage !== null){
            SetErrorMessage(null)
        }
        if (event.charCode == 13) {
            OnClikOnbutton(ButtonAdd)
        }

    }


    return (
        <div>
            <TextField onKeyPress={OnKeyPres}
                       variant={"outlined"}
                       label={"Type value"}
                       onChange={(e) => {ChengeSetButtonAdd(e)}}
                       error={!!ErrorMesage}
                       value={ButtonAdd} type="text"/>

            <IconButton onClick={() => {OnClikOnbutton(ButtonAdd)}}  color={'primary'}>
                <ControlPoint/>
            </IconButton>
            {ErrorMesage ? <div>{ErrorMesage}</div> : ''}
        </div>
    )
})