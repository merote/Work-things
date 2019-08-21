import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { createLogger } from 'redux-logger';
import {adminReducer,adminReducer2, customerReducer} from './adminReducer'
import { combineReducers } from 'redux'

//Redux logger josta näkee tilamuutokset konsolissa
const logger = createLogger();

const rootReducer = combineReducers({adminReducer, adminReducer2, customerReducer})

//Luodaan store reducereista ja yhdistetään siihen redux logger
const store = createStore(rootReducer, applyMiddleware(logger));

console.log(store)
ReactDOM.render(
<Provider store={store}>
    <App />
</Provider>,
 document.getElementById('root'));
//render()
//store.subscribe(render)
    