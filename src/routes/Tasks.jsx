// Add pages for tasks and leisures
//     Can Add and Remove Elements (localStorage)
// Add a bored button that gives a random activity

import '../style/App.css';

import { Fragment, useState } from "react";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

import Header from '../components/Header';

const Tasks = () => {
	const [form, setForm] = useState({
		activity: "",
		url: ""
	});
	const [submitInfo, setSubmitInfo] = useState(false);

	const [tasks, setTasks] = useState(() => {
		return localStorage.getItem("tasks").split(",");
	});
	const [leisures, setLeisures] = useState(() => {
		return localStorage.getItem("leisures").split(",");
	});
	const [urls, setURLs] = useState(() => {
		const storedActivities = Object.keys(localStorage);
		const localActivities = {};
		storedActivities.forEach((activity) => {
			localActivities[activity] = localStorage.getItem(activity);
		});
		return localActivities;
	});

	const [radioValue, setRadioValue] = useState("1");
	const radios = [
		{ name: 'Task', value: '1' },
		{ name: 'Leisure', value: '2' }
	];

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	}

	const submitButton = (e) => {
		if (radioValue === "1") {
			setTasks([...tasks, form.activity]);
			localStorage.setItem("tasks", [...tasks, form.activity]);
		} else {
			setLeisures([...leisures, form.activity]);
			localStorage.setItem("leisures", [...leisures, form.activity]);
		}

		localStorage.setItem(form.activity, form.url);
		setURLs([...urls, form.url]);

		// Reset Form
		setRadioValue("1");
		setForm({
			activity: "",
			url: ""
		});
		setSubmitInfo(true);
		setTimeout(() => { setSubmitInfo(false) }, 2000);
	};

	const removeTaskItem = (index) => {
		const newTasks = [...tasks];
		localStorage.removeItem(newTasks[index]);
		newTasks.splice(index, 1);
		setTasks(newTasks);

		localStorage.removeItem("tasks");
		localStorage.setItem("tasks", newTasks);
	};
	const removeLeisureItem = (index) => {
		const newLeisures = [...leisures];
		localStorage.removeItem(newLeisures[index]);
		newLeisures.splice(index, 1);
		setLeisures(newLeisures);

		localStorage.removeItem("leisures");
		localStorage.setItem("leisures", newLeisures);
	};

	return (
		<Fragment>
		<Header />
		<div className="page-information">
			<div className="mt-5 mb-5">
				<h1 className="tasks-header">Add a New Task</h1>
				<Form>
					<Form.Group>
					<ToggleButtonGroup type="radio" defaultValue={[1]} name="activities" className="mb-2">
					{radios.map((radio, index) => (
						<ToggleButton
							key={index}
							variant="secondary"
							id={`radio-${index}`} type="radio" name={`radio-${radio.name}`}
							value={radio.value}
							checked={radioValue === radio.value}
							onChange={(e) => setRadioValue(e.currentTarget.value)}
						>
						{radio.name}
						</ToggleButton>
					))}
					</ToggleButtonGroup>
					</Form.Group>
					<Form.Group>
						<InputGroup className="mt-3 mb-3">
						<InputGroup.Text id="basic-addon1">Activity</InputGroup.Text>
						<Form.Control
							placeholder="Activity"
							aria-label="activity"
							aria-describedby="basic-addon1"
							type="text" id="activity" name="activity"
							value={form.activity} onChange={handleChange}
							className="form-control"
							required
						/>
						</InputGroup>
					</Form.Group>
					<Form.Group>
						<InputGroup className="mb-3">
						<InputGroup.Text id="basic-addon1">URL</InputGroup.Text>
						<Form.Control
							placeholder="URL"
							aria-label="url"
							aria-describedby="basic-addon1"
							type="text" id="url" name="url"
							value={form.url} onChange={handleChange}
							className="form-control"
						/>
						</InputGroup>
					</Form.Group>

					<div>
						<Button variant={submitInfo ? "success" : "primary"} onClick={submitButton} type="submit"> Submit Task </Button>
					</div>
				</Form>
			</div>
			<div className="mt-5">
			<h1 className="tasks-header">Tasks</h1>
				<Table className="tasks-table">
					<thead>
						<tr>
							<th>Task</th>
							<th>URL(s)</th>
							<th>Edit</th>
						</tr>
					</thead>
					<tbody>
						{tasks.map((task, index) => (
							<tr key={index}>
								<td>{task}</td>
								<td>{urls[task]}</td>
								<td>
									<Button variant="danger" onClick={() => removeTaskItem(index)}>Remove</Button>
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			</div>
			<div className="mt-5">
			<h1 className="tasks-header">Leisures</h1>
				<Table className="tasks-table">
					<thead>
						<tr>
							<th>Leisure</th>
							<th>URL(s)</th>
							<th>Edit</th>
						</tr>
					</thead>
					<tbody>
						{leisures.map((leisure, index) => (
							<tr key={index}>
								<td>{leisure}</td>
								<td>{urls[leisure]}</td>
								<td>
									<Button variant="danger" onClick={() => removeLeisureItem(index)}>Remove</Button>
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