import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import bookdonatescreen from '../screens/bookdonatescreen';
import recieverdetailsscreen from '../screens/Recieverdetailsscreen'
export const AppStackNavigator=createStackNavigator({
    bookdonatelist:{
        screen:bookdonatescreen,
        navigationOptions:{
            headerShown:false
        }
    },
    recieverdetails:{
        screen:recieverdetailsscreen,
        navigationOptions:{
            headerShown:false
        }
    },
},
{
    initialRouteName:'bookdonatelist'
}
})