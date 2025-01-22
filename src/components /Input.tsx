import {ChangeEvent,KeyboardEvent} from "react";

type InputPropsType = {
    addTitle: string
    setAddTitle: (title: string) => void
    addTasksFoo:()=>void
    className:string
    setError:(setError:string | null)=>void

}


export const Input = (props: InputPropsType) => {
    const {setAddTitle,addTitle,addTasksFoo,className,setError} = props



    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setAddTitle(e.currentTarget.value)
        setError(null)

    }
    const onKeyPressInputHandler =(e:KeyboardEvent<HTMLInputElement>)=>{
        if(e.key === 'Enter'){
            addTasksFoo()
        }
    }

    return (
        <input className={className} value={addTitle} onKeyDown={onKeyPressInputHandler} onChange={onChangeInputHandler}/>
    )
}