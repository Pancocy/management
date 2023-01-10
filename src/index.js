import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom'
import 'antd'
import '../src/assets/reset/reset.css'
import store from './Store/Store/store';
import { Provider } from 'react-redux';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
      <React.StrictMode>
            <Provider store={store}>
                  <Router>
                        <App />
                  </Router>
            </Provider>
      </React.StrictMode>
);

