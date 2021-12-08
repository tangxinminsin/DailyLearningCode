/*
 * @Author: tangxinmin
 * @Date: 2021-09-23 15:22:11
 * @LastEditors: tangxinmin
 * @LastEditTime: 2021-09-26 10:19:57
 * @Description: file content
 */
import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
