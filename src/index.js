import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './globalStyles.css';
import App from './App';
import AuthContextProvider from './Contexts/AuthContext';

import 'bootstrap/dist/css/bootstrap.min.css';

import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
