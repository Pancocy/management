
import { configureStore } from "@reduxjs/toolkit";

import { combineReducers } from "@reduxjs/toolkit";

import weatherReducer from '../Reducers/weatherReducer'
const allReducers =combineReducers({
    weather:weatherReducer
})

export default configureStore({
    reducer:allReducers
})
