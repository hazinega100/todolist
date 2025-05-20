import {Button} from "./Button.tsx";
import {ChangeEvent} from "react";

export interface TasksType {
	[todolistId: string]: TaskType[]
}
export interface TaskType {
	id: string
	title: string
	isDone: boolean
	deleteTask?: (taskId: string) => void
	changeTaskStatus?: (checked: boolean) => void
}

export const Task = ({id, title, isDone, deleteTask, changeTaskStatus}: TaskType) => {
	const onDeleteTask = () => {
		if (deleteTask) {
			deleteTask(id);
		}
	}

	const onChangeCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
		if (changeTaskStatus) {
			changeTaskStatus(e.currentTarget.checked);
		}
	}
	return (
		<li className={isDone ? 'is-done' : ''}>
			<input type="checkbox"
				   checked={isDone}
				   onChange={onChangeCheckbox}
			/>
			<span>{title}</span>
			<Button onClick={onDeleteTask} title={"x"} />
		</li>
	);
};