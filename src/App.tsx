import './App.css'
import {TodolistItem} from "./components/TodolistItem.tsx";
import {TasksType, TaskType} from "./components/Task.tsx";
import {useState} from "react";
import {v1} from "uuid";

export type FilterType = "All" | "Completed" | "Active";

export interface Todolist {
	id: string
	title: string
	filter: FilterType
}

export const App = () => {

	const todolistId1 = v1();
	const todolistId2 = v1();
	const [tasks, setTasks] = useState<TasksType>({
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

	const [todolists, setTodolists] = useState<Todolist[]>([
		{id: todolistId1, title: 'What to learn', filter: 'All'},
		{id: todolistId2, title: 'What to buy', filter: 'All'},
	])

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
		setTasks({...tasks, [todoId]: tasks[todoId].map((task: TaskType) => task.id === taskId ? {...task, isDone: checked} : task)});
	}
	return (
		<div className="app">
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
				/>
			})
			}
		</div>
	)
};
