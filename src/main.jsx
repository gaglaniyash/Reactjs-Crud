import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import App from './App';
// import Crud from './Component/Crud.jsx'
// import LocalCrud from './Component/LocalCrud.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
    {/* <Counter/> */}
    {/* <Crud /> */}
    {/* <LocalCrud /> */}
  </React.StrictMode>,
)
