import { useState } from 'react'

export default function useForm(initial = {}, formName = "") {
	// Create a state object for our inputs
	const [inputs, setInputs] = useState(formName ? JSON.parse(localStorage.getItem(formName)) || initial : initial)
	const [errors, setErrors] = useState({})

	function resetForm() {
		setInputs(initial)
		if (formName) {
			localStorage.removeItem(formName)
		}
	}
	function clearForm() {
		const blankState = Object.fromEntries(
			Object.entries(inputs).map(([key, value]) => [key, ''])
		)
		setInputs(blankState)
	}

	function handleChange(e) {
		let { value, name, type } = e.target
		if (type === 'number') {
			value = parseInt(value)
		}
		if (type === 'file') {
			[value] = e.target.files
		}
		setInputs({
			...inputs,
			[name]: value,
		})
		if (formName) {
			localStorage.setItem(formName, JSON.stringify(inputs))
		}
	}

	// Return the things we want to surface from this custom hook
	return {
		inputs,
		handleChange,
		resetForm,
		clearForm,
		setInputs,
		errors,
		setErrors
	}
}