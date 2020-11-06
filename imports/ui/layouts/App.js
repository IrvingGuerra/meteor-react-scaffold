import React, { useRef } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { createStore, compose, applyMiddleware } from 'redux';
import { createBrowserHistory } from 'history';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';
import reducer from '../../redux/reducers';
import { loadState, saveState } from '../../utils/localStorage';
import System from './System';
import Login from '../views/Auth/Login';
import { AlertMessage } from '../components/Utilities/Alerts/AlertMessage';
import { LoaderPage } from '../components/Utilities/Loaders/LoaderPage';
import ForgotPassword from '../views/Auth/ForgotPassword';
import ResetPassword from '../views/Auth/ResetPassword';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const history = createBrowserHistory();
const persistedState = loadState();
const store = createStore(
	reducer,
	persistedState,
	composeEnhancers(applyMiddleware(reduxThunk))
);
store.subscribe(() => {
	saveState(store.getState());
});

const App = () => {
	const alert = useRef();
	const loader = useRef();
	return (
		<Provider store={ store }>
			<Router history={ history }>
				<Switch>
					<Route exact path="/"
					       render={ (props) => (<Login { ...props } alert={ alert } loader={ loader }/>) }/>
					<Route exact path="/forgot-password"
					       render={ (props) => (<ForgotPassword { ...props } alert={ alert } loader={ loader }/>) }/>
					<Route path="/reset-password/:token"
					       render={ (props) => (<ResetPassword { ...props } alert={ alert } loader={ loader }/>) }/>
					<Route path="/admin"
					       render={ (props) => (<System { ...props } alert={ alert } loader={ loader }/>) }/>
					<Route path="/client"
					       render={ (props) => (<System { ...props } alert={ alert } loader={ loader }/>) }/>
					<Route path="/specialist"
					       render={ (props) => (<System { ...props } alert={ alert } loader={ loader }/>) }/>
					<Route path="/labworker"
					       render={ (props) => (<System { ...props } alert={ alert } loader={ loader }/>) }/>
				</Switch>
			</Router>
			<AlertMessage ref={ alert }/>
			<LoaderPage ref={ loader }/>
		</Provider>
	);
};

export default App;