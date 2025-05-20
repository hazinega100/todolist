import {Task, TaskType} from "./Task.tsx";
import {Button} from "./Button.tsx";
import {FilterType} from "../App.tsx";
import {useState} from "react";

interface TodoItemType {
	title: string
	tasks: TaskType[]
	deleteTask: (taskId: string) => void
	changeFilter: (filters: FilterType) => void
	createTask: (value: string) => void
}

export const TodolistItem = (
	{
		title,
		tasks,
		deleteTask,
		changeFilter,
		createTask
	}: TodoItemType) => {
	const [inputValue, setInputValue] = useState<string>("")

	const onCreateTask = () => {
		createTask(inputValue);
		setInputValue("");
	}
	return (
		<div>
			<h3>{title}</h3>
			<div>
				<input value={inputValue}
					   onChange={(e) => setInputValue(e.currentTarget.value)} />
				<Button title={"+"} onClick={onCreateTask} />
			</div>
			{tasks.length === 0 ? (
				<p>Tasks is not</p>
			) : (
				<ul>
					{tasks.map(task => {
						return (
							<Task key={task.id}
								  id={task.id}
								  title={task.title}
								  isDone={task.isDone}
								  callback={() => deleteTask(task.id)}
							/>
						)
					})}
				</ul>
			)}
			<div>
				<Button title={"All"} onClick={() => changeFilter("All")}/>
				<Button title={"Active"} onClick={() => changeFilter("Active")}/>
				<Button title={"Completed"} onClick={() => changeFilter("Completed")}/>
			</div>
		</div>
	);
};