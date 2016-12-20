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
	}

	getChildContext() {
		return { currentUser: this.state.currentUser };
	}

	handleAuthenticationChange() {
		App.getUserInfo().then(userInfo => this.setState({ currentUser: userInfo }));
	}

	componentWillMount() {
		window.authenticationCompleteCallback = _ => this.handleAuthenticationChange();
		this.handleAuthenticationChange();
	}

	render() {
		return (
			<div className="app-wrapper">
				<Nav loggedIn={!!this.state.currentUser} />
				{
					React.cloneElement(this.props.children, { 
						authenticationRevokedHandler: _ => this.handleAuthenticationChange(),
						loggedIn: !!this.state.currentUser
					})
				}
				<div className="container">
					<hr />
					<footer>
						<div className="row">
							<div className="col-lg-12">
								<p>Copyright &copy; rlemon.ca {(new Date()).getFullYear()}</p>
							</div>
						</div>
					</footer>

				</div>
			</div>
		);
	}
}
