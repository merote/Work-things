import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
//import listReducer from './listReducer'
import { createLogger } from 'redux-logger';
import {adminReducer,adminReducer2, customerReducer} from './adminReducer'
import { combineReducers } from 'redux'

const logger = createLogger();

//const store = createStore(listReducer, applyMiddleware(logger));
const rootReducer = combineReducers({adminReducer, adminReducer2, customerReducer})

const store = createStore(rootReducer, applyMiddleware(logger));


ReactDOM.render(
<Provider store={store}>
    <App />
</Provider>,
 document.getElementById('root'));
//render()
//store.subscribe(render)
    