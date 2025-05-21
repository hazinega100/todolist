import {ChangeEvent, FC, useState} from "react";

interface EditableSpanType {
	value: string
	onChange?: (title: string) => void
}

export const EditableSpan: FC<EditableSpanType> = ({value, onChange}) => {
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
					<input value={title}
						   autoFocus
						   onChange={changeTitle }
						   onBlur={turnOffEditMode}
					/>
					:
					<span onDoubleClick={turnOnEditMode}>{value}</span>
			}
		</>
	);
}