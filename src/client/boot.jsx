import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import { Router, Route, browserHistory } from 'react-router';
import Pages from './pages';

let reactContainer = document.createElement('div');
reactContainer.id = 'app-react-container';
document.body.appendChild(reactContainer);

function saveAppInstance(appComponentInstance) {
	window.app = appComponentInstance; //useful for debugging.
}

let routeConfig = <Route path="/" component={App}>
	{Pages()} {/* called as a function so that we get the resolved <Routes/> not a react component <Page> */}
</Route>;

//<App ref={saveAppInstance} user={user} />


App.getUserInfo().then(user => {
	ReactDOM.render(<Router history={browserHistory}>{routeConfig}</Router>, reactContainer);
});
