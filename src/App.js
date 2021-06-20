import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
// import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import AccountType from "./components/Login/AccountType";
import JobSeekerLogin from "./components/Login/JobSeekerLogin";
import EmployerLogin from "./components/Login/EmployerLogin";
import NotFound from "./components/NotFound/NotFound";


function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/accountType">
            <AccountType />
          </Route>
          <Route path="/jobSeeker">
            <JobSeekerLogin />
          </Route>
          <Route path="/employer">
            <EmployerLogin />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;