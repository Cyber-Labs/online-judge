import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import  Contests  from './contests';
import Auth from './auth.js';
import Questions from './questions';
import Users from './users.js'
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const ConfigureStore = ()=>{
    const store=createStore(
        combineReducers({
            contests: Contests,
            auth: Auth,
            questions: Questions,
            users: Users
        }),
        composeEnhancers(applyMiddleware(thunk))
    );
    return store;
}