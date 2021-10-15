import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useCallback, useContext } from 'react';
import { Button, View, Text,StyleSheet } from 'react-native';
import AuthContextUser  from '../AuthContext';
import firebase from '../Config'

function Home(props) {
    const {currentUset,setCurrentUser} = useContext(AuthContextUser)
    const signout = () => {
         AsyncStorage.removeItem('userToken').then(
            () => {        
                console.log('clear is on progress');
                setCurrentUser("");
            }
    
        ).catch(error => console.error('error raised here'+error))
    }
    return (
        <View style={styles.container}>
            <Text>Welcome Home</Text>
            <Button
                onPress={signout}
                title='Logout'
            ></Button>
        </View>
    );
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    }
})
export default Home;