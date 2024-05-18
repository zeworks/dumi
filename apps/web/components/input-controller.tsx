import { Input, InputProps } from "./ui/input"

type InputControllerProps = InputProps & {
	register: any
	control: any
	name: string
}

export function InputController({
	register,
	control,
	...rest
}: InputControllerProps) {
	return (
		<>
			<Input {...register} {...rest} />
			{control.getFieldState(rest.name)?.error?.message && (
				<p className="text-red-500 text-xs">
					{control.getFieldState(rest.name).error?.message}
				</p>
			)}
		</>
	)
}
