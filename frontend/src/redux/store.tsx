import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './rootReducer';
import {audioMiddleWare} from './ middleware';

const store = createStore(rootReducer, applyMiddleware(audioMiddleWare))

export default store
