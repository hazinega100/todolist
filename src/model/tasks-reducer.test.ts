import {beforeEach, test, expect} from "vitest";
import {
	changeTaskStatusAC, changeTaskTitleAC,
	createTaskAC,
	deleteTasksAC,
	tasksReducer
} from "./tasks-reducer.ts";
import {TasksState} from "../components/Task.tsx";
import {createTodolistAC, deleteTodolistAC, todolistId} from "./todolists-reducer.ts";

let startState: TasksState = {}

beforeEach(() => {
	startState = {
		todolistId1: [
			{id: '1', title: 'CSS', isDone: false},
			{id: '2', title: 'JS', isDone: true},
			{id: '3', title: 'React', isDone: false},
		],
		todolistId2: [
			{id: '1', title: 'bread', isDone: false},
			{id: '2', title: 'milk', isDone: true},
			{id: '3', title: 'tea', isDone: false},
		],
	}
})

test('array should be created for new todolist', () => {

	const endState = tasksReducer(startState, createTodolistAC(todolistId));
	expect(endState[todolistId].length).toBe(0)
})

test('delete todolist and tasks', () => {
	const endState = tasksReducer(startState, deleteTodolistAC({id: 'todolistId2'}));
	const keys = Object.keys(endState)

	expect(keys.length).toBe(1)
	expect(endState['todolistId2']).not.toBeDefined()
	expect(endState['todolistId2']).toBeUndefined()
})

test('create task', () => {
	const title = 'new task'
	const endState = tasksReducer(startState, createTaskAC('todolistId2', title));

	expect(endState['todolistId2'][3].title).toBe(title)
	expect(endState['todolistId2'].length).toBe(4)
})

test('delete task', () => {
	const endState = tasksReducer(startState, deleteTasksAC({todoId: 'todolistId2',taskId: '3'}));

	expect(endState['todolistId2'][2]).toBeUndefined()
	expect(endState['todolistId2'].length).toBe(2)
})

test('change task status', () => {
	const endState = tasksReducer(startState, changeTaskStatusAC({todoId: 'todolistId2',taskId: '3',isDone: true}))

	expect(endState['todolistId2'][2].isDone).toBe(true)
	expect(endState['todolistId2'][0].isDone).toBe(false)
})

test('correct task should change its title', () => {
	const title = 'new task';
	const endState = tasksReducer(startState, changeTaskTitleAC({todoId: 'todolistId2',taskId: '3',title: title}));

	expect(endState['todolistId2'][2].title).toBe(title)
})