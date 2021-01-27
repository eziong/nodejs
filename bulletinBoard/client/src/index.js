import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import promiseMiddleware from "redux-promise";
import ReduxThunk from "redux-thunk";
import { applyMiddleware, createStore } from "redux";
import Reducer from "./_reducer/index";

const createStoreWithMiddleware = applyMiddleware(
    promiseMiddleware,
    ReduxThunk(createStore)
);

ReactDOM.render(
    <Provider
        store={createStoreWithMiddleware(
            Reducer,
            window.__REDUX_DEVTOOLS_EXTENSIONS__ &&
                window.__REDUX_DEVTOOLS_EXTENSIONS__()
        )}
    >
        <App />
    </Provider>,
    document.getElementById("root")
);
