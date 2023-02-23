// Add pages for tasks and leisures
//     Can Add and Remove Elements (localStorage)
// Add a bored button that gives a random activity

import '../style/App.css';

import { Fragment, useState } from "react";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';

const InputTasks = () => {
	const [form, setForm] = useState({
		tasks: "",
		leisures: ""
	});

	const [tasks, setTasks] = useState([]);
	const [leisures, setLeisures] = useState([]);

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	}

	const submitButton = (e) => {
		form.tasks = form.tasks.replaceAll(", ",",");
		setTasks([...tasks, form.tasks]);
		localStorage.setItem("tasks", [...tasks, form.tasks]);

		form.leisures = form.leisures.replaceAll(", ",",");
		setLeisures([...leisures, form.leisures]);
		localStorage.setItem("leisures", [...leisures, form.leisures]);

		window.location.reload();
	};

	return (
		<Fragment>
		<div>
			<div>
				<Form>
					<Form.Text className="text-muted">
						Create a list separated by commas in each input field (i.e. Chess, Napping, etc.)
					</Form.Text>
					<h5 className="mt-3">Tasks</h5>
					<Form.Group>
						<InputGroup className="mt-3 mb-3">
						<InputGroup.Text id="basic-addon1">Tasks</InputGroup.Text>
						<Form.Control
							placeholder="Tasks"
							aria-label="tasks"
							aria-describedby="basic-addon1"
							type="text" id="tasks" name="tasks"
							value={form.tasks} onChange={handleChange}
							className="form-control"
							required
						/>
						</InputGroup>
					</Form.Group>

					<h5>Leisures</h5>
					<Form.Group>
						<InputGroup className="mt-3 mb-3">
						<InputGroup.Text id="basic-addon1">Leisures</InputGroup.Text>
						<Form.Control
							placeholder="Leisures"
							aria-label="leisures"
							aria-describedby="basic-addon1"
							type="text" id="leisures" name="leisures"
							value={form.leisures} onChange={handleChange}
							className="form-control"
							required
						/>
						</InputGroup>
					</Form.Group>

					<div>
						<Button variant="primary" onClick={submitButton} type="submit"> Submit Task </Button>
					</div>
				</Form>
			</div>
		</div>
		</Fragment>
	);
};

export default InputTasks;