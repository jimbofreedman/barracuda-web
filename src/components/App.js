import React, { Component } from 'react';
import './App.css';

import { inject, observer } from 'mobx-react';

import LoginScreen from './Login';
import HomeScreen from './Home';
import LoadingModal from './LoadingModal';

@inject('user')
@observer
class App extends Component {
  componentDidMount() {
    const { user } = this.props;
    user.getUser();
  }

  render() {
    const { user } = this.props;

    if (user.loading) {
      return <LoadingModal />;
    }

    if (!user.isLoggedIn) {
      return <LoginScreen />;
    }

    return <HomeScreen />;
  }
}

export default App;
