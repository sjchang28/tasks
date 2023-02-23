import "./style/App.css";

import { Route, Routes as Switch, Navigate } from 'react-router-dom';

import Daily from "./routes/daily.js";
import TaskManager from "./routes/task_manager.js";
import { Fragment } from "react";

const App = () => {
	return (
		<Fragment>
			<Switch>
				<Route path="/activity">
					<Route index path="daily" element={<Daily />} />
					<Route exact path="task_manager" element={<TaskManager />} />
				</Route>
				<Route default path="/*" element={<Navigate to="/activity/daily" />} />
			</Switch>
		</Fragment>
	);
}

export default App;
