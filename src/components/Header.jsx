import { Fragment } from 'react';
import { Link } from 'react-router-dom';

import '../style/App.css';

const Header = () => {
	return (
		<Fragment>
			<div className="header content">
				<Link to="/activity/daily">Tasks</Link>
				<div className="header-right">
					<Link to="/activity/daily">Home</Link>
					<Link to="/activity/task_manager">Task Manager</Link>
				</div>
			</div>
		</Fragment>
  	);
};

export default Header;