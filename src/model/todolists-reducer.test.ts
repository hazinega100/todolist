import {expect, test, beforeEach} from "vitest";
import {
	changeTodolistFilterAC,
	changeTodolistTitleAC,
	createTodolistAC,
	deleteTodolistAC,
	todolistsReducer
} from "./todolists-reducer.ts";
import {Todolist} from "../app/App.tsx";
import {nanoid} from "@reduxjs/toolkit";

let todolistId1: string
let todolistId2: string
let startState: Todolist[] = []

beforeEach(() => {
	todolistId1 = nanoid()
	todolistId2 = nanoid()

	startState = [
		{id: todolistId1, title: 'What to learn', filter: 'All'},
		{id: todolistId2, title: 'What to buy', filter: 'All'},
	]
})

test('delete todolist', () => {

	const endState = todolistsReducer(startState, deleteTodolistAC({id: todolistId1}))

	// 3. Проверка, что действие измененило state соответствующим образом
	// в массиве останется один тудулист
	expect(endState.length).toBe(1)
	// удалится нужный тудулист, не любой
	expect(endState[0].id).toBe(todolistId2)
})

test('create todolist', () => {
	const endState = todolistsReducer(startState, createTodolistAC('TEST'))
	expect(endState.length).toBe(3)
	expect(endState[2].title).toBe('TEST')
})

test('changed title todolist', () => {
	const newTitle = 'new title'
	const endState = todolistsReducer(startState, changeTodolistTitleAC({todoId: todolistId2, title: newTitle}))
	expect(endState[0].title).toBe('What to learn')
	expect(endState.length).toBe(2)
	expect(endState[1].title).toBe(newTitle)
})

test('correct todolist should change its filter', () => {
	const endState = todolistsReducer(startState, changeTodolistFilterAC({todoId: todolistId2, filter: 'Completed'}))
	expect(endState[0].filter).toBe('All')
	expect(endState.length).toBe(2)
	expect(endState[1].filter).toBe('Completed')
})