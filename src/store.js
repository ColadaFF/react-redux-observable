import { combineReducers, createStore, applyMiddleware } from "redux";
import { createEpicMiddleware, combineEpics } from "redux-observable";

import dataReducer, { dataEpic$ } from "./components/array-handler/ducks";

export const rootEpic = combineEpics(dataEpic$);

const rootReducers = combineReducers({
  data: dataReducer
});

const epicMiddleware = createEpicMiddleware();

export default function configureStore() {
  const store = createStore(rootReducers, applyMiddleware(epicMiddleware));

  epicMiddleware.run(rootEpic);

  return store;
}
