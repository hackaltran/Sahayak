
import React from 'react';
import ReactDOM from 'react-dom';
import Layout from './components/layout/layout';
import * as serviceWorker from './serviceWorker';
import { HashRouter as Router } from 'react-router-dom';
import 'core-js/modules/es.array.includes';
import 'core-js/modules/es.array.fill';
import 'core-js/modules/es.string.includes';
import 'core-js/modules/es.string.trim';
import 'core-js/modules/es.object.values';

ReactDOM.render(<Router>
    <Layout />
  </Router>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
