import {Task, TaskType} from "./Task.tsx";
import {Button} from "./Button.tsx";
import {FilterType, Todolist} from "../App.tsx";
import {CreateItemForm} from "./CreateItemForm.tsx";
import {EditableSpan} from "./EditableSpan.tsx";

interface TodoItemType {
	todolist: Todolist
	tasks: TaskType[]
	deleteTask: (todoId: string, taskId: string) => void
	changeFilter: (todoId: string, filters: FilterType) => void
	createTask: (todoId: string, value: string) => void
	changeTaskStatus: (todoId: string, taskId: string, checked: boolean) => void
	deleteTodolist: (todoId: string) => void
	changeTaskTitle: (todoId: string, taskId: string, title: string) => void
	changeTodolistTitle: (todoId: string, title: string) => void
}

export const TodolistItem = (props: TodoItemType) => {
	const {
		todolist: {id, title, filter},
		tasks,
		deleteTask,
		changeFilter,
		createTask,
		changeTaskStatus,
		deleteTodolist,
		changeTaskTitle,
		changeTodolistTitle
	} = props;

	const createTaskHandler = (title: string) => {
		createTask(id, title)
	}

	const onDeleteTodolist = () => {
		deleteTodolist(id)
	}

	const onChangeTodolistTitle = (title: string) => {
		changeTodolistTitle(id, title)
	}

	return (
		<div>
			<div className={'container'}>
				<h3>
					<EditableSpan value={title} onChange={onChangeTodolistTitle}/>
				</h3>
				<Button title={'x'} onClick={onDeleteTodolist}/>
			</div>
			<CreateItemForm onCreateItem={createTaskHandler}/>
			{tasks.length === 0 ? (
				<p>No Tasks</p>
			) : (
				<ul>
					{tasks.map(task => {
						return (
							<Task key={task.id}
								  id={task.id}
								  title={task.title}
								  isDone={task.isDone}
								  deleteTask={() => deleteTask(id, task.id)}
								  changeTaskStatus={(checked: boolean) => changeTaskStatus(id, task.id, checked)}
								  changeTaskTitle={(title: string) => changeTaskTitle(id, task.id, title)}
							/>
						)
					})}
				</ul>
			)}
			<div>
				<Button className={filter === 'All' ? 'active-filter' : ''}
						title={"All"}
						onClick={() => changeFilter(id, "All")}/>
				<Button className={filter === 'Active' ? 'active-filter' : ''}
						title={"Active"}
						onClick={() => changeFilter(id, "Active")}/>
				<Button className={filter === 'Completed' ? 'active-filter' : ''}
						title={"Completed"}
						onClick={() => changeFilter(id, "Completed")}/>
			</div>
		</div>
	);
};