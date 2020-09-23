import { Meteor } from 'meteor/meteor';
import React, { createRef } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AlertMessage from '../components/Utilities/Alerts/AlertMessage';
import { createBrowserHistory } from 'history';
import Admin from './Admin';
import Login from '../views/Auth/login';

const history = createBrowserHistory()

const App = () => {
	return (
		<Router history={history}>
			<Switch>
				<Route exact path="/" render={(props) => <Login {...props} />} />
				<Route path="/admin" render={(props) => <Admin {...props} />} />
			</Switch>
			<AlertMessage />
		</Router>
	)
}

export default App;