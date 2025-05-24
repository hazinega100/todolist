import {ChangeEvent} from "react";
import {EditableSpan} from "./EditableSpan.tsx";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from "@mui/material/Checkbox";
import ListItem from '@mui/material/ListItem'
import {getListItemSx} from "../styles/TodolistItem.styles.ts";
import React from "react";

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

export const Task = React.memo((props: TaskType) => {
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
		<ListItem key={id} sx={getListItemSx(isDone)}>
			<div>
				<Checkbox checked={isDone} onChange={onChangeCheckbox}/>
				<EditableSpan value={title} onChange={changeTaskTitle}/>
			</div>
			<IconButton onClick={onDeleteTask} aria-label="delete" size="small">
				<DeleteIcon fontSize="small"/>
			</IconButton>
		</ListItem>
	);
})