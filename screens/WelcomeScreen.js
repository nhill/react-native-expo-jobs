import _ from 'lodash';
import React, { Component } from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import Slides from '../components/Slides';
import { AppLoading } from 'expo';

const SLIDE_DATA = [
  { text: 'Slide 1', color: '#03a9f4' },
  { text: 'Slide 2', color: '#009688' }
];

class WelcomeScreen extends Component {
  state = { token: null };

  componentWillMount() {
    let token = AsyncStorage.getItem('fb_token');
    if(token){
      this.props.navigation.navigate('map');
      this.setState({ token });
    }else{
      this.setState({ token: false });
    }
  }

  onSlidesComplete = () => {
    this.props.navigation.navigate('auth');
  }

  render() {
    if(this.state.token === null){
        return <AppLoading />;
    }

    return(
      <Slides data={SLIDE_DATA} onComplete={this.onSlidesComplete} />
    );
  }
}

export default WelcomeScreen;
