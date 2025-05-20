import {Button} from "./Button.tsx";
import {ChangeEvent} from "react";

export interface TaskType {
	id: string
	title: string
	isDone: boolean
	callback?: (taskId: string) => void
	changeTaskStatus?: (taskId: string, value: boolean) => void
}

export const Task = ({id, title, isDone, callback, changeTaskStatus}: TaskType) => {
	const onDeleteTask = () => {
		if (callback) {
			callback(id);
		}
	}

	const onChangeCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
		if (changeTaskStatus) {
			changeTaskStatus(id, e.currentTarget.checked);
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