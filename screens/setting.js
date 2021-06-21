import React,{Component} from 'react';
import {View,Text,StyleSheet,Image,TextInput,TouchableOpacity,Alert,KeyboardAvoidingView,Modal, ScrollView} from 'react-native';
import  firebase from 'firebase'
import db from '../config'
export default class Setting extends Component{
    constructor(){
        super();
        this.state={
emailid:'',
firstname:'',
lastname:'',
address:'',
contact:'',
docId:'',

                    }
    }
}
getuserdetails=()=>{
    var email=firebase.auth().currentUser.email;
    db.collection('users').where('email_id','==',email).get()
    .then(snapshot=>{
        snapshot.forEach(doc=>{
            var data=doc.data()
            this.setState({
                emailid:data.email_id,
                firstname:data.first_name,
                lastname:data.last_name,
                address:data.address,
                contact:data.contact,
                docId:doc.Id
            })
        })
    })
    
}
updateuserdetails=()=>{
    db.collection('users').doc(this.state.docId).update({
        "first_name":this.state.firstname,
        "last_name":this.state.lastname,
        "address":this.state.address,
        "contact":this.state.contact
    })
    alert("Profile updated successfully :)")
}
componentDidMount(){
    this.getuserdetails();
}
render(){
    return(
        <View style={styles.container}>
            <View style={styles.formcontainer}>
            <TextInput
          style={styles.formTextInput}
          placeholder ={"First Name"}
          maxLength ={8}
          onChangeText={(text)=>{
            this.setState({
              firstName: text
            })
          }}
          value={this.state.firstname}
        />
        <TextInput
          style={styles.formTextInput}
          placeholder ={"Last Name"}
          maxLength ={8}
          onChangeText={(text)=>{
            this.setState({
              lastName: text
            })
          }}
          value={this.state.lastname}
        />
        <TextInput
          style={styles.formTextInput}
          placeholder ={"Contact"}
          maxLength ={10}
          keyboardType={'numeric'}
          onChangeText={(text)=>{
            this.setState({
              contact: text
            })
          }}
          value={this.state.contact}
        />
        <TextInput
          style={styles.formTextInput}
          placeholder ={"Address"}
          multiline = {true}
          onChangeText={(text)=>{
            this.setState({
              address: text
            })
          }}
          value={this.state.address}
        />
        <TouchableOpacity style={styles.button}
        onPress={()=>{
            this.updateuserdetails()
        }}>
            <Text style={styles.buttontext}>Save</Text>
        </TouchableOpacity>
            </View>
        </View>
    )
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    formcontainer:{
        flex:1,
        width:'100%',
        alignItems:'center'
    },
    formTextInput:{
        width:"75%",
        height:35,
        alignSelf:'center',
        borderColor:'#FFAB91',
        borderRadius:10,
        borderWidth:1,
        marginTop:20,
        padding:10
    
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
        shadowRadius:10.329,
        elevation:16,
        marginTop:20
    },
    buttontext:{
        fontSize:25,
        fontWeight:"bold",
        color:"#FFF",

    }
})
