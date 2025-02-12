import {Input} from "./Input.tsx";
import {Button} from "./Button.tsx";
import {useState} from "react";

type CreateItemFormPropsType ={
    addItem:(title:string)=>void
}


export const CreateItemForm =(props:CreateItemFormPropsType)=>{
    const{addItem}=props

    const [addTitle, setAddTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const addTasksFoo = () => {
        if (!inputError) {
            addItem(addTitle.trim())
        } else {
            setError('max 10 characters!')
        }
        setAddTitle('')
    }
    const inputError = (!addTitle.trim() || addTitle.length > 10)


    return (
        <div>
            <Input addTitle={addTitle}
                   setAddTitle={setAddTitle}
                   addTasksFoo={addTasksFoo}
                   className={error ? 'errorInput' : ''}
                   setError={setError}/>
            <Button callBack={addTasksFoo}
                    disabled={inputError}
                    name="+"/>
            {error && <div className='errorMessage'>{error}</div>}
        </div>
    )
}