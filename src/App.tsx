import * as React from 'react';
import './App.css';
import logo from "./assets/images/logo.svg";
import '../static/global.css';
import FormPage from './FormPage';


function App() {
  return (
    <div className="App">
      <div className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        {/* <h2>Welcome to React</h2> */}
        <FormPage />
      </div>
    </div>
  );
}

export default App;