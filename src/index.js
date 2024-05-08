import React from 'react';
import ReactDOM from 'react-dom';

//local imports
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { store, persistor } from './redux/store';
import Socket from './Socket';

//react app initialization
ReactDOM.render(
    <Provider store={store}>
        <Socket>
            <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
                <Router>
                    <App />
                </Router>
            </PersistGate>
        </Socket>
    </Provider>,
    document.getElementById('root')
);
reportWebVitals();
