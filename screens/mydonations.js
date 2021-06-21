import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList,TouchableOpacity } from 'react-native';
import { ListItem } from 'react-native-elements'
import firebase from 'firebase';
import db from '../config'
import MyHeader from '../components/MyHeader';
import { SnapshotViewIOS } from 'react-native';
import { render } from 'react-dom';
export default class MyDonations extends Component{
    constructor(){
        super()
        this.state={
            userid:firebase.auth().currentUser.email,
            alldonations:[]
        }
    }
    getalldonations=()=>{
        this.requestref=db.collection("all_donations").where("donor_id",'==',this.state.userid)
        .onSnapshot((Snapshot)=>{
            var alldonations=Snapshot.docs.map(document=>document.data());
            this.setState({
                alldonations:alldonations
            });

        })
    }
    keyextractor=(item,index)=>index.toString(
        renderItem({item,i})=>(
            <ListItem key={i}
            title={item.book_name}
            subtitle={"requested by"+item.requested_by"\nstatus"+item.request_status}
            leftElement={<Icon name="book" type="font-awesome" color='#696969'/>}
            titleStyle={{color:'black',fontWeight:'bold'}}
            rightElement={
                <TouchableOpacity style={styles.button}>
                    <Text style={{color:'#FFFF'}}>Send Book ❓</Text>
                    </TouchableOpacity>

            }
            bottomdivider/>
        )
        sendbook=(bookdetails)=>{
            if(bookdetails.request_status==="book sent"){
                var requeststatus="donor interested"
                db.collection("all_donations").doc(bookdetails.doc_id).update({
                    "request_status":"donor interested"
                })
                this.sendNotification(bookdetails,requeststatus)
            }
            else{
                var requeststatus="book sent"
                db.collection("all_donations").doc(bookdetails.doc_id).update({
                    "request_status":"book sent"
                })
                this.sendNotification(bookdetails,requeststatus)
            }
        }
        sendNotification=(bookdetails,requeststatus)=>{
            var requestid=bookdetails.request_id
            var donorid=bookdetails.donor_id
            db.collection("all_notifications").where("request_id","==",requestid).where("donor_id","==",donorid)
            .get()
            .then((Snapshot)=>{
                Snapshot.forEach((doc)=>{
                    var message=""
                    if(requeststatus==="book sent"){
                        message=this.state.donorname +"sent you a book"
                    }
                    else{
                        message=this.state.donorname+"Has shown interest in donating the book"
                    }
                    db.collection('all_notifications').doc(doc.id).update({
                        "message":message,
                        "notification_status":"unread",
                        "date":firebase.firestore.FieldValue.serverTimestamp()
                    })
                })
            })
        }
        componentDidMount(){
            this.getalldonations()
        }
        render(){
            return(
                <View style={{flex:1}}            )></View>
                <View style={{flex:1}}>
                {this.state.alldonations===0}
                ?(
                    <View style={styles.subtitles}>
                    <Text style={{fontSize:20}}>List of all book donations</Text>
                    </View>
                )
                :(
                    <FlatList
                    keyextractor={this.keyextractor}
                    data={this.state.alldonations}
                      renderItem=this.renderItem  />
                    
                )
                </View>
                </View>
        }
    )
}