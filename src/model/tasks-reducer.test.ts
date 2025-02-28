
import { expect, test } from 'vitest';
import {tasksReducer, addTaskAC, removeTaskAC, changeIsDoneTaskAC, removeTitleTaskAC} from './tasks-reducer';
import { TasksPropsType } from '../app/App.tsx';
import {nanoid} from "@reduxjs/toolkit";

test('correct task should be added', () => {
    const todolistId = nanoid();
    const startState: TasksPropsType = {
        [todolistId]: [],
    };

    const action = addTaskAC({todolistId, titleTasks:'New Task'});
    const endState = tasksReducer(startState, action);

    expect(endState[todolistId].length).toBe(1);
    expect(endState[todolistId][0].title).toBe('New Task');
});

test('correct task should be removed', () => {
    const todolistId = nanoid();
    const taskId = nanoid();
    const startState: TasksPropsType = {
        [todolistId]: [
            { id: taskId, title: 'Task to remove', isDone: false },
        ],
    };

    const action = removeTaskAC({todolistId, taskId});
    const endState = tasksReducer(startState, action);

    expect(endState[todolistId].length).toBe(0);
});

test('correct task should change its isDone status', () => {
    const todolistId = nanoid();
    const taskId = nanoid();
    const startState: TasksPropsType = {
        [todolistId]: [
            { id: taskId, title: 'Task to change', isDone: false },
        ],
    };

    const action = changeIsDoneTaskAC({todolistId, isDone:true, taskId});
    const endState = tasksReducer(startState, action);

    expect(endState[todolistId][0].isDone).toBe(true);
});

test('should create an action to remove title of a task', () => {
    const todolistId = nanoid();
    const taskId = nanoid();
    const newTitle = 'Updated Task Title';


    const action = removeTitleTaskAC({todolistId, newTitle, taskId});

    expect(action.type).toBe('tasks/removeTitleTask');
    expect(action.payload.todolistId).toBe(todolistId);
    expect(action.payload.newTitle).toBe(newTitle);
    expect(action.payload.taskId).toBe(taskId);
});

test('should handle REMOVE-TITLE-TASK action', () => {
    const todolistId = nanoid();
    const taskId = nanoid();
    const initialState: TasksPropsType = {
        [todolistId]: [
            { id: taskId, title: 'Old Task Title', isDone: false },
        ],
    };

    const newTitle = 'Updated Task Title';
    const action = removeTitleTaskAC({todolistId, newTitle, taskId});

    const endState = tasksReducer(initialState, action);

    expect(endState[todolistId][0].title).toBe(newTitle);
    expect(endState[todolistId][0].id).toBe(taskId);
    expect(endState[todolistId][0].isDone).toBe(false);
});