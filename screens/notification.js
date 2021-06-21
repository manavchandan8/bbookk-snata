import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList,TouchableOpacity } from 'react-native';
import { ListItem } from 'react-native-elements'
import firebase from 'firebase';
import db from '../config'
import MyHeader from '../components/MyHeader';
import { SnapshotViewIOS } from 'react-native';
import { render } from 'react-dom';
export default  class NotificationScreen extends Component {
    constructor(props){
        super(props)
        this.state={
            userid:firebase.auth().currentUser.email,
            allnotifications:[]
        }

    }
}