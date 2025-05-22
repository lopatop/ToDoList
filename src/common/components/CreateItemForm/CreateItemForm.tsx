import { ChangeEvent, KeyboardEvent, useState } from "react"
import TextField from "@mui/material/TextField"

import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import AddIcon from "@mui/icons-material/Add"

type CreateItemFormPropsType = {
  addItem: (title: string) => void
  disabled?: boolean
}

export const CreateItemForm = (props: CreateItemFormPropsType) => {
  const { addItem, disabled } = props

  const [addTitle, setAddTitle] = useState("")
  const [error, setError] = useState<string | null>(null)

  const addTasksFoo = () => {
    if (!inputError) {
      addItem(addTitle.trim())
    } else {
      setError("Error")
    }
    setAddTitle("")
  }

  const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setAddTitle(e.currentTarget.value)
    setError(null)
  }
  const onKeyPressInputHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      addTasksFoo()
    }
  }
  const inputError = !addTitle.trim() || addTitle.length > 110

  const ButtonStyle = { minHeight: "40px", maxHeight: "40px" }

  return (
    <Box>
      <TextField
        variant={"outlined"}
        error={!!error}
        label={error ? error : "Enter text"}
        className={error ? "errorInput" : ""}
        value={addTitle}
        onKeyDown={onKeyPressInputHandler}
        onChange={onChangeInputHandler}
        size={"small"}
        helperText={inputError}
        disabled={disabled}
      />

      <Button sx={ButtonStyle} onClick={addTasksFoo} disabled={inputError || disabled} variant="contained">
        <AddIcon />
      </Button>
    </Box>
  )
}
