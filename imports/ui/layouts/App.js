import React, { useRef } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { createStore, compose, applyMiddleware } from 'redux';
import { createBrowserHistory } from 'history';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';
import reducer from '../../redux/reducers';
import { loadState, saveState } from '../../utils/localStorage';
import System from './System';
import Login from '../views/Auth/login';
import { AlertMessage } from '../components/Utilities/Alerts/AlertMessage';

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
	return (
		<Provider store={ store }>
			<Router history={ history }>
				<Switch>
					<Route exact path="/" render={ (props) => (<Login { ...props } alert={ alert }/>) }/>
					<Route path="/admin" render={ (props) => (<System { ...props } alert={ alert }/>) }/>
					<Route path="/client" render={ (props) => (<System { ...props } alert={ alert }/>) }/>
					<Route path="/specialist" render={ (props) => (<System { ...props } alert={ alert }/>) }/>
					<Route path="/labworker" render={ (props) => (<System { ...props } alert={ alert }/>) }/>
				</Switch>
			</Router>
			<AlertMessage ref={ alert }/>
		</Provider>
	);
};

export default App;