import React, { Component } from 'react';
import './App.css';

import { inject, observer } from 'mobx-react';
import {
  Router, Switch, Route, Redirect,
} from 'react-router';

import { AppBar, Toolbar, Button } from '@material-ui/core';

import Login from './Login';
import Home from './Home';
import Profile from './Profile';
import LoadingModal from './LoadingModal';

@inject('routing', 'user')
@observer
class App extends Component {
  componentDidMount() {
    const { user } = this.props;
    user.getUser();
  }

  render() {
    const { routing, history, user } = this.props;
    const { push } = routing;

    if (user.loading) {
      return <LoadingModal />;
    }

    const PrivateRoute = ({ component: ChildComponent, ...rest }) => (
      <Route
        {...rest}
        render={(props) => (
          user.isLoggedIn === true
            ? <ChildComponent {...props} />
            : <Redirect to="/login" />
        )}
      />
    );

    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <Button onClick={() => push('/home')}>Home</Button>
            <Button onClick={() => push('/profile')}>Profile</Button>
            {user.isLoggedIn
              ? <Button onClick={user.logout}>Logout</Button>
              : <Button onClick={() => push('/login')}>Login</Button>}
          </Toolbar>
        </AppBar>
        <Router history={history}>
          <Switch>
            <Route path="/login" component={Login} />
            <PrivateRoute path="/profile" component={Profile} />
            <Route path="/" component={Home} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
