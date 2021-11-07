import { enableExpoCliLogging } from 'expo/build/logs/Logs';
import React, { useContext, useState } from 'react';
import {SafeAreaView, Text, TextInput,StyleSheet, Pressable, Image,View, TouchableOpacity} from 'react-native'
import firebase from '../Config'
import AuthContextUser from '../AuthContext'
import AsyncStorage from '@react-native-async-storage/async-storage';

function SignIn ({navigation}) {
    const [email,setEmail] = useState(null)
    const [password,setPassword] = useState(null)
    const {currentUser,setCurrentUser} = useContext(AuthContextUser)
    const [show,setShow] = useState(true)
    const login = (email, password) => {
        if(email && password){
            firebase.auth().signInWithEmailAndPassword(email,password).then(
            (user)=>{
                var userId = user;
                console.log(userId);
                presistLogin(user)
            }
        ).catch(error => console.log('error'+error))
        }
    }
    const presistLogin = async (creds) => {
       
        await AsyncStorage.setItem('userToken',JSON.stringify(creds))
        .then(
            () => { 
                console.log('presist works ')
                setCurrentUser(creds);
                console.log('user is '+currentUser+'===========')
            }
        ).catch( error => console.log('set AsyncStorage error: '+error))
    }
    return (
        <SafeAreaView style={styles.contianer}>
            <Image 
                style={styles.images}
                source={require('../assets/logo.png')}
            ></Image>
            <View style={styles.viewCreds}>
                <View style={styles.Input}>
                    <Image 
                        style={styles.icon}
                        source={require('../assets/mail-gray.png')}
                    />
                    <TextInput
                        placeholder="E-mail"
                        keyboardType="email-address"
                        onChangeText={text =>{if(text) setEmail(text)}}
                        style={styles.textIn}
                    >
                    </TextInput>
                </View>
                <View style={styles.Input}>
                    <Image source={require('../assets/password-gray.png')} style={[styles.icon,styles.icon1]}/>
                    <TextInput
                        placeholder="Mot de Passe"
                        secureTextEntry={show}
                        onChangeText={text => setPassword(text)}
                        style={styles.textIn}
                    ></TextInput>
                    <TouchableOpacity 
                        style={styles.eyeCont} 
                        onPress={() => setShow(!show)}
                    >
                        {show?
                        <Image source={require('../assets/eye.png')} style={styles.eye}/>
                        :
                        <Image source={require('../assets/closed-eye.png')} style={styles.eye}/>
                        }
                    </TouchableOpacity>
                </View>
            </View>
            <TouchableOpacity style={styles.button} onPress={() => login(email,password)}>
                <Text style={styles.text}>s'identifier</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.noaccount} onPress={() => navigation.navigate('Signup')}>
                <Text>je n'ai pas de compte</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    contianer:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#fff'
    },
    images:{
        margin:'3%',
        resizeMode:'contain',
        height:150,
        width:150,
    },
    viewCreds:{
        padding:10,
        width:'100%'
    },
    Input:{
        flexDirection:'row',
        height:50,
        width:'100%',
        borderWidth:1,
        borderColor:'red',
        borderRadius:10,
        paddingTop:10,
        paddingBottom:10,
        marginTop:15,
    },
    icon:{
        height:'95%',
        width:'8%',
        marginLeft:10,
        marginRight:10
    },  
    textIn:{
        height:'100%',
        width:'75%'
    },
    eyeCont:{
        height:'100%',
        width:'7%'
    },
    eye:{
        resizeMode:'contain',
    },
    button:{
        backgroundColor:'#D01D0E',
        borderRadius:10,
        margin:'3%',
        paddingTop:'3%',
        paddingBottom:'3%',
        padding:'20%'

    },
    text:{
        color:'white',
        fontSize:20
    },
})
export default SignIn;