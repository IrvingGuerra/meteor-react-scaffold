import { Meteor } from 'meteor/meteor';
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import login from '../views/Auth/login';


const App = () => (
	<Router>
		<Switch>
			<Route exact path="/" component={login}/>
		</Switch>
	</Router>
);

export default App;