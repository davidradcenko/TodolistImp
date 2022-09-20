import React, {useState} from "react";

type EditableSpanType = {
    title: string
    ChengeTaskName: (NewTitle: string) => void,
}

export function EditableSpan(props: EditableSpanType) {
    let [EditableSpan, SetEditableSpan] = useState(true)
    let [Title, SetTitle] = useState(props.title)

    let ChengeInput = (e: any) => {
        SetTitle(e)
    }

    const ChenchDouble = (newPosichen: boolean) => {
        SetEditableSpan(newPosichen)
    }
    const OnBlurReact=()=>{
        props.ChengeTaskName(Title)
        SetTitle("")
        SetEditableSpan(true)
    }

    return (EditableSpan
            ?<span onDoubleClick={() => ChenchDouble(false)}>{props.title}</span>
            : <input value={Title} onChange={(e) => ChengeInput(e.currentTarget.value)} onBlur={()=>OnBlurReact()} autoFocus/>
    )


}