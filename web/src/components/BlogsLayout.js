import React from 'react';
import { Layout, Card, Spin } from 'antd';
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
		<>
			<Spin spinning={loading}>
				{blogs.map((blog) => (
					<Card
						hoverable
						onClick={() => onBlogClick(blog)}
						style={{width: 200, margin: '5pt', display: 'inline-block',}}
						cover={blog.Picture ? <img alt="example" src={blog.Picture}/> :
							<img alt="random" src={"https://picsum.photos/200/300"}/>}
					>
						<Meta title={blog.Title} description={blog.description}/>
					</Card>
				))}
			</Spin>
		</>
	);
}
