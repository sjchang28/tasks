// + Give a random link with each chosen item
// Add weights to each item based on how often it is chosen
//     Less chosen items are more likely to be chosen
// Pomodoro Timer
// + Add a button to choose a new task
//     Only allowed to press once per week
// Cool Animation everytime a new task is chosen (per day)

// Host on Azure
// Use Three.js to make a 3D scene

import '../style/App.css';
import { Fragment, useState, useEffect } from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import Header from '../components/header';
import InputTasks from '../components/inputtasks';

const Daily = () => {
	let activities = {};

	const [task, setTask] = useState("Nothing");
	const [leisure, setLeisure] = useState("Nothing");
	const [currTask, setCurrTask] = useState([]);
	const [currURL, setCurrURL] = useState("");

	const [modalShow, setModalShow] = useState(false);
	const [dailyActivity, setDailyActivity] = useState("");
	const [disableSpin, setDisableSpin] = useState(false);

	const [newUser, setNewUser] = useState(false);

	const date = new Date().toDateString();
	const currTime = new Date().toLocaleTimeString();

	const randomIndex = (index) => {
		return Math.floor(Math.random() * index);
	};

	Date.prototype.getWeek = function() {
		var onejan = new Date(this.getFullYear(),0,1);
		var today = new Date(this.getFullYear(),this.getMonth(),this.getDate());
		var dayOfYear = ((today - onejan + 86400000)/86400000);
		return Math.ceil(dayOfYear/7)
	};

	const loadActivities = () => {
		try{
			const activitiesJSON = {tasks: [], leisures: [], URLs:[]};
			activitiesJSON.tasks = [...localStorage.getItem("tasks").split(",")];
			activitiesJSON.leisures = [...localStorage.getItem("leisures").split(",")];

			const storedActivities = Object.keys(localStorage);
			const localActivities = {};
			storedActivities.forEach((activity) => {
				localActivities[activity] = localStorage.getItem(activity);
			});
			activitiesJSON.URLs = localActivities;

			activities = activitiesJSON;
			return false;
		} catch (err) {
			return true;
		}
	};

	const setNewTask = (activity) => {
		const tasksLength = activities.tasks.length;
		const leisuresLength = activities.leisures.length;
		
		let chosenActivity = "";
		if (activity === "task") {
			if (activities.tasks.length === 0) {
				chosenActivity = "Nothing"
			} else {
				chosenActivity = activities.tasks[randomIndex(tasksLength)];
			}
		}
		if (activity === "leisure") {
			if (activities.leisures.length === 0) {
				chosenActivity = "Nothing"
			} else {
				chosenActivity = activities.leisures[randomIndex(leisuresLength)];
			}
		}
		localStorage.setItem(activity, chosenActivity);
		return chosenActivity;
	};

	const chooseNewTask = () => {
		const tempNewUser = loadActivities();
		if (tempNewUser === false) {
			if ( localStorage.getItem("newTasksSeen") === (new Date()).toDateString()) { 
				setTask(localStorage.getItem("task") === null ? "Nothing" : localStorage.getItem("task"));
				setLeisure(localStorage.getItem("leisure") === null ? "Nothing" : localStorage.getItem("leisure"));
			} else { 
				localStorage.setItem("newTasksSeen", (new Date()).toDateString());
				setTask(setNewTask("task"));
				setLeisure(setNewTask("leisure"));
				setModalShow(true);
			}
		} else {
			setNewUser(tempNewUser);
		}
	};

	const chooseNewTaskAgain = () => {
		const currWeek = (new Date()).getWeek();
		if ( localStorage.getItem("spinAgainOption") !== currWeek ) { 
			localStorage.setItem("spinAgainOption", currWeek );
			setTask(setNewTask("task"));
			setLeisure(setNewTask("leisure"));
		}
		setDisableSpin(true);
	};

	const timeToMins = (time) => {
		var b = time.split(/[:\s]/);
		return b[0]%12*60 + +b[1] + (/pm\s*$/i.test(time)? 720 : 0);
	};

	const getChosenTaskURL = (activity) => {
		if (localStorage.getItem(activity) === null) return "";

		const chosenTaskURLs = localStorage.getItem(activity);
		if (chosenTaskURLs.includes(",")) {
			const chosenTaskURLsArray = chosenTaskURLs.split(",");
			const rngIndex = randomIndex(chosenTaskURLsArray.length);
			const randomURL = new URL(chosenTaskURLsArray[rngIndex]);
			setCurrURL(randomURL);
		} else if (chosenTaskURLs.includes("http")) {
			const randomURL = new URL(chosenTaskURLs);
			setCurrURL(randomURL);
		} else {
			setCurrURL("");
		}
	};

	const getCurrentTask = () => {
		// 0630 Meditate + Excersize
		// 0930-1330 Work
		// 1330 Leisure
		// 1530-1930 Work
		// 1930 Bed

		const currMins = timeToMins(currTime);
		// const timePeriods = ["6:30 am", "9:30 am", "1:30 pm", "3:30 pm", "7:30 pm"];
		// timePeriods.forEach((time) => { console.log(timeToMins(time)) });
		
		if (currMins < 570) { return ["Meditate + Excersize", "Up Next: " + task + " (9:30 AM)"]; }
		if (currMins < 810) { getChosenTaskURL(task); return [task, "Up Next: " + leisure + " (1:30 PM)"]; }
		if (currMins < 930) { getChosenTaskURL(leisure); return [leisure, "Up Next: " + task + " (3:30 PM)"]; }
		if (currMins < 1170) { getChosenTaskURL(task); return [task, "Up Next: Bed (7:30 PM)"]; }
		return ["Bed", "Up Next: Meditate + Excersize (6:30 AM)"];
	};

	const NewUser = (props) => {
		return (
		  <Modal
		    {...props}
		    size="lg"
		    aria-labelledby="contained-modal-title-vcenter"
		    centered
		  >
		    <Modal.Header closeButton>
			 <Modal.Title id="contained-modal-title-vcenter">
			  {props.title}
			 </Modal.Title>
		    </Modal.Header>
		    <Modal.Body>
			<InputTasks />
		    </Modal.Body>
		  </Modal>
		);
	};

	const NewTasks = (props) => {
		return (
		  <Modal
		    {...props}
		    size="lg"
		    aria-labelledby="contained-modal-title-vcenter"
		    centered
		  >
		    <Modal.Header closeButton>
			 <Modal.Title id="contained-modal-title-vcenter">
			  {props.title}
			 </Modal.Title>
		    </Modal.Header>
		    <Modal.Body>
		    	{props.response}
		    </Modal.Body>
		    <Modal.Footer>
		      <Button disabled={disableSpin} onClick={chooseNewTaskAgain} variant="success">Spin Again</Button>
			 <Button onClick={props.onHide} variant="danger">Close</Button>
		    </Modal.Footer>
		  </Modal>
		);
	};

	useEffect(() => {
		setCurrTask(getCurrentTask());
	}, [task, leisure]);
	useEffect(() => {
		setDailyActivity(task + " + " + leisure);
	}, [currTask, task, leisure]);
	useEffect(() => {
		chooseNewTask();
	}, []);

	return (
		<Fragment>
		<Header />
		<div className="activity">
			<header className="activity-header">
				<h5>{date}</h5>
				<h1>
					{dailyActivity}
				</h1>
			</header>
			<p className="current-time">{currTime} | {currURL ? (
					<a href={currURL} title={currTask[0]}> {currTask[0]}</a>
				) : (
					currTask[0]
				)}
			</p>
			<p className="mt-2 next-time"><i>{currTask[1]}</i></p>
		</div>

		<NewUser
			show={newUser}
			onHide={() => setNewUser(false)}
			title="Add a New Task"
		/>

		<NewTasks
			show={modalShow}
			onHide={() => setModalShow(false)}
			title="Daily Activities"
			response={dailyActivity}
		/>
		</Fragment>
	);
}

export default Daily;
