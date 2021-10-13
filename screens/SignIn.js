import { enableExpoCliLogging } from 'expo/build/logs/Logs';
import React, { useContext, useState } from 'react';
import {SafeAreaView, Text, TextInput,StyleSheet, Button} from 'react-native'
import firebase from '../Config'
import {AuthContextUser} from '../AuthContext'
const login = (email, password) => {
    firebase.auth().signInWithEmailAndPassword(email,password).then(
        (user)=>{
            var userId = user;
            console.log(userId);
        }
    ).catch(error => console.log('error'+error))
}
function SignIn(props) {
    const [email,setEmail] = useState(null)
    const [password,setPassword] = useState(null)
    return (
        <SafeAreaView style={styles.contianer}>
            <TextInput
                placeholder="E-mail"
                keyboardType="email-address"
                onChangeText={text => setEmail(text)}
                style={styles.emailInput}
            >
            </TextInput>
            <TextInput
                placeholder="Password"
                secureTextEntry
                onChangeText={text => setPassword(text)}
                style={styles.passwordInput}
            ></TextInput>
            <Button
                onPress={()=> {login(email,password)}}
                title='SigIn'
            ></Button>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    contianer:{
    },
})
export default SignIn;