import React from 'react';
import {BrowserRouter, Route} from "react-router-dom"
import Login from "./pages/Login"
import Admin from './pages/AdminIndex'
function App() {
  return (
    <>
      <BrowserRouter>
        <Route path="/" exact component={Login}></Route>
        <Route path="/index" component={Admin}></Route>
      </BrowserRouter>
    </>
  );
}

export default App;

