import React from 'react';
import {Image} from 'react-native';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import bookdonatescreen from '../screens/bookdonatescreen'
import bookrequestscreen from '../screens/bookrequestscreen';
export const AppTabNavigator=createBottomTabNavigator({
    DonateBooks:{
        screen:bookdonatescreen,
        navigationOptions:{
            tabBarIcon:<Image source={require("../assets/request-list.png")} style={{width:20,height:20}}/>,
            tabBarLabel:"donate books",

                    }
    },
   bookrequest:{
        screen:bookrequestscreen,
        navigationOptions:{
            tabBarIcon:<Image source={require("../assets/request-book.png")} style={{width:20,height:20}}/>,
            tabBarLabel:"request books",
        }
                    }
});