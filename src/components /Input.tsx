import {ChangeEvent} from "react";

type InputPropsType = {
    addTitle: string
    setAddTitle: (title: string) => void

}


export const Input = (props: InputPropsType) => {
    const {setAddTitle,addTitle} = props


    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setAddTitle(e.currentTarget.value)
    }

    return (
        <input value={addTitle} onChange={onChangeInputHandler}/>
    )
}