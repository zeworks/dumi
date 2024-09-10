import { Input, InputProps } from "./ui/input"

type InputControllerProps = InputProps & {
	register: any
	errors?: Record<string, { message?: string }>
	name: string
}

export function InputController({
	register,
	name,
	errors,
	...rest
}: InputControllerProps) {
	return (
		<>
			<Input {...register(name)} {...rest} />
			{!!errors?.[name]?.message && (
				<p className="text-red-500 text-xs mt-2">{errors?.[name]?.message}</p>
			)}
		</>
	)
}
