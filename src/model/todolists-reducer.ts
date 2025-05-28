import {FilterType, Todolist} from "../app/App.tsx";
import {createAction, createReducer, nanoid} from '@reduxjs/toolkit'

export const initialState: Todolist[] = []
export const todolistId = nanoid()
export const CREATE_TODOLIST = 'todolists/createTodolist'
export const DELETE_TODOLIST = 'todolists/deleteTodolist'
const CHANGE_TODOLIST_TITLE = 'todolists/changeTodolistTitle'
const CHANGE_TODOLIST_FILTER = 'todolists/changeTodolistFilter'

export const createTodolistAC = createAction(CREATE_TODOLIST, (title: string) => {
	return {
		payload: {
			id: todolistId,
			title
		}
	}
})
export const deleteTodolistAC = createAction<{ id: string }>(DELETE_TODOLIST)
export const changeTodolistTitleAC = createAction<{ todoId: string, title: string }>(CHANGE_TODOLIST_TITLE)
export const changeTodolistFilterAC = createAction<{ todoId: string, filter: FilterType }>(CHANGE_TODOLIST_FILTER)

export const todolistsReducer = createReducer(initialState, (builder) => {
	builder
		.addCase(deleteTodolistAC, (state, action) => {
			const index = state.findIndex(tl => tl.id === action.payload.id);
			if (index !== -1) {
				state.splice(index, 1);
			}
		})
		.addCase(createTodolistAC, (state, action) => {
			const newTodolist: Todolist = {...action.payload, filter: 'All'};
			// const newTodolist: Todolist = {id: action.payload.id, title: action.payload.title, filter: 'All'};
			state.push(newTodolist)
		})
		.addCase(changeTodolistTitleAC, (state, action) => {
			const todolist = state.find(todolist => todolist.id === action.payload.todoId)
			if (todolist) {
				todolist.title = action.payload.title
			}
		})
		.addCase(changeTodolistFilterAC, (state, action) => {
			const todolist = state.find(todolist => todolist.id === action.payload.todoId)
			if (todolist) {
				todolist.filter = action.payload.filter
			}
		})
		.addDefaultCase((state) => state)
})
