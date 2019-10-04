import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import {Button, Paper, Typography} from "@material-ui/core";

@observer
@inject('user')
class Home extends Component {
  render() {
    const { user } = this.props
    return (
      <Paper>
        <Typography>Home</Typography>
        <Button type="button" variant="contained" onClick={user.logout}>Logout</Button>
      </Paper>
    );
  }
}

export default Home;
