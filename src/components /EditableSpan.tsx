import {ChangeEvent, KeyboardEvent, useState} from "react";


type EditableSpanPropsType = {
    title: string
    changeTitleItem:(newTitleTask:string) => void
    className?: string
}

export const EditableSpan = (props: EditableSpanPropsType) => {
    const {title,changeTitleItem,className} = props

    const [isEditMode, setIsEditMode] = useState<boolean>(false)
    const [newTitle, setNewTitle] = useState(title)

    const editeModeOpen = () => {
        setIsEditMode(true)
        setNewTitle(title)
    }
    const editeModeClosed = () => {
        if (newTitle.trim() !== ''){
            changeTitleItem(newTitle)
        }else{
            setNewTitle(title)
        }
        setIsEditMode(false)
    }


    const onChangeInputHandler =(e: ChangeEvent<HTMLInputElement>)=>{
        setNewTitle(e.currentTarget.value)
    }

    const onKeyDownHandler =(e:KeyboardEvent<HTMLInputElement>,)=>{
   if (e.key === 'Enter'){
       e.preventDefault()
       editeModeClosed()
   }
    }

    return (
        isEditMode
            ? <input value={newTitle}
                     onBlur={editeModeClosed}
                     autoFocus
                     onKeyDown={onKeyDownHandler}
                     onChange={onChangeInputHandler} />
            : <span className={className} onDoubleClick={editeModeOpen}>{title}</span>

    )
}