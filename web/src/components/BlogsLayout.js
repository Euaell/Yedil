import React from 'react';
import {Layout, Card, Spin, Avatar, Tag} from 'antd';
import { createAPIEndpoint, ENDPOINTS } from "../api";

const { Sider, Content } = Layout;
const { Meta } = Card;

export const BlogsLayout = () => {

	return (
		<Layout
			style={{
				minHeight: '90vh',
				padding: '0',
				margin: '1px',
				width: '99%',
				}}
		>
			<Sider style={{
					backgroundColor: '#238f74',
				}}>
				Sider
			</Sider>
			<Content
				style={{
					alignItems: 'left',
					justifyContent: 'left',
					padding: '0',
					margin: '0',
				}}>
				<Blogs />
			</Content>
		</Layout>
	);
}

const Blogs = () => {
	const [loading, setLoading] = React.useState(true)
	const [blogs, setBlogs] = React.useState([])

	React.useEffect(() => {
		createAPIEndpoint(ENDPOINTS.blog.get.all)
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
					style={{width: 250, margin: '5pt', display: 'inline-block',}}
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
