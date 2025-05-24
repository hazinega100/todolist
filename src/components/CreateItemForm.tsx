import TextField from "@mui/material/TextField";
import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import IconButton from "@mui/material/IconButton";
import AddBoxIcon from '@mui/icons-material/AddBox'

export interface CreateItemType {
	onCreateItem: (title: string) => void
}

export const CreateItemForm = React.memo(({onCreateItem}: CreateItemType) => {
	const [inputValue, setInputValue] = useState<string>("")
	const [error, setError] = useState<string | boolean>(false)

	const createItemHandler = () => {
		if (inputValue.trim() !== "") {
			onCreateItem(inputValue.trim());
			setInputValue("");
		} else {
			setError('Title is required');
		}
	}

	const onChangeInputValue = (e: ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.currentTarget.value)
		setError(false);
	}

	const onCreateItemPushEnter = (event: KeyboardEvent<HTMLInputElement>) => {
		if (event.key === "Enter") {
			createItemHandler()
		}
	}
	return (
		<div>
			<TextField label={'Enter a title'}
					   value={inputValue}
					   variant={'outlined'}
					   size={'small'}
					   helperText={error}
					   error={!!error}
					   onChange={onChangeInputValue}
					   onKeyDown={onCreateItemPushEnter}
			/>
			<IconButton onClick={createItemHandler} color={'primary'} sx={{mb: '30px'}}>
				<AddBoxIcon />
			</IconButton>
		</div>
	);
})