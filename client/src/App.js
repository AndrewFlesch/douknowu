import './App.css';
import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import ChangeUser from './components/auth/ChangeUser';
import Alert from './components/layout/Alert';
import Dashboard from './components/dashboard/Dashboard';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import PrivateRoute from './components/routing/PrivateRoute';
import Profile from  './components/profile/Profile';
import AllEntries from  './components/entries/allEntries';
import 'bootstrap/dist/css/bootstrap.min.css';

//redux
import { Provider } from 'react-redux';
import store from './store';

if(localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
 useEffect(() => {
   store.dispatch(loadUser());
 }, []);

  return (
  <Provider store={store}>
  <Router>
    <div>
      <Navbar />
      <Route exact path="/" component={ Landing } />
      <section className="container">
      <Alert />
        <Switch>
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
          <PrivateRoute exact path="/profile" component={Profile} />
          <PrivateRoute exact path="/changeuser" component={ChangeUser} />
          <PrivateRoute exact path="/allentries" component={AllEntries} />

        </Switch>
      </section>
    </div>
  </Router>
  </Provider>
)}


export default App;
