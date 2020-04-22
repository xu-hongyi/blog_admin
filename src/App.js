import React from 'react';
import {BrowserRouter, Route} from "react-router-dom"
import Login from "./pages/Login"
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route path="/login" component={Login}></Route>
      </BrowserRouter>
    </div>
  );
}

export default App;

