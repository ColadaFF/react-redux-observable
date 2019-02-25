import { ofType } from "redux-observable";
import { from } from "rxjs";
import {
  mergeMap,
  map,
  catchError,
  startWith,
  debounceTime
} from "rxjs/operators";

import { requestDataFromServer } from "../../api";

//action types;
export const LOAD_DATA_REQUEST = "redux-observable-app/LOAD_DATA_REQUEST";
export const LOAD_DATA_REQUEST_IN_PROGRESS =
  "redux-observable-app/LOAD_DATA_REQUEST_IN_PROGRESS";
export const LOAD_DATA_REQUEST_FULFILLED =
  "redux-observable-app/LOAD_DATA_REQUEST_FULFILLED";
export const LOAD_DATA_REQUEST_REJECTED =
  "redux-observable-app/LOAD_DATA_REQUEST_REJECTED";

//reducers
const initialState = {
  loading: false,
  data: [],
  error: null
};
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_DATA_REQUEST_IN_PROGRESS: {
      return { ...state, loading: true };
    }
    case LOAD_DATA_REQUEST_FULFILLED: {
      return {
        ...state,
        loading: false,
        data: action.payload.data
      };
    }
    case LOAD_DATA_REQUEST_REJECTED: {
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };
    }
    default:
      return state;
  }
}

//actions creators...
export function createDataRequest(userId) {
  return {
    type: LOAD_DATA_REQUEST,
    payload: {
      userId
    }
  };
}

function httpDataSuccess(data) {
  return {
    type: LOAD_DATA_REQUEST_FULFILLED,
    payload: {
      data
    }
  };
}

function httpDataError(error) {
  return {
    type: LOAD_DATA_REQUEST_REJECTED,
    payload: {
      error
    }
  };
}

function httpDataInProgress() {
  return {
    type: LOAD_DATA_REQUEST_IN_PROGRESS
  };
}

export const dataEpic$ = action$ =>
  action$.pipe(
    ofType(LOAD_DATA_REQUEST),
    debounceTime(400),
    mergeMap(action => {
      const { userId } = action.payload;
      const promiseServer = requestDataFromServer(userId);
      return from(promiseServer).pipe(
        map(response => response.data || []),
        map(httpDataSuccess),
        catchError(error => httpDataError(error)),
        startWith(httpDataInProgress())
      );
    })
  );
