import {ChangeEvent,KeyboardEvent} from "react";

type InputPropsType = {
    addTitle: string
    setAddTitle: (title: string) => void
    addTasksFoo:()=>void

}


export const Input = (props: InputPropsType) => {
    const {setAddTitle,addTitle,addTasksFoo} = props


    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setAddTitle(e.currentTarget.value)
    }
    const onKeyPressInputHandler =(e:KeyboardEvent<HTMLInputElement>)=>{
        if(e.key === 'Enter'){
            addTasksFoo()
        }
    }

    return (
        <input value={addTitle} onKeyPress={onKeyPressInputHandler} onChange={onChangeInputHandler}/>
    )
}