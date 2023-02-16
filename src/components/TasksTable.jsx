import { Fragment, useState } from 'react';

import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

import '../style/App.css';

const TasksTable = () => {
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
			<div>
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
		</Fragment>
	);
};

export default TasksTable;