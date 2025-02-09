import React from "react";
import ReactDOM from 'react-dom/client';
import { Provider } from "react-redux";
import { compose, createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import App from './components/app/app.tsx';
import './index.css'
import { rootReducer } from "./services/reducers";
import { Modal } from "./components/modal/modal.tsx";

const composeEnhancers =
    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
        : compose;
const enhancer = composeEnhancers(applyMiddleware(thunk));
const store = createStore(rootReducer, enhancer);
export type AppState = ReturnType<typeof store.getState>;

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
            <Modal />
        </Provider>
    </React.StrictMode>
)
