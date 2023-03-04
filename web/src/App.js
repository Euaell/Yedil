import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import {Login, Signup} from "./components/LoginSignUp";
import {BlogsLayout} from "./components/BlogsLayout";
import Authenticate from "./components/Authenticate";
import {MyBlogsLayout} from "./components/myBlogs";

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Routes>

					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Signup />} />

					<Route path="/" element={<Navbar />} >
						<Route path="home" element={<h1>Home</h1>} />
						<Route path="about" element={<h1>about</h1>} />
						<Route path="blogs" element={<BlogsLayout />} />

						<Route element={<Authenticate />}>
							<Route path="myBlogs" element={<MyBlogsLayout />} />
							<Route path="todos" element={<h1>todos</h1>} />
						</Route>

					</Route>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
