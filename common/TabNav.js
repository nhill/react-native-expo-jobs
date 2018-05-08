import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';

export default TabNav = (props) => {
  const tabProps = {};
  for(var i in props){
    tabProps[i] = (typeof(props[i]) != 'String' && typeof(props[i].screen) == 'undefined')?{ screen: props[i] }:props[i];
  }
  return TabNavigator(tabProps);
}
