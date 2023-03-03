import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const getFreshUser = () => {
	if (localStorage.getItem("user") === null) {
		localStorage.setItem("user", JSON.stringify({
			_id: "",
			FirstName: "",
			LastName: "",
			Email: "",
			Role: "normal"
		}))
	}

	return JSON.parse(localStorage.getItem("user"))
}

export function useAuth() {
	const { user, setUser } = useContext(AuthContext)
	return {
		user,
		setUser: obj => {
			setUser({ ...user, ...obj })
			localStorage.setItem("user", JSON.stringify({ ...user, ...obj }))
		},
		resetUser: () => {
			setUser(getFreshUser())
			localStorage.setItem("user", JSON.stringify(getFreshUser()))
		}
	}
	// return useContext(AuthContext);
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

	const value = { user, setUser };

	return (
		<AuthContext.Provider value={value}>
		  {children}
		</AuthContext.Provider>
	)
}
