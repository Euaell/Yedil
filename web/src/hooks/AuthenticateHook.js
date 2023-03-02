import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const getFreshUser = () => {
	if (localStorage.getItem("user") === null) {
		localStorage.setItem("user", JSON.stringify({
			_id: "",
			FistName: "",
			LastName: "",
			Email: "",
			Role: "normal"
		}))
	}

	return JSON.parse(localStorage.getItem("user"))
}

export function useAuth() {
	return useContext(AuthContext);
}

export function AuthProvider({ children }) {
	const [user, setUser] = useState(getFreshUser());

	useEffect(() => {
		const storedUser = localStorage.getItem('user');
		if (storedUser) {
			setUser(JSON.parse(storedUser));
		}
	}, []);

	useEffect(() => {
		localStorage.setItem('user', JSON.stringify(user))
	}, [user])

	async function signIn(email, password) {
		try {
			const response = await axios.post('/api/auth/signin', { email, password });
			const user = response.data;
			localStorage.setItem('user', JSON.stringify(user));
			setUser(user);
		} catch (error) {
		  console.error(error);
		  throw error;
		}
	}

	function signOut() {
		localStorage.removeItem('user');
		setUser(null);
	}

	const value = { user, signIn, signOut };

	return (
		<AuthContext.Provider value={value}>
		  {children}
		</AuthContext.Provider>
	)
}
