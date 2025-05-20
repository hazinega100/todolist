export interface IButton {
	title: string
	onClick?: () => void
	className?: string
}

export const Button = ({title, onClick, className}: IButton) => {
	return (
		<button className={className} onClick={onClick}>
			{title}
		</button>
	);
};