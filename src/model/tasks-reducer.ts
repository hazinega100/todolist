import {TasksState} from "../components/Task.tsx";
import {createTodolistAC, deleteTodolistAC} from "./todolists-reducer.ts";
import {createAction, createReducer, nanoid} from "@reduxjs/toolkit";

const initState: TasksState = {}
const CREATE_TASK = 'tasks/createTask';
const DELETE_TASK = 'tasks/deleteTask';
const CHANGE_TASK_STATUS = 'tasks/changeTaskStatus';
const CHANGE_TASK_TITLE = 'tasks/changeTaskTitle';

export const createTaskAC = createAction(CREATE_TASK, (todoId: string, title: string) => {
	return {
		payload: {
			todoId,
			taskId: nanoid(),
			title
		}
	}
})
export const deleteTasksAC = createAction<{ todoId: string, taskId: string }>(DELETE_TASK)
export const changeTaskStatusAC = createAction<{ todoId: string, taskId: string, isDone: boolean }>(CHANGE_TASK_STATUS)
export const changeTaskTitleAC = createAction<{ todoId: string, taskId: string, title: string }>(CHANGE_TASK_TITLE)

export const tasksReducer = createReducer(initState, (builder) => {
	builder
		.addCase(createTodolistAC, (state, action) => {
			state[action.payload.id] = []
		})
		.addCase(deleteTodolistAC, (state, action) => {
			delete state[action.payload.id]
		})
		.addCase(createTaskAC, (state, action) => {
			const newTask = {id: action.payload.taskId, title: action.payload.title, isDone: false}
			state[action.payload.todoId].unshift(newTask)
		})
		.addCase(deleteTasksAC, (state, action) => {
			const index = state[action.payload.todoId].findIndex(task => task.id === action.payload.taskId)
			if (index !== -1) {
				state[action.payload.todoId].splice(index, 1)
			}
		})
		.addCase(changeTaskStatusAC, (state, action) => {
			const {todoId, taskId, isDone} = action.payload
			const task = state[todoId].find(task => task.id === taskId)
			if (task) {
				task.isDone = isDone
			}
		})
		.addCase(changeTaskTitleAC, (state, action) => {
			const {todoId, taskId, title} = action.payload
			const task = state[todoId].find(task => task.id === taskId)
			if (task) {
				task.title = title
			}
		})
})

