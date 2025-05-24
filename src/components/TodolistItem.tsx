import {Task, TaskType} from "./Task.tsx";
import {FilterType, Todolist} from "../App.tsx";
import {CreateItemForm} from "./CreateItemForm.tsx";
import {EditableSpan} from "./EditableSpan.tsx";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import List from '@mui/material/List'
import Box from "@mui/material/Box";
import {containerSx} from "../styles/TodolistItem.styles.ts";
import React from "react";

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

export const TodolistItem = React.memo((props: TodoItemType) => {
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
				<h3 className='todolist-title'>
					<EditableSpan value={title} onChange={onChangeTodolistTitle}/>
				</h3>
				<IconButton onClick={onDeleteTodolist}>
					<DeleteIcon/>
				</IconButton>
			</div>
			<CreateItemForm onCreateItem={createTaskHandler}/>
			{tasks.length === 0 ? (
				<p>No Tasks</p>
			) : (
				<List key={id}>
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
				</List>
			)}
			<div>
				<Box sx={containerSx}>
					<Button variant={filter === 'All' ? 'outlined' : 'text'}
							color={"info"}
							onClick={() => changeFilter(id, "All")}>All</Button>
					<Button variant={filter === 'Active' ? 'outlined' : 'text'}
							color={"error"}
							onClick={() => changeFilter(id, "Active")}>Active</Button>
					<Button variant={filter === 'Completed' ? 'outlined' : 'text'}
							color={"success"}
							onClick={() => changeFilter(id, "Completed")}>Completed</Button>
				</Box>
			</div>
		</div>
	);
})