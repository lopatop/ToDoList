import { ChangeEvent, KeyboardEvent, useState } from "react"
import {editableSpanStyle} from "@/common/components/EditableSpan/EditableSpan.styles.ts";

type EditableSpanPropsType = {
  title: string
  changeTitleItem: (newTitleTask: string) => void
  isDone?: boolean
}

export const EditableSpan = (props: EditableSpanPropsType) => {
  const { title, changeTitleItem, isDone } = props

  const [isEditMode, setIsEditMode] = useState<boolean>(false)
  const [newTitle, setNewTitle] = useState(title)

  const editeModeOpen = () => {
    setIsEditMode(true)
    setNewTitle(title)
  }
  const editeModeClosed = () => {
    if (newTitle.trim() !== "") {
      changeTitleItem(newTitle)
    } else {
      setNewTitle(title)
    }
    setIsEditMode(false)
  }

  const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.currentTarget.value)
  }

  const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      editeModeClosed()
    }
  }

  return isEditMode ? (
    <input
      value={newTitle}
      onBlur={editeModeClosed}
      autoFocus
      onKeyDown={onKeyDownHandler}
      onChange={onChangeInputHandler}
    />
  ) : (
    <span
      style={editableSpanStyle(isDone)}
      onDoubleClick={editeModeOpen}
    >
      <span>
        {title}
      </span>
    </span>
  )
}
