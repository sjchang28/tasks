import { Fragment } from 'react';

import '../style/App.css';

const Header = () => {
	return (
		<Fragment>
			<div className="header content">
				<a href="/">Tasks</a>
				<div className="header-right">
					<a href="/">Home</a>
					<a href="/task_manager">Task Manager</a>
				</div>
			</div>
		</Fragment>
  	);
};

export default Header;