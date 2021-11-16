import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from "react-redux";
import { rootReducer } from "./Components/Redux/reducer/index";
import { createStore } from 'redux';
import { applyMiddleware } from 'redux';


const store = createStore(rootReducer);
ReactDOM.render(
  <Provider store={store} >
   < App />
  </Provider>
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
