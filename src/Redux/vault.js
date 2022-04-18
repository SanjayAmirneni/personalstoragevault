import {createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger'
import { itemReducer } from '../Reducer/ItemReducer';
import { signoutReducer } from '../Reducer/signoutReducer';
import { ImageUrlReducer } from '../Reducer/imageurlReducer';

const combinedReducers = combineReducers({itemReducer,signoutReducer,ImageUrlReducer});
const vault = createStore(combinedReducers,applyMiddleware(logger));

export default vault;