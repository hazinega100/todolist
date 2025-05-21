import {Button} from "./Button.tsx";
import {ChangeEvent} from "react";
import {EditableSpan} from "./EditableSpan.tsx";

export interface TasksState {
	[todolistId: string]: TaskType[]
}
export interface TaskType {
	id: string
	title: string
	isDone: boolean
	deleteTask?: (taskId: string) => void
	changeTaskStatus?: (checked: boolean) => void
	changeTaskTitle?: (title: string) => void
}

export const Task = (props: TaskType) => {
	const {id, title, isDone, deleteTask, changeTaskStatus, changeTaskTitle} = props
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
			<EditableSpan value={title} onChange={changeTaskTitle}/>
			<Button onClick={onDeleteTask} title={"x"} />
		</li>
	);
};