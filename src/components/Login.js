// eslint-disable-next-line max-classes-per-file
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Form } from 'mobx-react-form';
import dvr from 'mobx-react-form/lib/validators/DVR';
import validatorjs from 'validatorjs';
import {
  Paper, Button, TextField, Typography,
} from '@material-ui/core';
import { Redirect } from 'react-router';

class LoginForm extends Form {
  constructor(doLogin) {
    super();

    this.doLogin = doLogin;
  }

  // eslint-disable-next-line class-methods-use-this
  plugins() {
    return {
      dvr: dvr(validatorjs),
    };
  }

  // eslint-disable-next-line class-methods-use-this
  setup() {
    return {
      fields: [{
        label: 'E-mail address',
        name: 'email',
        placeholder: 'E-mail',
        rules: 'required|string',
        value: '',
      },
      {
        label: 'Password',
        name: 'password',
        type: 'password',
        placeholder: 'Password',
        rules: 'required|string',
        value: '',
      }],
    };
  }

  // eslint-disable-next-line class-methods-use-this
  hooks() {
    return {
      onSuccess(form) {
        this.doLogin(form.values());
      },
    };
  }
}

@inject('user')
@observer
class Login extends Component {
  constructor(props) {
    super(props);

    this.form = new LoginForm(props.user.login);
  }

  render() {
    const { user } = this.props;

    if (user.isLoggedIn) {
      return <Redirect to="/profile" />;
    }

    return (
      <form>
        <Paper>
          {user.loginFailed ? <Typography>Invalid username/password</Typography> : null}
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <TextField {...this.form.$('email').bind()} />
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <TextField {...this.form.$('password').bind()} />
          <Button type="button" variant="contained" onClick={this.form.onSubmit}>Login</Button>
        </Paper>
      </form>
    );
  }
}

export default Login;
