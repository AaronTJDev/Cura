import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./account/reducers";

const store = configureStore({ reducer: accountReducer });

export default store;