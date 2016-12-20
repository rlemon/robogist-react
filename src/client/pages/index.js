import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import App from '../app';
import Home from './home';
import AddGist from './add-gist';
import Login from './login';
import Logout from './logout';
import UserProfile from './user-profile';
import NotFound from './not-found';

export default function Pages(props) {
	return [
		<IndexRoute component={Home} />,
		<Route path="/browse" component={Home}>,
			<Route path="/browse/:page" component={Home} />,
		</Route>,
		<Route path="/gist" component={Home} >
			<Route path="/gist/view/:id" component={AddGist} />
			<Route path="/gist/edit/:id" component={AddGist} />
			<Route path="/gist/add" component={AddGist} />
		</Route>,
		<Route path="/profile" component={UserProfile} />,
		<Route path="/login" component={Login} />,
		<Route path="/logout" component={Logout} />,
		<Route path="*" component={NotFound} />,
	];
}
