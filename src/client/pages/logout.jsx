import React, { Component } from 'react';

export default class LogoutPage extends Component {
	constructor(props) {
		super(props);
		fetch('/logout', {
			method: 'POST',
			credentials: 'same-origin' 
		}).then(results => {
			props.authenticationRevokedHandler();
		})
	}
	render() {
		return (
			<div>Logging you out...</div>
		);
	}
}
