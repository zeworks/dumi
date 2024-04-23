import { Button } from "./ui/button"

type EmptyContentProps = {
	title?: string
	message?: string
	buttonText?: string
	buttonAction?: () => void
}

export function EmptyContent({
	title,
	message,
	buttonText,
	buttonAction,
}: EmptyContentProps) {
	return (
		<div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
			<div className="flex flex-col items-center gap-1 text-center">
				<h3 className="text-2xl font-bold tracking-tight">{title}</h3>
				<p className="text-sm text-muted-foreground">{message}</p>
				{!!buttonText && (
					<Button className="mt-4" onClick={buttonAction}>
						{buttonText}
					</Button>
				)}
			</div>
		</div>
	)
}
