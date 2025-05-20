import './App.css'
import {TodolistItem} from "./components/TodolistItem.tsx";
import {TaskType} from "./components/Task.tsx";
import {useState} from "react";
import {v1} from "uuid";

export type FilterType = "All" | "Completed" | "Active";

export interface Todolist {
	id: string
	title: string
	filter: FilterType
}

export const App = () => {
	const [tasks, setTasks] = useState<TaskType[]>([
		{id: v1(), title: 'HTML&CSS', isDone: true},
		{id: v1(), title: 'JS', isDone: true},
		{id: v1(), title: 'ReactJS', isDone: false},
	])

	const [todolists, setTodolists] = useState<Todolist[]>([
		{id: v1(), title: 'What to learn', filter: 'All'},
		{id: v1(), title: 'What to buy', filter: 'All'},
		{id: v1(), title: 'What to eat', filter: 'Active'},
	])

	const deleteTask = (taskId: string) => {
		setTasks(tasks.filter((task: TaskType) => task.id !== taskId));
	}

	const changeFilter = (todoId: string, filter: FilterType) => {
		setTodolists(todolists.map((todolist) => todolist.id === todoId ? {...todolist, filter} : todolist));
	}

	const createTask = (value: string) => {
		const newTask = {id: v1(), title: value, isDone: false}
		setTasks([...tasks, newTask]);
	}

	const changeTaskStatus = (taskId: string, checked: boolean) => {
		setTasks(tasks.map(task => task.id === taskId ? {...task, isDone: checked} : task));
		// const findTask = tasks.find((task: TaskType) => task.id === id);
		// if (findTask) {
		// 	findTask.isDone = checked;
		// 	setTasks([...tasks]);
		// }
	}
	return (
		<div className="app">
			{todolists.map((todolist: Todolist) => {
				let filteredTasks: TaskType[] = tasks
				if (todolist.filter === "Active") {
					filteredTasks = tasks.filter((task: TaskType) => !task.isDone)
				}
				if (todolist.filter === "Completed") {
					filteredTasks = tasks.filter((task: TaskType) => task.isDone)
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
