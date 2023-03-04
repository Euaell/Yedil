import React from "react";
import { createAPIEndpoint, ENDPOINTS } from "../api";
import { Navigate, Outlet } from "react-router";

export default function Authenticate() {
	const [loading, setLoading] = React.useState(true);
	const [user, setUser] = React.useState(null);

	React.useEffect(() => {
	createAPIEndpoint(ENDPOINTS.user.get.verifyUser)
		.fetchAll()
		.then((res) => {
			setUser(res.data.user);
			setLoading(false);
		})
		.catch((err) => {
			console.log(err)
			setLoading(false);
		});
	}, []);

	if (loading) {
		return <div>Loading...</div>;
	}

	if (user) {
		return <Outlet />;
	}

	return <Navigate to="/login" />;
}