import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import WelcomeScreen from './screens/welcomescreen'
import{AppTabNavigator} from './components/apptabnavigator'
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { AppDrawerNavigator } from './components/appdrawernavigator';
export default function App() {
  return (
    <Appcontainer/>
  );
}
const switchnavigator=createSwitchNavigator({
  WelcomeScreen:{screen:WelcomeScreen},
  Drawer:{screen:AppDrawerNavigator},
  BottomTab:{screen:AppTabNavigator}
})
const Appcontainer=createAppContainer(switchnavigator);


