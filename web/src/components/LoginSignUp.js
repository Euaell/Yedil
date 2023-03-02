import React from "react";
import {Layout, Form, Input, Button, Col, Row, Select} from "antd";
import {useNavigate} from "react-router-dom";

const { Content } = Layout;
const { Option } = Select;

const Login = () => {
	const navigate = useNavigate()
	const handleForgotPassword = () => {
		console.log("Forgot password");
	};
	const handleNavigateToSignup = () => {
		navigate("/register");
	};
	return (
		<Layout style={{ minHeight: "100vh", backgroundImage: `url("https://images.unsplash.com/photo-1563081243-3a6d3b6e2d6d")`, backgroundSize: "cover" }}>
			<Content style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
				<Form style={{ width: "300px", backgroundColor: "rgba(255, 255, 255, 0.8)", padding: "20px", borderRadius: "10px" }}>
					<Form.Item>
						<h2 style={{ textAlign: "center" }}>Login</h2>
					</Form.Item>
					<Form.Item>
						<Input placeholder="Email" />
					</Form.Item>
					<Form.Item>
						<Input.Password placeholder="Password" />
					</Form.Item>
					<Form.Item>
						<Button type="primary" htmlType="submit" block>
							Login
						</Button>
					</Form.Item>
					<Form.Item>
						<Row justify="end">
							<Col>
								<Button type="primary" onClick={handleNavigateToSignup}>
									Sign up
								</Button>
							</Col>
							<Col>
								<Button type="link" onClick={handleForgotPassword}>
									Forgot password?
								</Button>
							</Col>
						</Row>
					</Form.Item>

				</Form>
			</Content>
		</Layout>
	);
};

const Signup = () => {
	const navigate = useNavigate()
	const handleNavigateToLogin = () => {
		navigate("/login");
	};
	return (
		<Layout style={{ minHeight: "100vh", backgroundImage: `url("https://images.unsplash.com/photo-1515377905700-a2ebf9c9cbd7")`, backgroundSize: "cover" }}>
			<Content style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
				<Form style={{ width: "300px", backgroundColor: "rgba(255, 255, 255, 0.8)", padding: "20px", borderRadius: "10px" }}>
					<Form.Item>
						<h2 style={{ textAlign: "center" }}>Sign Up</h2>
					</Form.Item>

					<Row gutter={8}>
						<Col span={12}>
							<Form.Item>
								<Input placeholder="First Name" />
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item>
								<Input placeholder="Last Name" />
							</Form.Item>
						</Col>
					</Row>

					<Row gutter={8}>
						<Col span={15}>
							<Form.Item>
								<Input placeholder="Email" />
							</Form.Item>
						</Col>
						<Col span={9}>
							<Form.Item>
								<Select defaultValue="Option1">
									{/*TODO: placeholder*/}
									<Option value="male">Male</Option>
									<Option value="female">Female</Option>
								</Select>
							</Form.Item>
						</Col>
					</Row>

					<Form.Item>
						<Input.Password placeholder="Password" />
					</Form.Item>
					<Form.Item>
						<Input.Password placeholder="Confirm Password" />
					</Form.Item>
					<Form.Item>
						<Button type="primary" htmlType="submit" block>
							Sign Up
						</Button>
					</Form.Item>
					<Form.Item>
						<Row justify="end">
							<Col>
								<Button type="link" onClick={handleNavigateToLogin}>
									Already have an account?
								</Button>
							</Col>
						</Row>
					</Form.Item>
				</Form>
			</Content>
		</Layout>
	);
};

export { Login, Signup };
