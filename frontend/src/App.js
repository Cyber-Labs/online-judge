import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import Main from './components/Main';
import ConfigureStore from './redux/store';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.css';
import './App.css';

const store = ConfigureStore();

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <Main />
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
