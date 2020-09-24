import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { createStore, compose, applyMiddleware } from 'redux';
import { createBrowserHistory } from 'history';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';
import reducer from '../../redux/reducers';
import { loadState, saveState } from '../../utils/localStorage';
import Admin from './Admin';
import Login from '../views/Auth/login';
import AlertMessage from '../components/Utilities/Alerts/AlertMessage';

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

const App = () => (
	<Provider store={ store }>
		<Router history={ history }>
			<Switch>
				<Route exact path="/" component={ Login }/>
				<Route path="/admin" component={ Admin }/>
			</Switch>
			<AlertMessage/>
		</Router>
	</Provider>
);

export default App;