"use client"
import { useState, useEffect, Dispatch, SetStateAction } from "react"

const isBrowser = typeof window !== "undefined"

function useLocalStorage<T>(
	key: string,
	initialValue: T
): [T, Dispatch<SetStateAction<T>>] {
	// Get the initial state from localStorage or use the provided initialValue
	const [storedValue, setStoredValue] = useState<T>(() => {
		if (!isBrowser) return initialValue

		try {
			const item = window.localStorage.getItem(key)
			if (!item || item === "undefined") return initialValue

			return item ? (JSON.parse(item) as T) : initialValue
		} catch (error) {
			console.error(error)
			return initialValue
		}
	})

	// Create a function to update the state and localStorage
	const setValue: Dispatch<SetStateAction<T>> = (value: SetStateAction<T>) => {
		try {
			const valueToStore =
				value instanceof Function ? value(storedValue) : value
			setStoredValue(valueToStore)

			if (isBrowser)
				window.localStorage.setItem(key, JSON.stringify(valueToStore))
		} catch (error) {
			console.error(error)
		}
	}

	// Update localStorage whenever the state changes
	useEffect(() => {
		if (isBrowser)
			try {
				window.localStorage.setItem(key, JSON.stringify(storedValue))
			} catch (error) {
				console.error(error)
			}
	}, [key, storedValue])

	return [storedValue, setValue]
}

export default useLocalStorage
