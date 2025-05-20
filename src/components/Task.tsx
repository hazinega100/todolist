import {Button} from "./Button.tsx";

export interface TaskType {
	id: string
	title: string
	isDone: boolean
	callback?: (taskId: string) => void
}

export const Task = ({id, title, isDone, callback}: TaskType) => {
	const onDeleteTask = () => {
		if (callback) {
			callback(id)
		}
	}
	return (
		<li>
			<input type="checkbox" checked={isDone}/>
			<span>{title}</span>
			<Button onClick={onDeleteTask} title={"x"} />
		</li>
	);
};