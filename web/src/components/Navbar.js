import React from "react";
import { Layout, Menu, Avatar, Button } from "antd";
import { Outlet } from 'react-router';
import { useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/AuthenticateHook";

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
	const navigate = useNavigate()
	const { user, signOut } = useAuth()
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
						defaultSelectedKeys={["2"]}
						style={{ flexGrow: 1 }}
					>

						{menuItems.map((item) => (
							((item.isProtected && user._id !== "") || (!item.isProtected)) &&
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
						{user._id !== "" &&
							<Avatar size="large" src="https://i.pravatar.cc/50" />
						}

						{user._id === "" &&
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

			<Content style={{ padding: "0 50px", minHeight: "calc(100vh - 134px)" }}>
				<Outlet />
			</Content>

			<Footer>
				Yedil (የድል)  ©2023 Created by Euaell
			</Footer>
		</Layout>
	);
};

export default NavigationBar;
