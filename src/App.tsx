import React from 'react';


function App() {
    const mas1 = [
        {id: 1, name: "Pet", checked: false, nameCheckbox: [{id:1,namePet:"cat"},{id:2,namePet:"Dog"}]}
    ]



return (
    <div className="App">
        <Todolists mass={mas1}/>
    </div>
);
}
type nameChecboxType={
    id:number,namePet:string
}
type Mas1Type={
    id: number, name: string, checked: boolean, nameCheckbox: Array<nameChecboxType>
}
type propsType={
    mass:Array<Mas1Type>
}
function Todolists(props:propsType) {
    return (
        <>
            <div>
                <h1>{props.mass[0].name}:</h1>
                <ul>
                    <li><input checked={props.mass[0].checked} type="checkbox"/><span>{props.mass[0].nameCheckbox[0].namePet}</span></li>
                    <li><input checked={props.mass[0].checked} type="checkbox"/><span>{props.mass[0].nameCheckbox[1].namePet}</span></li>

                </ul>
            </div>
        </>
    )
}


export default App;
