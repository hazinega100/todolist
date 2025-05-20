export interface IButton {
	title: string
	onClick?: () => void
}

export const Button = ({title, onClick}: IButton) => {
	return (
		<button onClick={onClick}>
			{title}
		</button>
	);
};