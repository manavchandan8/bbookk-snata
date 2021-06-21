import React,{Component} from 'react';
import {View,Text,StyleSheet,Image,TextInput,TouchableOpacity,Alert,KeyboardAvoidingView,Modal, ScrollView} from 'react-native';
import * as firebase from 'firebase'
import db from '../config'
import { Header } from 'react-native/Libraries/NewAppScreen';
export default class RecieverDetailScreen extends Component{
    constructor(props){
super(props);
this.state={
    userid:firebase.auth().currentUser.email,
    recieverid:this.props.navigation.getParam('details')["user_id"],
    requestid:this.props.navigation.getParam('details')["request_id"],
    bookname:this.props.navigation.getParam('details')["book_name"],
    reason_for_request:this.props.navigation.getParam('details')["reason_to_request"],
    recievername:'',
    recievercontact:'',
    recieveraddress:'',
    recieverrequestdocid:'',

}
    }
    getrecieverdetails(){
        db.collection('users').where('email_id','==',this.state.recieverid).get()
        .then(snapshot=>{
            snapshot.forEach(doc=>{
                this.setState({
                    recievername:doc.data().first_name,
                    recievercontact:doc.data().contact,
                    recieveraddress:doc.data().address
                })
            })
        })
     db.collection('requested_books').where('request_id','==',this.state.requestid).get()
     .then(snapshot=>{
         snapshot.forEach(doc=>{
             this.setState({recieverrequestdocid:doc.id})
         })
     })       
    }
    updatebookstatus=()=>{
        db.collection('all_donations').add({
            book_name:this.state.bookname,
            request_id:this.state.requestid,
            requested_by:this.state.recievername,
            donor_id:this.state.userid,
            request_status:"donor interested"
        })
    }
    addnotification=()=>{
        var message=this.state.username + "has shown interest in donating da book"
        db.collection("all_notifications").add({
            "targeted_user_id":this.state.recieverid,
            "donor_id":this.state.userid,
            "request_id":this.state.requestid,
            "book_name":this.state.bookname,
            "date":firebase.firestore.FieldValue.serverTimestamp(),
            "notication_status":"unread",
            "message":message
        })
    }
    componentDidMount(){
        this.getrecieverdetails()
    }
    render(){
        return(
            <View style={styles.container}>
                <View style={{flex:0.1}}>
                    <Header 
                    leftComponent={<Icon name='arrow-left' type='feather' color='#696969' onPress={()=>this.props.navigation.goBack()}/>}
                    centerComponent={{text:"donate books",style={color:'#90A5A9',fontSize:20,fontWeight:"bold"}}}
                backgroundColor="#EAF8FE"/>

                </View>
                <View style={{flex:0.3}}>
                <Card title={"book information"}
                titleStyle={{fontSize:20}}
                >
                    <Card>
                        <Text style={{fontWeight:'bold'}}>Name:{this.state.bookname}</Text>
                    </Card>
                    <Card>
                        <Text style={{fontWeight:'bold'}}>Reason:{this.state.reason_for_request}</Text>
                    </Card>
                    
                </Card>
                </View>
            </View>
        )
        <Card title={"reciever information"}
        titleStyle={{fontSize:20}}
        >
            <Card>
                <Text style={{fontWeight:'bold'}}>Name:{this.state.recievername}</Text>
            </Card>
            <Card>
                <Text style={{fontWeight:'bold'}}>Contact:{this.state.recievercontact}</Text>
            </Card>
            <Card>
                <Text style={{fontWeight:'bold'}}>Address:{this.state.recieveraddress}</Text>
            </Card>
        </Card>
        </View>
        <View style={styles.buttoncontainer}>
            {
                this.state.recieverid !== this.state.userid
                ?(
                    <TouchableOpacity style={styles.button}
                    onPress={()=>{
                        this.updatebookstatus()
                        this.addnotification()
                        this.props.navigation.navigate('MyDonations')
                    }}>
                        <Text>I want to donate</Text>
                    </TouchableOpacity>
                )
            :null                 
            }
        </View>
        </View>
    }
