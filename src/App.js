import React from 'react';
import {BrowserRouter, Route} from "react-router-dom"
import Login from "./pages/Login"
import Admin from './pages/AdminIndex'
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route path="/login" exact component={Login}></Route>
        <Route path="/index" component={Admin}></Route>
      </BrowserRouter>
    </div>
  );
}

export default App;

