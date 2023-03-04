import React, {useEffect} from "react";
import {Layout, Menu, Avatar, Button, Dropdown} from "antd";
import { Outlet } from 'react-router';
import { useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/AuthenticateHook";
import {createAPIEndpoint, ENDPOINTS} from "../api";

const { Header, Content, Footer } = Layout;

const menuItems = [
	{
		key: "1",
		label: "Home",
		path: "/home",
		isProtected: false
	},
	{
		key: "2",
		label: "Blogs",
		path: "/blogs",
		isProtected: false
	},
	{
		key: "3",
		label: "myBlogs",
		path: "/myBlogs",
		isProtected: true
	},
	{
		key: "4",
		label: "ToDos",
		path: "/todos",
		isProtected: true
	},
	{
		key: "5",
		label: "About",
		path: "/about",
		isProtected: false
	}
]

const NavigationBar = () => {
	const { user } = useAuth()

	const [isLoggedIn, setIsLoggedIn] = React.useState(false)

	useEffect(() => {
		setIsLoggedIn(user && user._id && user._id !== "")
	}, [user])

	const navigate = useNavigate()
	const goTo = (path) => {
		console.log(path)
		navigate(path)
	}

	return (
		<Layout className="layout">
			<Header>
				<div className="logo" />
				<div
					style={{
							display: "flex",
							alignItems: "center",
							flexGrow: 1,
							justifyContent: "flex-end",
						}}
					>
					<Menu
						theme="dark"
						mode="horizontal"
						defaultSelectedKeys={["1"]}
						style={{ flexGrow: 1 }}
					>
						{/*TODO: fix selection problem*/}
						{menuItems.map((item) => (
							((item.isProtected && isLoggedIn) || (!item.isProtected)) &&
								<Menu.Item key={item.key}>
									<Button
										type={"text"}
										size={"large"}
										style={{ color: "white", width: "100%" }}
										onClick={() => goTo(item.path)}
									>
										{item.label}
									</Button>
								</Menu.Item>

						))}
					</Menu>

					<div style={{ flexShrink: 0 }}>
						{isLoggedIn &&
							<Dropdown
								overlay={<ProfileDropdown />}
								trigger={['click']}
							>
								<Avatar size="large" src={user.Avatar} />
							</Dropdown>
						}

						{!isLoggedIn &&
							<div style={{ display: "flex", flexDirection: "row" }}>
								<Button
									type={"text"}
									size={"small"}
									style={{ color: "white", width: "100%" }}
									onClick={() => goTo("/login")}
								>
									Login
								</Button>
								<Button
									type={"text"}
									size={"small"}
									style={{ color: "white", width: "100%" }}
									onClick={() => goTo("/register")}
								>
									Register
								</Button>
							</div>
						}
					</div>
				</div>

			</Header>

			<Content style={{ padding: "0", minHeight: "calc(100vh - 134px)" }}>
				<Outlet />
			</Content>

			<Footer>
				Yedil (የድል)  ©2023 Created by Euaell
			</Footer>
		</Layout>
	);
};



const ProfileDropdown = () => {
	const { resetUser } = useAuth()
	const navigate = useNavigate()
	const goTo = (path) => {
		console.log(path)
		navigate(path)
	}
	function logout() {
		console.log("logout")
		createAPIEndpoint(ENDPOINTS.user.get.logout)
			.fetchAll()
			.then((res) => {
				console.log(res)
				goTo("/home")
				resetUser()
			})
			.catch(console.error)
	}

	return (
		<Menu>
			<Menu.Item
				key="0"
				style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}
				onClick={() => goTo("/profile")}
			>
				Profile
			</Menu.Item>

			<Menu.Item
				key="1"
				style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}
				onClick={() => goTo("/settings")}
			>
				Settings
			</Menu.Item>
			<Menu.Divider />
			<Menu.Item
				key="4"
				style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}
				onClick={() => logout()}
			>
				Logout
			</Menu.Item>
		</Menu>
	)
}

export default NavigationBar;
