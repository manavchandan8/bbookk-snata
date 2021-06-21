import { app } from 'firebase';
import React from 'react';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {AppTabNavigator} from './apptabnavigator'
import CustomSideBarMenu from './customsidebarmenu';
export const AppDrawerNavigator=createDrawerNavigator({
    Home:{
        screen:AppTabNavigator
    },
},
{
    contentComponent:CustomSideBarMenu
},
{
    initialRouteName:'Home'

})