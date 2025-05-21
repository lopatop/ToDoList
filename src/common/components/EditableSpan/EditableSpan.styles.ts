import {CSSProperties} from "react";


export const editableSpanStyle = (isDone?:boolean): CSSProperties => ({
    opacity: isDone ? 0.5 : 1,
    textDecoration: isDone ? "line-through" : "none",
    display: "inline-block",
    maxWidth: "180px",
    wordBreak: "break-word",
    whiteSpace: "pre-wrap"})
