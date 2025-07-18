import React from 'react';
import ReactDOM from 'react-dom/client';
import router from './router';
import {RouterProvider} from 'react-router-dom'
import store from './store';
import { Provider} from 'react-redux'
import '@/theme.css'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
      <RouterProvider router={router}>
      </RouterProvider>
  </Provider>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
