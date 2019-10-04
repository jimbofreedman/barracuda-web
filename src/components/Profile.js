import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Paper, Typography } from '@material-ui/core';

@inject('user')
@observer
class Profile extends Component {
  render() {
    const { user } = this.props;
    console.log(user.profile);
    return (
      <Paper>
        <Typography>Profile</Typography>
        <Typography>{`You are ${user.profile.attributes.email}`}</Typography>
      </Paper>
    );
  }
}

export default Profile;
