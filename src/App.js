import './App.css';
import {BrowserRouter, Switch, Route, useNavigate, Navigate} from "react-router-dom";
import Home from './pages/Home';
import Navbar from './components/navbar';
import Register from './pages/Register';
import Login from "./pages/Login";
import Profile from './pages/Profile';
import AuthProvider from './context/auth';
import PrivateRoute from './components/PrivateRoute';
import {AuthContext} from './context/auth'

import React, {useContext, useEffect} from 'react';
function App() {
  // const user = useContext(AuthContext);
  // const history = useNavigate();
  
  return (
    <div>
        <AuthProvider>
          <BrowserRouter>
            <Navbar/>
            <Switch>
              <Route  path="/register" component={Register} />
              <Route  path="/login" component={Login} />
              <Route  path="/profile" component={Profile} />
              <PrivateRoute  exact path="/" component={Home} />
            </Switch>
          </BrowserRouter>
        </AuthProvider>
    </div>
  );
}

export default App;
