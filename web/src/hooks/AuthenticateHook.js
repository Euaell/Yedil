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

const getFreshToken = () => {
    if (localStorage.getItem("token") === null) {
        localStorage.setItem("token", null)
    }

    return localStorage.getItem("token");
}

export function useAuth() {
	const { user, setUser } = useContext(AuthContext)
	const {token, setToken} = useContext(AuthContext);

	return {
		user,
		setUser: obj => {
			setUser({ ...user, ...obj })
			localStorage.setItem("user", JSON.stringify({ ...user, ...obj }))
		},
		resetUser: () => {
			setUser(getFreshUser())
			localStorage.setItem("user", JSON.stringify(getFreshUser()))
		},
		token,
		setToken: obj => {
			setToken(obj)
			localStorage.setItem("token", obj)
		},
		resetToken: () => {
			setToken(getFreshToken())
			localStorage.removeItem("token")
		}
	}
	// return useContext(AuthContext);
}

export function AuthProvider({ children }) {
	const [user, setUser] = useState(getFreshUser());
	const [token, setToken] = useState(getFreshToken());

	useEffect(() => {
		const storedUser = localStorage.getItem('user');
		if (storedUser) {
			setUser(JSON.parse(storedUser));
		}
	}, []);

	useEffect(() => {
		localStorage.setItem('user', JSON.stringify(user))
	}, [user])

	useEffect(() => {
        localStorage.setItem("token", token);
    }, [token]);

	const value = { user, setUser, token, setToken };

	return (
		<AuthContext.Provider value={value}>
		  {children}
		</AuthContext.Provider>
	)
}
