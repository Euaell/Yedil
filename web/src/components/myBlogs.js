import React from "react";
import { createAPIEndpoint, ENDPOINTS } from "../api";
import {Card, Spin, Layout, Menu, Form, Input, Button, Upload, Select, Avatar, Tag} from "antd";
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import {UploadOutlined} from "@ant-design/icons";
import useForm from "../hooks/useForm";
import {useNavigate} from "react-router-dom";

const { Header, Sider, Content } = Layout;
const { Meta } = Card;

const MyBlogs = () => {
	const [loading, setLoading] = React.useState(true)
	const [blogs, setBlogs] = React.useState([])

	React.useEffect(() => {
		createAPIEndpoint(ENDPOINTS.blog.get.byUser)
			.fetchAll()
			.then((res) => {
				console.log(res.data.blogs)
				setBlogs(res.data.blogs)
				setLoading(false)
			})
			.catch((err) => console.log(err))
	}, [])

	function onBlogClick(blog) {
		console.log(blog)
	}

	return (
		<Spin spinning={loading}>
			{blogs.map((blog) => (
				<Card
					hoverable
					onClick={() => onBlogClick(blog)}
					style={{width: 250, margin: '5pt', display: 'inline-block' }}
					cover={blog.Picture ? <img alt="example" src={blog.Picture} height={"200px"}/> :
						<img alt="random" src={"https://picsum.photos/200/300"} height={"200px"}/>}
				>
					<Meta
						style={{borderBottom: '1pt solid #00000038', width: '100%', marginBottom: '15pt'}}
						avatar={<Avatar src="https://joesch.moe/api/v1/random" />}
						title={blog.Title}
						description={`By ${blog.author.FirstName} ${blog.author.LastName}`}
					/>
					<div
						style={{
								display: 'block',
								width: '100%',
								overflow: 'hidden',
								textOverflow: 'ellipsis',
								whiteSpace: 'nowrap',
								marginBottom: '15pt',
							}}
					>
						{ blog.Description }
					</div>

					<div
						style={{
								display: 'flex',
								flexFlow: 'row wrap',
								marginBottom: '15pt',
							}}
					>
						{blog.Tags.map((tag) => (
							<Tag
								style={{ margin: '2pt 2pt' }}
								color="green">
								{tag.Name}
							</Tag>
						))}
					</div>
				</Card>
			))}
		</Spin>
	);
}

const freshBlogModel = {
	Title: '',
	Description: '',
	Content: '',
	Tags: [],
	Picture: ''
}

const CreateBlog = () => {
	const [tagOptions, setTagOptions] = React.useState([])
	const [markdown, setMarkdown] = React.useState('');

	const navigate = useNavigate()

	const { inputs, handleChange, setInputs, errors, setErrors } = useForm(freshBlogModel)

	React.useEffect(() => {
		createAPIEndpoint(ENDPOINTS.tags.get.all)
			.fetchAll()
			.then(async (res) => {
				setTagOptions(res.data.tags.map((tag) => {
					return {label: tag.Name, value: tag.Name}
				}))
			})
			.catch((err) => console.log(err))
	}, [])

	const handleSubmit = (values) => {
		if (validate()) {
			createAPIEndpoint(ENDPOINTS.blog.post.create)
				.post(inputs)
				.then((res) => {
					console.log(res)
					navigate('/blogs')
				})
				.catch((err) => {
					console.log(err.response.data)
					setErrors({
						...errors,
						...err.response.data
					})
				})
		}
	};

	const handleMarkdownChange = (event) => {
		handleChange(event)
		setMarkdown(event.target.value);
	};

	function normFile(e) {
		console.log('Upload event:', e);
		if (Array.isArray(e)) {
			return e;
		}
		return e && e.fileList;
	}

	function validate() {
		let temp = {}
		temp.Title = inputs.Title ? "" : "This field is required."
		temp.Description = inputs.Description ? "" : "This field is required."
		temp.Content = inputs.Content ? "" : "This field is required."
		temp.Tags = inputs.Tags && inputs.Tags.length > 0 && inputs.Tags[0] !== '' ? "" : "This field is required."
		setErrors({
			...temp
		})
		return Object.values(temp).every(x => x === "")
	}

	function handleTagChange(value) {
		setInputs({
			...inputs,
			"Tags": value.toString().split(',')
		})
	}

	return (
		<Layout style={{ minHeight: "100vh" }}>
			{/*Logo and Name*/}
			<Header style={{ display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "rgba(186,214,255,0.26)" }}>
				<h1 style={{ color: "#000000", cursor: "pointer" }}>
					Create Blog
				</h1>
			</Header>
			<Content style={{ display: "flex", justifyContent: "center", alignItems: "flex-start", padding: "10pt" }}>

				<Form
					onFinish={handleSubmit}
					style={{ width: "500px", alignItems: "left", backgroundColor: "rgba(255, 255, 255, 0.8)", padding: "10pt", borderRadius: "15px", boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.2)", marginRight: "20px" }}
				>
					<Form.Item name="Title"
							   label="Title"
							   validateStatus={errors.Title && errors.Title.length > 0 ? "error" : "success"}
							   help={errors.Title}
					>
						<Input
							name="Title"
							value={inputs.Title}
							onChange={handleChange}
						/>
					</Form.Item>
					<Form.Item name="Description"
							   label="Description"
							   validateStatus={errors.Description && errors.Description.length > 0 ? "error" : "success"}
							   help={errors.Description}
					>
						<Input
							name="Description"
							value={inputs.Description}
							onChange={handleChange}
						/>
					</Form.Item>
					<Form.Item
							   label="Tags"
							   validateStatus={errors.Tags && errors.Tags.length > 0 ? "error" : "success"}
							   help={errors.Tags}
					>
						<Select
							mode="tags"
							style={{
								width: '100%',
							}}
							placeholder="Tags"
							name={"Tags"}
							onChange={handleTagChange}
							options={tagOptions}
						/>
					</Form.Item>
					<Form.Item name="Content" label="Content">
						<Input.TextArea onChange={handleMarkdownChange}
										name="Content"
										value={inputs.Content}
						/>
					</Form.Item>
					<Form.Item
						name="upload"
						label="Upload"
						valuePropName="fileList"
						getValueFromEvent={normFile}
						extra="You can Include Thumbnail images which is optional"
					>
						<Upload
							name="Picture"
							action={"/upload.do"}
							listType="picture"
							multiple={false}
						>
							<Button icon={<UploadOutlined />}>Click to upload</Button>
						</Upload>
					</Form.Item>
					<Form.Item>
						<Button type="primary" danger htmlType="submit">
							Post
						</Button>
					</Form.Item>
					<Form.Item label={"Preview"} style={{backgroundColor: "beige"}}>
						<ReactMarkdown remarkPlugins={[gfm]} children={markdown} />
					</Form.Item>
				</Form>
			</Content>
		</Layout>
	);
}

export const MyBlogsLayout = () => {
	const [disIndex, setDisIndex] = React.useState(0);

	const children = [
		<MyBlogs />,
		<CreateBlog />,
	];

	return (
		<Layout
			style={{
				minHeight: '90vh',
			}}
		>
			<Sider style={{
				backgroundColor: '#238f74',
			}}>
				<Menu
					style={{
						backgroundColor: '#238f74',
						color: 'white',
					}}
					mode="inline"
					defaultSelectedKeys={['1']}
				>
					<Menu.Item key="1" onClick={() => setDisIndex(0)}>
						My Blogs
					</Menu.Item>
					<Menu.Item key="2" onClick={() => setDisIndex(1)}>
						Create Blogs
					</Menu.Item>
				</Menu>
			</Sider>
			<Content
				style={{
					alignItems: 'left',
					justifyContent: 'left',
					padding: '0',
					margin: '0',
				}}>
				{children[disIndex]}
			</Content>
		</Layout>
	);
}