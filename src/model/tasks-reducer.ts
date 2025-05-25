import {v1} from "uuid";
import {TasksState} from "../components/Task.tsx";
import {CREATE_TODOLIST, CreateTodolistAction, DELETE_TODOLIST, DeleteTodolistAction} from "./todolists-reducer.ts";

const initState: TasksState = {}

export const tasksReducer = (state = initState, action: Action): TasksState => {
	switch (action.type) {
		case CREATE_TODOLIST: {
			return {...state, [action.payload.id]: []}
		}
		case DELETE_TODOLIST: {
			delete state[action.payload.id]
			return {...state}
		}
		case 'CREATE_TASK': {
			const newTask = {id: action.payload.taskId, title: action.payload.title, isDone: false}
			return {...state, [action.payload.todoId]: [...state[action.payload.todoId], newTask]}
		}
		case "DELETE_TASK": {
			return {
				...state,
				[action.payload.todoId]: state[action.payload.todoId]
					.filter(task => task.id !== action.payload.taskId)}
		}
		case "CHANGE_TASK_STATUS": {
			return {
				...state,
				[action.payload.todoId]: state[action.payload.todoId]
					.map(task => task.id === action.payload.taskId ? {...task, isDone: action.payload.isDone} : task)
			}
		}
		case "CHANGE_TASK_TITLE": {
			return {
				...state,
				[action.payload.todoId]: state[action.payload.todoId]
					.map(task => task.id === action.payload.taskId ? {...task, title: action.payload.title} : task)
			}
		}
		default: {
			return state
		}
	}
}

export const createTaskAC = (todoId: string, title: string) => {
	const taskId = v1()
	return {
		type: 'CREATE_TASK',
		payload: {
			todoId,
			taskId,
			title
		}
	} as const
}

export const deleteTasksAC = (todoId: string, taskId: string) => {
	return {
		type: 'DELETE_TASK',
		payload: {
			todoId,
			taskId
		}
	} as const
}

export const changeTaskStatusAC = (todoId: string, taskId: string, isDone: boolean) => {
	return {
		type: 'CHANGE_TASK_STATUS',
		payload: {
			todoId,
			taskId,
			isDone
		}
	} as const
}

export const changeTaskTitleAC = (todoId: string, taskId: string, title: string) => {
	return {
		type: 'CHANGE_TASK_TITLE',
		payload: {
			todoId,
			taskId,
			title
		}
	} as const
}

type CreateTaskType = ReturnType<typeof createTaskAC>
type DeleteTasksType = ReturnType<typeof deleteTasksAC>
type ChangeTaskStatusType = ReturnType<typeof changeTaskStatusAC>
type ChangeTaskTitleType = ReturnType<typeof changeTaskTitleAC>

type Action = CreateTodolistAction
	| DeleteTodolistAction
	| CreateTaskType
	| DeleteTasksType
	| ChangeTaskStatusType
	| ChangeTaskTitleType