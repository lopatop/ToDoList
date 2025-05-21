import { SxProps } from "@mui/material"

export const listItemStyle: SxProps = { p: "0", justifyContent: "space-between" }
export const wrapperBoxStyle: SxProps = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
}

export const taskInfoBoxStyle: SxProps = {
    display: "flex",
    alignItems: "center",
    gap: 1,
    flexGrow: 1,
}

export const taskTitleBoxStyle: SxProps = {
    display: "inline-block",
    maxWidth: "200px",
    whiteSpace: "normal",
    wordBreak: "break-word",
}