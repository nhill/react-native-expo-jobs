import React, { Component } from 'react';
import {View, Text} from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Button } from 'react-native-elements';

class SettingsScreen extends Component {
  render() {
    return(
      <View>
        <Button title="Reset Liked Jobs" />
        large
        icon={{ name: 'delete-forever' }}
        backgroundColor="#f44336"
        onPress={this.props.clearLikedJobs}
      </View>
    );
  }
}

export default connect(null, actions)(SettingsScreen);
