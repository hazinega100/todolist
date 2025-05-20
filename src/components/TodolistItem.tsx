import {Task, TaskType} from "./Task.tsx";
import {Button} from "./Button.tsx";
import {FilterType} from "../App.tsx";
import {ChangeEvent, KeyboardEvent, useState} from "react";

interface TodoItemType {
	title: string
	tasks: TaskType[]
	deleteTask: (taskId: string) => void
	changeFilter: (filters: FilterType) => void
	createTask: (value: string) => void
	changeTaskStatus: (taskId: string, checked: boolean) => void
}

export const TodolistItem = (
	{
		title,
		tasks,
		deleteTask,
		changeFilter,
		createTask,
		changeTaskStatus
	}: TodoItemType) => {
	const [inputValue, setInputValue] = useState<string>("")

	const onCreateTask = () => {
		if (inputValue.trim() !== "") {
			createTask(inputValue.trim());
			setInputValue("");
		}
	}

	const onChangeInputValue = (e: ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.currentTarget.value)
	}

	const onCreateTaskPushEnter = (event: KeyboardEvent<HTMLInputElement>) => {
		if (event.key === "Enter") {
			onCreateTask()
		}
	}

	return (
		<div>
			<h3>{title}</h3>
			<div>
				<input value={inputValue}
					   onChange={onChangeInputValue}
					   onKeyDown={onCreateTaskPushEnter}
				/>
				<Button title={"+"} onClick={onCreateTask}/>
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
								  changeTaskStatus={changeTaskStatus}
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