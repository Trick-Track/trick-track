import React from 'react';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer'
