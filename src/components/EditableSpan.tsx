import React, {ChangeEvent, FC, useState} from "react";
import TextField from "@mui/material/TextField";

interface EditableSpanType {
	value: string
	onChange?: (title: string) => void
}

export const EditableSpan: FC<EditableSpanType> = React.memo(({value, onChange}) => {
	const [isEditMode, setIsEditMode] = useState<boolean>(false)
	const [title, setTitle] = useState<string>(value)

	const turnOnEditMode = () => {
		setIsEditMode(true);
	}

	const turnOffEditMode = () => {
		setIsEditMode(false)
		if (onChange) {
			onChange(title)
		}
	}

	const changeTitle  = (e: ChangeEvent<HTMLInputElement>) => {
		setTitle(e.currentTarget.value)
	}

	return (
		<>
			{
				isEditMode
					?
					<TextField variant={'outlined'}
							   value={title}
							   size={'small'}
							   onChange={changeTitle}
							   onBlur={turnOffEditMode}
							   autoFocus/>
					:
					<span onDoubleClick={turnOnEditMode}>{value}</span>
			}
		</>
	);
})