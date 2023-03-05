import React, { useState } from "react";
import { Card, Checkbox, Button, Form, Input, DatePicker } from "antd";

const TodoList2 = () => {
	const [todos, setTodos] = useState([]);
	const [showAddForm, setShowAddForm] = useState(false);
	const [form] = Form.useForm();

	const handleAddTodo = (values) => {
		const newTodo = {
			name: values.name,
			tasks: values.tasks.split(","),
			deadline: values.deadline ? values.deadline.format("YYYY-MM-DD") : null,
			completed: false,
		};
		setTodos([...todos, newTodo]);
		setShowAddForm(false);
		form.resetFields();
	};

	const handleCompleteTodo = (index) => {
		const newTodos = [...todos];
		newTodos[index].completed = !newTodos[index].completed;
		setTodos(newTodos);
	};

	const handleDeleteTodo = (index) => {
		const newTodos = [...todos];
		newTodos.splice(index, 1);
		setTodos(newTodos);
	};

	return (
		<div style={{ maxWidth: 800, margin: "0 auto" }}>
			<div style={{ marginBottom: 16 }}>
				<Button onClick={() => setShowAddForm(true)}>Add Todo</Button>
			</div>
			{showAddForm && (
				<Form layout="inline" form={form} onFinish={handleAddTodo}>
					<Form.Item
						label="Name"
						name="name"
						rules={[{ required: true, message: "Please enter a name" }]}
					>
						<Input />
					</Form.Item>
					<Form.Item label="Tasks" name="tasks">
						<Input />
					</Form.Item>
					<Form.Item label="Deadline" name="deadline">
						<DatePicker />
					</Form.Item>
					<Form.Item>
						<Button type="primary" htmlType="submit">
							Add
						</Button>
					<Button onClick={() => setShowAddForm(false)}>Cancel</Button>
					</Form.Item>
				</Form>
			)}
			{todos.map((todo, index) => (
				<Card
					key={index}
					style={{ marginBottom: 16 }}
					actions={[
						<Button type="link" onClick={() => handleDeleteTodo(index)}>
							Remove
						</Button>,
					]}
				>
					<Checkbox
						checked={todo.completed}
						onChange={() => handleCompleteTodo(index)}
					>
						<span style={{ marginLeft: 8 }}>{todo.name}</span>
					</Checkbox>
					{todo.tasks.map((task, taskIndex) => (
						<div key={taskIndex} style={{ paddingLeft: 24 }}>
							<Checkbox>{task}</Checkbox>
						</div>
					))}
					{todo.deadline && (
						<div style={{ marginTop: 8 }}>
							Deadline: {new Date(todo.deadline).toLocaleDateString()}
						</div>
					)}
				</Card>
			))}
		</div>
	);
};

export default TodoList2;
