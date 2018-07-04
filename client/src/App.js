import React, { Component } from "react";
import "./App.css";
import Login from "./Components/Login/Login";
import Dashboard from "./Components/Dashboard";
import Signup from "./Components/Signup";
import axios from "axios";

import {
	Row,
	Col,
	Nav,
	// Navbar,
	NavItem,
	NavDropdown,
	MenuItem
} from "react-bootstrap";

import { BrowserRouter as Router, Route, Link } from 'react-router-dom';


class App extends Component {
	constructor() {
		super();
		this.state = {
			loggedIn: false,
			user: null
		}
	}

	componentDidMount() {
		axios.get('/auth/user').then(response => {
			console.log(response.data)
			if (!!response.data.user) {
				console.log('there is a user')
				this.setState({
					loggedIn: true,
					user: response.data.user
				})
			}
			else {
				this.setState({
					loggedIn: false,
					user: null
				})
			}
		})
	}

	_logout = (event) => {
		event.preventDefault();
		// console.log('logging out')
		axios.post('/auth/logout').then(response => {
			console.log(response.data)
			if (response.status === 200) {
				this.setState({
					loggedIn: false,
					user: null
				})
			}
			else {
				alert(response)
			}
		})
	}

	_login = (username, password) => {
		axios.post('/auth/login', { username, password }).then(response => {
			console.log(response)
			if (response.status === 200) {
				this.setState({
					loggedIn: true,
					user: response.data.user
				})
			}
		})
	}
	render() {
		return (
			<Router>
				<div>
					<Route exact path="/" render={() => <Login _login={this._login} />} />
					<Route exact path = "/dashboard" render={() => <Dashboard user={this.state.user} />} />
					<Route exact path="/login" render={() => <Login _login={this._login} />} />
					<Route path="/signup" component={Signup} />
				</div>
			</Router>
		);
	}
}

export default App;
