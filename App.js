import React from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import store from './store';
import { Notifications } from 'expo';

import AuthScreen from './screens/AuthScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import MapScreen from './screens/MapScreen';
import DeckScreen from './screens/DeckScreen';
import ReviewScreen from './screens/ReviewScreen';
import SettingsScreen from './screens/SettingsScreen';

import registerForNotifications from './services/push_notifications';

export default class App extends React.Component {
  componentDidMount() {
    registerForNotifications();
    Notifications.addListener((notification) => {
        const { data: { text }, origin } = notification;

        if(origin === 'received' && text){
          Alert.alert('Received push notification', text);
        }

    });
  }

  render() {
    const MainNavigator = TabNavigator({
      welcome: { screen: WelcomeScreen },
      auth: { screen: AuthScreen },
      main: {
        screen: TabNavigator({
          map: { screen: MapScreen },
          deck: { screen: DeckScreen },
          review: {
            screen: StackNavigator({
                review: { screen: ReviewScreen },
                settings: { screen: SettingsScreen }
            })
          }
        },
        {
          tabBarPosition: 'bottom',
          tabBarOptions: {
             showIcon: true
           }
        })
      }
    },
    {
      swipeEnabled: true, // fixes a bug in react navigation
      lazy: true, // fixes a bug in react navigation
      tabBarPosition: 'bottom',
      navigationOptions: {
        tabBarVisible: false
      }
    });

    return (
      <Provider store={store}>
        <MainNavigator />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
