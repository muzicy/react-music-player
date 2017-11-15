import 'react-hot-loader/patch';
import React from 'react';
import ReactDOM from 'react-dom';

import { AppContainer } from 'react-hot-loader';
import App from './components/App';

import './common.css'

const render = Component => {
  ReactDOM.render(
    <AppContainer>
        <Component />
    </AppContainer>,
    document.querySelector('#root')
  );
}

render(App);

if (module.hot) {
  module.hot.accept('./components/App', () => { render(App) });
}