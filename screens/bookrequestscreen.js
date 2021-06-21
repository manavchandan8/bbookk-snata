import React,{Component} from 'react';
import {View,Text,StyleSheet,Image,TextInput,TouchableOpacity,Alert,KeyboardAvoidingView,Modal, ScrollView} from 'react-native';
import  firebase from 'firebase'
import db from '../config'
import Myheader from '../components/MyHeader';
export default class bookrequestscreen extends Component{
    constructor(){
        super();
        this.state={
            userid:firebase.auth().currentUser.email,
            bookname:"",
            reasontorequest:""
        }
    }
    createuniqueid(){
        return Math.random().toString(36).substring(7);
        }
        addrequest=(bookname,reasontorequest)=>{
            var userid=this.state.userid
            var randomrequestid=this.createuniqueid()
                db.collection('requested_books').add({
                    "user_id":userid,
                    "book_name":bookname,
                    "reason_to_request":reasontorequest,
                    "request_id":randomrequestid,
                })
                this.setState({
                    bookname:'',
                    reasontorequest:'',

                })
                return alert("book requested successfully")
            }
                render(){
                return(
                    <View style={{flex:1}}>
                    <Myheader title="request book"/>
                    <KeyboardAvoidingView style={styles.keyboardstyle}>
                    <TextInput style={styles.formtextinput}
                    placeholder={"enter book name"}
                    onChangeText={(text)=>{
                        this.setState({
                            bookname:text
                        })
                    }}
                    value={this.state.bookname}/>
                    <TextInput style={[styles.formtextinput,{height:300}]}
                    multiline
                    numberOfLines={8}
                    placeholder={"reason to request"}
                    onChangeText={(text)=>{
                        this.setState({
                            reasontorequest:text
                        })
                    }}
                    value={this.state.reasontorequest}/>
                    <TouchableOpacity style={styles.button}
                    onPress={()=>{this.addrequest(this.state.bookname,this.state.reasontorequest)}}>
                        <Text>request</Text>
                    </TouchableOpacity>
                    </KeyboardAvoidingView>
                    </View>
                )
            }
        }

const styles=StyleSheet.create({
    keyboardstyle:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
    },
    formtextinput:{
        width:"75%",
        height:35,
        alignself:'center',
        bordercolor:'#FFAB91',
        borderRadius:10,
        borderWidth:1,
        marginTop:20,
        padding:10,
    },
            button:{
            width:"75%",
            height:50,
            justifyContent:'center',
            alignItems:'center',
            borderRadius:10,
            backgroundColor:"#FF5722",
            shadowColor:"#000",
            shadowOffset:{
                width:0,
                height:8
    },
    shadowOpacity:0.44,
    shadowRadius:10.32,
    elevation:16,
    marginTop:20,
        },
}
)
