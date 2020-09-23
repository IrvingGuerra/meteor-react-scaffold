import React from 'react';
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
				<Route exact path="/" component={Login} />
				<Route path="/admin" component={Admin} />
			</Switch>
			<AlertMessage />
		</Router>
	)
}

export default App;