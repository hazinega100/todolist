import {Button} from "./Button.tsx";
import {ChangeEvent, KeyboardEvent, useState} from "react";

export interface CreateItemType {
	onCreateItem: (title: string) => void
}

export const CreateItemForm = ({onCreateItem}: CreateItemType) => {
	const [inputValue, setInputValue] = useState<string>("")
	const [error, setError] = useState<string | null>(null)

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
		setError(null);
	}

	const onCreateItemPushEnter = (event: KeyboardEvent<HTMLInputElement>) => {
		if (event.key === "Enter") {
			createItemHandler()
		}
	}
	return (
		<div>
			<input className={error ? 'error' : ''}
				   value={inputValue}
				   onChange={onChangeInputValue}
				   onKeyDown={onCreateItemPushEnter}
			/>
			<Button title={"+"} onClick={createItemHandler}/>
			{error && <div className='error-message'>{error}</div>}
		</div>
	);
};