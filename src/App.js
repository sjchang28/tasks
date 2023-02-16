import "./style/App.css";

import {BrowserRouter as Router, Route, Routes as Switch } from 'react-router-dom';

import Activity from "./routes/Activity.jsx";
import Tasks from "./routes/Tasks.jsx";

const App = () => {
	return (
		<Router>
			<div>
			<Switch>
				<Route path="/tasks_manager" element={<Tasks />} />
				<Route default path="/" element={<Activity />} />
			</Switch>
			</div>
		</Router>
	);
}

export default App;
