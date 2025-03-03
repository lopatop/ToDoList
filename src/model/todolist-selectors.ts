import {RootState} from "../app/store.ts";
import {TodolistPropsType} from "../app/App.tsx";

export const selectTodolists = (state:RootState):TodolistPropsType[]=> state.todolists