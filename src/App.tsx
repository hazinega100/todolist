import './App.css'
import {TodolistItem} from "./components/TodolistItem.tsx";
import {TasksState, TaskType} from "./components/Task.tsx";
import {useState} from "react";
import {v1} from "uuid";
import {CreateItemForm} from "./components/CreateItemForm.tsx";

export type FilterType = "All" | "Completed" | "Active";

export interface Todolist {
	id: string
	title: string
	filter: FilterType
}

export const App = () => {

	const todolistId1 = v1();
	const todolistId2 = v1();

	const [todolists, setTodolists] = useState<Todolist[]>([
		{id: todolistId1, title: 'What to learn', filter: 'All'},
		{id: todolistId2, title: 'What to buy', filter: 'All'},
	])

	const [tasks, setTasks] = useState<TasksState>({
		[todolistId1]: [
			{id: v1(), title: 'HTML&CSS', isDone: true},
			{id: v1(), title: 'JS', isDone: true},
			{id: v1(), title: 'ReactJS', isDone: false},
		],
		[todolistId2]: [
			{id: v1(), title: 'Milk', isDone: true},
			{id: v1(), title: 'Bread', isDone: true},
			{id: v1(), title: 'Jem', isDone: false},
		]
	})

	const changeTaskTitle = (todoId: string, taskId: string, title: string) => {
		setTasks({
			...tasks,
			[todoId]: tasks[todoId].map((task: TaskType) => task.id === taskId ? {...task, title} : task)
		});
	}

	const deleteTask = (todoId: string, taskId: string) => {
		setTasks({...tasks, [todoId]: tasks[todoId].filter(task => task.id !== taskId)});
	}

	const changeFilter = (todoId: string, filter: FilterType) => {
		setTodolists(todolists.map((todolist) => todolist.id === todoId ? {...todolist, filter} : todolist));
	}

	const createTask = (todoId: string, value: string) => {
		const newTask = {id: v1(), title: value, isDone: false}
		setTasks({...tasks, [todoId]: [...tasks[todoId], newTask]});
	}

	const changeTaskStatus = (todoId: string, taskId: string, checked: boolean) => {
		setTasks({
			...tasks,
			[todoId]: tasks[todoId].map((task: TaskType) => task.id === taskId ? {...task, isDone: checked} : task)
		});
	}

	const deleteTodolist = (todoId: string) => {
		setTodolists(todolists.filter(todo => todo.id !== todoId))
		delete tasks[todoId]
		setTasks({...tasks})
	}

	const createTodolist = (title: string) => {
		const todolistId = v1();
		const newTodolist: Todolist = {id: todolistId, title, filter: 'All'};
		setTodolists([...todolists, newTodolist]);
		setTasks({...tasks, [todolistId]: []});
	}

	const changeTodolistTitle = (todoId: string, title: string) => {
		setTodolists(todolists.map(todo => todo.id === todoId ? {...todo, title} : todo))
	}

	return (
		<div className="app">
			<CreateItemForm onCreateItem={createTodolist}/>
			{todolists.map((todolist: Todolist) => {
				const todolistTasks = tasks[todolist.id]
				let filteredTasks = todolistTasks
				if (todolist.filter === "Active") {
					filteredTasks = todolistTasks.filter((task: TaskType) => !task.isDone)
				}
				if (todolist.filter === "Completed") {
					filteredTasks = todolistTasks.filter((task: TaskType) => task.isDone)
				}
				return <TodolistItem key={todolist.id}
									 todolist={todolist}
									 tasks={filteredTasks}
									 deleteTask={deleteTask}
									 changeFilter={changeFilter}
									 createTask={createTask}
									 changeTaskStatus={changeTaskStatus}
									 deleteTodolist={deleteTodolist}
									 changeTaskTitle={changeTaskTitle}
									 changeTodolistTitle={changeTodolistTitle}
				/>
			})
			}
		</div>
	)
};
