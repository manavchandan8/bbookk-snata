import React,{Component} from 'react';
import {View,Text,StyleSheet,Image,TextInput,TouchableOpacity,Alert,KeyboardAvoidingView,Modal, ScrollView} from 'react-native';
import * as firebase from 'firebase'
import {DrawerItems} from 'react-navigation-drawer'
export default class CustomSideBarMenu extends Component{
    render(){
        return(
            <View style={{flex:1}}>
            <View style={styles.draweritemscontainer}>
                <DrawerItems {...this.props}/>
            </View>
            <View style={styles.logoutcontainer}>
                <TouchableOpacity style={styles.logoutbutton}
                onPress={()=>{
                    this.props.navigation.navigate('WelcomeScreen')
                    firebase.auth().signOut()
                }}
                >
<Text>Log out</Text>
                </TouchableOpacity>
            </View>
            </View>
        )
    }
}
var styles=StyleSheet.create({
    container:{
        flex:1
    },
    draweritemscontainer:{
        flex:0.8,
            },
            logoutcontainer:{
                flex:0.2,
                justifyContent:'flex-end'
            },
            logoutbutton:{
                height:30,
                width:'100%',
                justifyContent:'center',
                padding:10
                            },
                            logouttext:{
                                fontSize:30,
                                fontWeight:'bold'
                            }
})