import React, { Component } from 'react';
import { browserHistory } from 'react-router';

import Nav from './components/nav';

import './assets/style.scss';

export default class App extends Component {

	static childContextTypes = {
		currentUser: React.PropTypes.object
	}

	static async getUserInfo() {
		const response = await fetch('/api/user/info', { method: 'POST', credentials: 'same-origin' });
		const json = await response.json();

		if (json.error) {
			return null; //no user
		}
		else {
			return json.data[0];
		}
	}

	constructor(props) {
		super(props);
		this.state = {
			currentUser: null
		}
		// this.state = {
		// 	currentUser: props.user
		// };
	}

	getChildContext() {
		return { currentUser: this.state.currentUser };
	}

	handleAuthenticationChange() {
		App.getUserInfo().then(userInfo => this.setState({ currentUser: userInfo }, _ =>{
			browserHistory.push('/'); // todo, figure out where they were coming from and pass there
		}));
	}

	componentWillMount() {
		window.authenticationCompleteCallback = _ => this.handleAuthenticationChange();
		this.handleAuthenticationChange();
	}

	render() {
		return (
			<div>
				<Nav loggedIn={!!this.state.currentUser} />
				{
					this.props.children
				}
			</div>
		);
	}
}
