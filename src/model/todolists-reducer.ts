import {FilterType, Todolist} from "../app/App.tsx";
import {v1} from "uuid";

export const initialState: Todolist[] = []
export const todolistId = v1()
export const CREATE_TODOLIST = 'CREATE_TODOLIST'
export const DELETE_TODOLIST = 'DELETE_TODOLIST'

export const todolistsReducer = (state = initialState, action: ActionType): Todolist[] => {
	switch (action.type) {
		case DELETE_TODOLIST: {
			return state.filter(todo => todo.id !== action.payload.id)
		}
		case 'CREATE_TODOLIST': {
			const newTodolist: Todolist = {id: action.payload.id, title: action.payload.title, filter: 'All'};
			return [...state, newTodolist]
		}
		case "CHANGE_TITLE_TODOLIST": {
			return state.map(todo => todo.id === action.payload.todoId ? {...todo, title: action.payload.title} : todo)
		}
		case "CHANGE_TODOLIST_FILTER": {
			return state.map((todolist) => todolist.id === action.payload.todoId ? {...todolist, filter: action.payload.filter} : todolist)
		}
		default: {
			return state
		}
	}
}

export const deleteTodolistAC = (id: string) => {
	return {
		type: 'DELETE_TODOLIST',
		payload: {id}
	} as const
}
export const createTodolistAC = (title: string) => {
	return {
		type: 'CREATE_TODOLIST',
		payload: {
			id: todolistId,
			title
		}
	} as const
}
export const changeTodolistTitleAC = (todoId: string, title: string) => {
	return {
		type: 'CHANGE_TITLE_TODOLIST',
		payload: {
			todoId,
			title
		}
	} as const
}

export const changeTodolistFilterAC = (todoId: string, filter: FilterType) => {
	return {
		type: 'CHANGE_TODOLIST_FILTER',
		payload: {
			todoId,
			filter
		}
	} as const
}

export type DeleteTodolistAction = ReturnType<typeof deleteTodolistAC>
export type CreateTodolistAction = ReturnType<typeof createTodolistAC>
type ChangeTodolistTitleAction = ReturnType<typeof changeTodolistTitleAC>
type ChangeTodolistFilterAC = ReturnType<typeof changeTodolistFilterAC>

type ActionType =
	DeleteTodolistAction |
	CreateTodolistAction |
	ChangeTodolistTitleAction |
	ChangeTodolistFilterAC
