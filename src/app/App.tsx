import './App.css'
import {TodolistItem} from "../components/TodolistItem.tsx";
import {TaskType} from "../components/Task.tsx";
import React, {useState} from "react";
import {CreateItemForm} from "../components/CreateItemForm.tsx";
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {containerSx} from "../styles/TodolistItem.styles.ts";
import {NavButton} from "../components/NavButton.ts";
import {createTheme} from "@mui/material/styles";
import {ThemeProvider} from "@mui/material";
import CssBaseline from '@mui/material/CssBaseline'
import {ISwitch} from "../components/Switch.ts";
import {
	changeTodolistFilterAC,
	changeTodolistTitleAC,
	createTodolistAC,
	deleteTodolistAC
} from "../model/todolists-reducer.ts";
import {changeTaskStatusAC, changeTaskTitleAC, createTaskAC, deleteTasksAC} from "../model/tasks-reducer.ts";
import {useAppSelector} from "../common/hooks/useAppSelector.ts";
import {useAppDispatch} from "../common/hooks/useAppDispatch.ts";
import {selectTasks} from "../model/tasks-selectors.ts";
import {selectTodolists} from "../model/todolists-selectors.ts";

export type FilterType = "All" | "Completed" | "Active";
export type ThemeMode = 'dark' | 'light'

export interface Todolist {
	id: string
	title: string
	filter: FilterType
}

export const App = React.memo(() => {

	const [themeMode, setThemeMode] = useState<ThemeMode>('light')
	const todolists = useAppSelector(selectTodolists)
	const tasks = useAppSelector(selectTasks)
	const dispatch = useAppDispatch()

	const theme = createTheme({
		palette: {
			mode: themeMode,
			primary: {
				main: '#ef6c00'
			}
		}
	})

	const changeMode = () => {
		setThemeMode(themeMode === 'light' ? 'dark' : 'light')
	}

	const changeTaskTitle = (todoId: string, taskId: string, title: string) => {
		dispatch(changeTaskTitleAC(todoId, taskId, title))
	}

	const deleteTask = (todoId: string, taskId: string) => {
		dispatch(deleteTasksAC(todoId, taskId));
	}

	const changeFilter = (todoId: string, filter: FilterType) => {
		dispatch(changeTodolistFilterAC(todoId, filter));
	}

	const createTask = (todoId: string, value: string) => {
		dispatch(createTaskAC(todoId, value));
	}

	const changeTaskStatus = (todoId: string, taskId: string, checked: boolean) => {
		dispatch(changeTaskStatusAC(todoId, taskId, checked));
	}

	const deleteTodolist = (todoId: string) => {
		dispatch(deleteTodolistAC(todoId))
	}

	const createTodolist = (title: string) => {
		dispatch(createTodolistAC(title));
	}

	const changeTodolistTitle = (todoId: string, title: string) => {
		dispatch(changeTodolistTitleAC(todoId, title))
	}

	return (
		<ThemeProvider theme={theme}>
			<div className="app">
				<CssBaseline />
				<AppBar position="static" sx={{ mb: '30px' }}>
					<Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
						<Container maxWidth={'lg'} sx={containerSx}>
							<IconButton color="inherit">
								<MenuIcon/>
							</IconButton>
							<div>
								<NavButton>Login</NavButton>
								<NavButton>Logout</NavButton>
								<NavButton background={theme.palette.primary.dark}>Faq</NavButton>
								<ISwitch onChange={changeMode} />
							</div>
						</Container>
					</Toolbar>
				</AppBar>
				<Container maxWidth={'lg'}>
					<Grid container>
						<CreateItemForm onCreateItem={createTodolist}/>
					</Grid>
					<Grid container spacing={4}>
						{todolists.map((todolist: Todolist) => {
							const todolistTasks = tasks[todolist.id]
							let filteredTasks = todolistTasks
							if (todolist.filter === "Active") {
								filteredTasks = todolistTasks.filter((task: TaskType) => !task.isDone)
							}
							if (todolist.filter === "Completed") {
								filteredTasks = todolistTasks.filter((task: TaskType) => task.isDone)
							}
							return (
								<Paper sx={{ p: '0 20px 20px 20px' }}>
									<TodolistItem key={todolist.id}
												  todolist={todolist}
												  tasks={filteredTasks}
												  deleteTask={deleteTask}
												  changeFilter={changeFilter}
												  createTask={createTask}
												  changeTaskStatus={changeTaskStatus}
												  deleteTodolist={deleteTodolist}
												  changeTaskTitle={changeTaskTitle}
												  changeTodolistTitle={changeTodolistTitle}
									/>
								</Paper>
							)
						})}
					</Grid>
				</Container>
			</div>
		</ThemeProvider>
	)
})
