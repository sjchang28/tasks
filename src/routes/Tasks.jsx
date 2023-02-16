// Add pages for tasks and leisures
//     Can Add and Remove Elements (localStorage)
// Add a bored button that gives a random activity

import '../style/App.css';

import { Fragment, useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Table from 'react-bootstrap/Table';

import Header from '../components/Header';

const Tasks = () => {
	const [form, setForm] = useState({
		task: "",
		url: ""
	});
	const [submitInfo, setSubmitInfo] = useState(false);
	const [tasks, setTasks] = useState(() => {
		return Object.keys(localStorage);
	});

	const [urls, setURLs] = useState(() => {
		const storedKeys  = Object.keys(localStorage);
		const localTasks = [];
		storedKeys.forEach((task) => {
			localTasks.push(localStorage.getItem(task));
		});
		return localTasks;
	});

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	}

	const submitButton = (e) => {
		localStorage.setItem(form.task, form.url);
		setTasks([...tasks, form.task]);
		setURLs([...urls, form.url]);

		setForm({
			task: "",
			url: ""
		});
		setSubmitInfo(true);
		setTimeout(() => { setSubmitInfo(false) }, 2000);
	};

	const removeItem = (index) => {
		const newTasks = [...tasks];
		localStorage.removeItem(newTasks[index]);
		newTasks.splice(index, 1);
		setTasks(newTasks);

		const newURLs = [...urls];
		newURLs.splice(index, 1);
		setURLs(newURLs);
	};

	return (
		<Fragment>
		<Header />
		<div className="page-information">
			<div className="mt-5 mb-5">
				<h1 className="tasks-header">Add a New Task</h1>
				<InputGroup className="mb-3">
					<InputGroup.Text>Task & URL</InputGroup.Text>
					<Form.Control type="name" name="task" value={form.task} onChange={handleChange} className="form-control"/>
					<Form.Control type="name" name="url" value={form.url} onChange={handleChange} className="form-control"/>
				</InputGroup>
				<div>
					<Button variant={submitInfo ? "success" : "primary"} onClick={submitButton} type="submit"> Submit Task </Button>
				</div>
			</div>
			<div className="mt-5">
			<h1 className="tasks-header">Local Storage</h1>
				<Table className="tasks-table">
					<thead>
						<tr>
							<th>Task</th>
							<th>URL</th>
							<th>Edit</th>
						</tr>
					</thead>
					<tbody>
						{tasks.map((task, index) => (
							<tr key={index}>
								<td>{task}</td>
								<td>{urls[index]}</td>
								<td>
									<Button variant="danger" onClick={() => removeItem(index)}>Remove</Button>
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			</div>
		</div>
		</Fragment>
	);
};

export default Tasks;