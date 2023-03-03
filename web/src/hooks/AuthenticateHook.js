import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const getFreshUser = () => {
	return {
		_id: "",
		FirstName: "",
		LastName: "",
		Email: "",
		Role: "normal",
		Avatar: "https://i.pravatar.cc/50",
	}
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
