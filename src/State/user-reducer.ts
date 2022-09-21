
type StateType={
    age:number,
    childrenCount:number,
    name:string
}
type ActionType={
    type :string,
    [key:string]:any
}


export const userReducer = (state: StateType, action: ActionType) => {
    switch (action.type) {
        case 'BlaBla1': {
break
        }
        default :
            throw new Error("I dont`t understand that action type")
    }
}