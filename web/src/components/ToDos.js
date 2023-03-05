import React, { useState } from 'react';
import {Card, Button, List, Checkbox, Form, Input, DatePicker, Popconfirm, message, Divider} from 'antd';
import {createAPIEndpoint, ENDPOINTS} from "../api";

const TodoList = () => {
	const [todos, setTodos] = useState([]);
	const [formVisible, setFormVisible] = useState(false);

	React.useEffect(() => {
		createAPIEndpoint(ENDPOINTS.todo.get.all)
			.fetchAll()
			.then(res => {
				console.log(res.data.toDoLists);
				setTodos(res.data.toDoLists);
			})
			.catch(err => console.log(err));
	}, [])

	// Handler to show or hide the form
	const toggleFormVisible = () => {
		setFormVisible(!formVisible);
	};

	// Handler to add a new todos
	const handleAddTodo = (values) => {
		const newTodo = {
			Name: values.Name,
			Tasks: values.Tasks.split(',').map((task) => ({ Description: task.trim(), isCompleted: false })),
			Deadline: values.Deadline ? values.Deadline.format('YYYY-MM-DD') : null,
		};
		createAPIEndpoint(ENDPOINTS.todo.post.create)
			.post(newTodo)
			.then(res => {
				console.log(res.data);
				setTodos([...todos, newTodo]);
				toggleFormVisible();
			})
			.catch(err => console.log(err));
	};

	// Handler to mark a task as finished
	const handleTaskFinish = (todoIndex, taskIndex) => {
		const newTodos = [...todos];
		newTodos[todoIndex].Tasks[taskIndex].isCompleted = !newTodos[todoIndex].Tasks[taskIndex].isCompleted;

		createAPIEndpoint(ENDPOINTS.todo.put.updateTask)
			.put(newTodos[todoIndex]._id, { Tasks: newTodos[todoIndex].Tasks })
			.then(res => {
				console.log(res.data);
				setTodos(newTodos);
			})
			.catch(err => console.log(err));
	};

	// Handler to remove a todo
	const handleRemoveTodo = (todoIndex) => {
		const newTodos = [...todos];
		createAPIEndpoint(ENDPOINTS.todo.delete.deletebyId)
			.delete(newTodos[todoIndex]._id)
			.then(res => {
				console.log(res.data);
				newTodos.splice(todoIndex, 1);
				setTodos(newTodos);
			})
			.catch(err => console.log(err));
	};

	// Handler for 'Ask How' button
	const handleAskHow = (todoIndex) => {
		message.info(`How are you doing with '${todos[todoIndex].name}'?`);
	};

	return (
		<div>
			<Card>
				<List
					itemLayout="vertical"
					dataSource={todos}
					renderItem={(todo, todoIndex) => (
						<List.Item
							key={todo._id}
							actions={[
								<Checkbox.Group
									options={todo.Tasks.map((task, taskIndex) => ({
										label: task.Description,
										value: `${todoIndex}-${taskIndex}`,
										disabled: task.isCompleted,
									}))}
									onChange={(checkedValues) => {
										checkedValues.forEach((value) => {
											const [i, j] = value.split('-');
											handleTaskFinish(parseInt(i), parseInt(j));
										});
									}}
									// disabled and checked
									defaultValue={todo.Tasks.map((task, taskIndex) => {
										if (task.isCompleted) {
											return `${todoIndex}-${taskIndex}`;
										}
										return null;
									})}
								/>,
								<Popconfirm
									title={`Are you sure you want to remove '${todo.Name}'?`}
									onConfirm={() => handleRemoveTodo(todoIndex)}
								>
									<Button type="danger">Remove</Button>
								</Popconfirm>,
								<Button onClick={() => handleAskHow(todoIndex)}>Ask How</Button>,
							]}
						>
							{/*<div style={{ fontSize: "large", fontWeight: "600" }}>{ todo.Name }</div>*/}
							<List.Item.Meta title={todo.Name} description={(new Date(todo.Deadline).toDateString())} />
						</List.Item>
					)}
				/>
				<Divider />
				{formVisible ? (
					<Form onFinish={handleAddTodo}>
						<Form.Item name="Name" rules={[{ required: true, message: 'Please enter a name' }]}>
							<Input placeholder="Name" />
						</Form.Item>
						<Form.Item name="Tasks" rules={[{ required: true, message: 'Please enter at least one task' }]}>
							<Input placeholder="List of tasks (comma-separated)" />
						</Form.Item>
						<Form.Item name="Deadline">
							<DatePicker placeholder="Deadline (optional)" />
						</Form.Item>
						<Form.Item>
							<Button type="primary" htmlType="submit" style={{ margin: "3pt"}}>
								Add
							</Button>
							<Button onClick={toggleFormVisible} style={{ margin: "3pt"}}>
								Cancel
							</Button>
						</Form.Item>
					</Form>
				) : (
					<Button onClick={toggleFormVisible}>Add</Button>
				)}
			</Card>
		</div>
	);
};

export default TodoList;
