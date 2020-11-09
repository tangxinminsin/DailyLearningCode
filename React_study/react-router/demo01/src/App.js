import React from 'react';
import {BrowserRouter as Router,Route,Link} from 'react-router-dom'
import List from './List'
import Main from './Main'



function App() {
  return (
    <Router>
      <ul>
        <li><Link to='/'>首页</Link></li>
        <li><Link to="/list/123">列表</Link></li>
      </ul>
      <Route path='/' exact component={Main}></Route>
      <Route path='/list/:id'  component={List}></Route>
    </Router>
  );
}

export default App;
