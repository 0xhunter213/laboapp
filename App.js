import React, { useContext,useState ,useEffect} from 'react';
import { StyleSheet, Text, View ,ActivityIndicator} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignIn from './screens/SignIn'
import Home from './screens/Home'
import {AuthContextProvider,AuthContextUser} from './AuthContext'
import firebase from './Config'



export default function App() {
  const Stack = createNativeStackNavigator();
  const {currentUser,setUser}= useContext(AuthContextUser)
  const [loading,setLoading] = useState(true)
  console.log('App.js is working')
  useEffect(() => {
    const unsubscribeAuth = firebase.auth().onAuthStateChanged(async authenticatedUser => {
      try {
        await (authenticatedUser ? setUser(authenticatedUser) : setUser(null));
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    });
    return unsubscribeAuth;
  }, []);
  if(loading){
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size='large' />
      </View>
    );
  }
  console.log(loading,currentUser)
  return (
      <AuthContextProvider>
          <NavigationContainer>
            <Stack.Navigator>
              {currentUser?
                <Stack.Screen name="Home" component={Home}/>
                :
                <Stack.Screen  name="SignIn" component={SignIn}/>
              }
            </Stack.Navigator>
          </NavigationContainer>
      </AuthContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
