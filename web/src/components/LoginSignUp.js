import React from "react";
import { Layout, Form, Input, Button, Col, Row, Select } from "antd";
import { useNavigate } from "react-router-dom";
import useForm from "../hooks/useForm"
import { useAuth } from "../hooks/AuthenticateHook";
import {LockOutlined, MailOutlined, NumberOutlined, UserOutlined} from "@ant-design/icons";
import { createAPIEndpoint, ENDPOINTS } from "../api";

const { Header, Content } = Layout;
const { Option } = Select;

const freshLoginModel = {
	Email: "",
	Password: ""
}

const freshSignUpModel = {
	FirstName: "",
	LastName: "",
	Email: "",
	Password: "",
	ConfirmPassword: "",
	Gender: "",
	Role: "normal",
	verificationCode: ""
}

const Login = () => {
	const { setUser, setToken } = useAuth()
	const navigate = useNavigate()

	const { inputs, handleChange, errors, setErrors } = useForm(freshLoginModel)

	const handleForgotPassword = () => {
		console.log("Forgot password");
	};
	const handleNavigateToSignup = () => {
		navigate("/register");
	};

	function handleLogin() {
		console.log(inputs)
		if (validate()) {
			createAPIEndpoint(ENDPOINTS.user.post.login)
				.post(inputs)
				.then(res => res.data)
				.then(res => {
					setUser(res.user)
					setToken(res.token)
					navigate("/home")
				})
				.catch(err => {
					console.log(err.response.data)
					setErrors({
						...errors,
						...err.response.data
					})
				})
		}
	}

	function validate() {
		let temp = {}
		temp.Email = inputs.Email ? "" : "Email is required"
		temp.Password = inputs.Password ? "" : "Password is required"
		setErrors({
			...temp
		})
		return Object.values(temp).every(x => x === "")
	}

	return (
		<Layout style={{ minHeight: "100vh" }}>
			{/*Logo and Name*/}
			<Header style={{ display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "rgba(186,214,255,0.26)" }}>
				<h1 style={{ color: "#000000", cursor: "pointer" }}
					onClick={() => {
						navigate("/home")}
					}
				>
					Yedil (የድል)
				</h1>
			</Header>
			<Content style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
				<Form style={{ width: "300px", backgroundColor: "rgba(255, 255, 255, 0.8)", padding: "20px", borderRadius: "10px", boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.2)" }}
					onFinish={handleLogin}
				>
					<Form.Item>
						<h2 style={{ textAlign: "center" }}>Login</h2>
					</Form.Item>
					<Form.Item
						validateStatus={errors.Email && errors.Email !== "" ? "error" : "success"}
						help={errors.Email}
					>
						<Input
							prefix={<UserOutlined className="site-form-item-icon" />}
							name={"Email"}
							value={inputs.Email}
							placeholder="Email"
							onChange={handleChange}
							rules={[{ required: true, message: 'Please input your Email!' }]}
						/>
					</Form.Item>
					<Form.Item
						validateStatus={errors.Password && errors.Password !== "" ? "error" : "success"}
						help={errors.Password}
					>
						<Input.Password
							prefix={<LockOutlined className="site-form-item-icon" />}
							name={"Password"}
							value={inputs.Password}
							placeholder="Password"
							onChange={handleChange}
							rules={[{ required: true, message: 'Please input your Password!' }]}
						/>
					</Form.Item>
					<Form.Item>
						<Button type="primary" htmlType="submit" block>
							Login
						</Button>
					</Form.Item>
					<Form.Item>
						<Row justify="end">
							<Row>
								<Button type="link" onClick={handleNavigateToSignup}>
									Don't have an account? Sign up
								</Button>
							</Row>
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
	const { setUser } = useAuth()
	const [verifyEmail, setVerifyEmail] = React.useState("Send Code")

	const { inputs, handleChange, errors, setErrors, setInputs } = useForm(freshSignUpModel)

	const navigate = useNavigate()
	const handleNavigateToLogin = () => {
		navigate("/login");
	};
	const handleVerifyEmail = () => {
		setVerifyEmail("Sending...")
		if (verifyEmail === "Send Code") {
			createAPIEndpoint(ENDPOINTS.user.post.verifyEmail)
				.post(inputs)
				.then(res => res.data)
				.then(res => {
					console.log(res)
					setVerifyEmail("Resend Code")
				})
				.catch(err => {
					console.log(err.response.data)
					setVerifyEmail("Resend Code")
					setErrors({
						...errors,
						...err.response.data
					})
				})
		} else {
			createAPIEndpoint(ENDPOINTS.user.post.resendEmail)
				.post(inputs)
				.then(res => res.data)
				.then(res => {
					console.log(res)
					setVerifyEmail("Resend Code")
				})
				.catch(err => {
					console.log(err.response.data)
					setVerifyEmail("Resend Code")
					setErrors({
						...errors,
						...err.response.data
					})
				})
		}
	};

	function handleSignup() {
		if (validate()) {
			createAPIEndpoint(ENDPOINTS.user.post.register)
				.post(inputs)
				.then(res => res.data)
				.then(res => {
					setUser(res.user)
					navigate("/login")
				})
				.catch(err => {
					console.log(err.response.data)
					setErrors({
						...errors,
						...err.response.data
					})
				})
		}
	}

	function validate() {
		let temp = {}
		temp.Email = inputs.Email ? "" : "Email is required"
		temp.Password = inputs.Password ? "" : "Password is required"
		temp.ConfirmPassword = inputs.ConfirmPassword ? "" : "Confirm Password is required"
		temp.ConfirmPassword = inputs.ConfirmPassword === inputs.Password ? "" : "Passwords do not match"
		temp.FirstName = inputs.FirstName ? "" : "First Name is required"
		temp.LastName = inputs.LastName ? "" : "Last Name is required"
		temp.verificationCode = inputs.verificationCode ? "" : "Verification Code is required"
		setErrors({
			...temp
		})
		return Object.values(temp).every(x => x === "")
	}

	return (
		<Layout style={{ minHeight: "100vh" }}>
			{/*Logo and Name*/}
			<Header style={{ display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "rgba(186,214,255,0.26)" }}>
				<h1 style={{ color: "#000000", cursor: "pointer" }}
					onClick={() => {
						navigate("/home")}
					}
				>
					Yedil (የድል)
				</h1>
			</Header>
			<Content style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
				<Form style={{ width: "400px", backgroundColor: "rgba(255, 255, 255, 0.8)", padding: "20px", borderRadius: "15px", boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.2)" }} onFinish={handleSignup}>
					<Form.Item>
						<h2 style={{ textAlign: "center" }}>Sign Up</h2>
					</Form.Item>

					<Row gutter={8}>
						<Col span={15}>
							<Form.Item
								validateStatus={errors.Email && errors.Email !== "" ? "error" : "success"}
								help={errors.Email}
							>
								<Input
									name={"Email"}
									onChange={handleChange}
									value={inputs.Email}
									prefix={<MailOutlined className="site-form-item-icon" />}
									placeholder="Email"
								/>
							</Form.Item>
						</Col>
						<Col span={9}>
							<Button onClick={handleVerifyEmail} type="dashed">
								{ verifyEmail }
							</Button>
						</Col>
					</Row>

					<Row gutter={8}>
						<Col span={12}>
							<Form.Item
								validateStatus={ errors.FirstName && errors.FirstName !== "" ? "error" : "success"}
								help={errors.FirstName}
							>
								<Input
									name={"FirstName"}
									onChange={handleChange}
									value={inputs.FirstName}
									placeholder="First Name"
								/>
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item
								validateStatus={errors.LastName && errors.LastName !== "" ? "error" : "success"}
								help={errors.LastName}
							>
								<Input
									name={"LastName"}
									onChange={handleChange}
									value={inputs.LastName}
									placeholder="Last Name"
								/>
							</Form.Item>
						</Col>
					</Row>

					<Row gutter={8}>
						<Col span={14}>
							<Form.Item
								validateStatus={errors.verificationCode && errors.verificationCode !== "" ? "error" : "success"}
								help={errors.verificationCode}
							>
								<Input
									prefix={<NumberOutlined className="site-form-item-icon" />}
									name={"verificationCode"}
									onChange={handleChange}
									value={inputs.verificationCode}
									placeholder="Verification Code"
								/>
							</Form.Item>
						</Col>
						<Col span={10}>
							<Form.Item
								validateStatus={errors.Gender && errors.Gender !== "" ? "error" : "success"}
								help={errors.Gender}
								rules={[{ required: true }]}
							>
								<Select
									name={"Gender"}
									onChange={(value) => {setInputs({...inputs, Gender: value})}}
									placeholder={"Gender"}
									allowClear
								>
									{/*TODO: placeholder*/}
									<Option value="male">Male</Option>
									<Option value="female">Female</Option>
								</Select>
							</Form.Item>
						</Col>
					</Row>

					<Form.Item
						validateStatus={errors.Password && errors.Password !== "" ? "error" : "success"}
						help={errors.Password}
					>
						<Input.Password
							name={"Password"}
							onChange={handleChange}
							value={inputs.Password}
							placeholder="Password"
						/>
					</Form.Item>
					<Form.Item
						validateStatus={errors.ConfirmPassword && errors.ConfirmPassword !== "" ? "error" : "success"}
						help={errors.ConfirmPassword}
					>
						<Input.Password
							name={"ConfirmPassword"}
							onChange={handleChange}
							value={inputs.ConfirmPassword}
							placeholder="Confirm Password"
						/>
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
