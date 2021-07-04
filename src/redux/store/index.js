import { createStore, applyMiddleware, compose } from "redux";

import rootReducer from "../reducer";
import rootSaga from "../saga/rootSaga";
import createMiddeWareSaga from "redux-saga";
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middeWareSaga = createMiddeWareSaga();

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(middeWareSaga))
);
middeWareSaga.run(rootSaga);

export default store;
