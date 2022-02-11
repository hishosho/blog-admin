import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import Login from './pages/Login';
import AdminLayout from './pages/AdminLayout';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login/" exact component={Login} />
        <Route path="/index/" exact component={AdminLayout} />
        <Route path="/blog/" component={AdminLayout} />
        <Redirect from="/" to="/login/"/>
      </Switch>
    </Router>
  )
}
export default App