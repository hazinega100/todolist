import './App.css'
import {TodolistItem} from "./components/TodolistItem.tsx";
import {TaskType} from "./components/Task.tsx";
import {useState} from "react";
import {v1} from "uuid";

export type FilterType = "All" | "Completed" | "Active";

export const App = () => {
	const [tasks, setTasks] = useState<TaskType[]>([
		{ id: v1(), title: 'HTML&CSS', isDone: true },
		{ id: v1(), title: 'JS', isDone: true },
		{ id: v1(), title: 'ReactJS', isDone: false },
	])

	const [filter, setFilter] = useState<FilterType>("All");

	const deleteTask = (taskId: string) => {
		setTasks(tasks.filter((task: TaskType) => task.id !== taskId));
	}

	let filteredTasks: TaskType[] = tasks

	if (filter === "Active") {
		filteredTasks = tasks.filter((task: TaskType) => !task.isDone)
	}

	if (filter === "Completed") {
		filteredTasks = tasks.filter((task: TaskType) => task.isDone)
	}

	const changeFilter = (filter: FilterType) => {
		setFilter(filter);
	}

	const createTask = (value: string) => {
		const newTask = { id: v1(), title: value, isDone: false }
		setTasks([...tasks, newTask]);
	}

	const changeTaskStatus = (taskId: string, checked: boolean) => {
		setTasks(tasks.map(task => task.id === taskId ? {...task, isDone: checked } : task));
		// const findTask = tasks.find((task: TaskType) => task.id === id);
		// if (findTask) {
		// 	findTask.isDone = checked;
		// 	setTasks([...tasks]);
		// }
	}
	return (
		<div className="app">
			<TodolistItem title={"What to learn"}
						  tasks={filteredTasks}
						  deleteTask={deleteTask}
						  changeFilter={changeFilter}
						  createTask={createTask}
						  changeTaskStatus={changeTaskStatus}
			/>
		</div>
	)
};
