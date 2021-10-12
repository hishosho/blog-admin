import React from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import Login from './pages/Login';
import AdminLayout from './pages/AdminLayout';

function App() {
  return (
    <Router>      
      <Route path="/login/" exact component={Login} />
      <Route path="/index/" exact component={AdminLayout} />
      <Route path="/blog/" component={AdminLayout} />
    </Router>
  )
}
export default App