import React, { useContext,useState ,useEffect} from 'react';
import { StyleSheet, Text, View ,ActivityIndicator, SectionList} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SignIn from './screens/SignIn'
import Home from './screens/Home'
import AuthContextUser from './AuthContext'
import map from './screens/map'
import firebase from './Config'
import AppLoading from 'expo-app-loading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import signup from './screens/signup';

export default function App(){
  const Stack = createNativeStackNavigator();
  const [currentUser,setCurrentUser] = useState('')
  const [loading,setLoading] = useState(true)
  console.log('App.js is working')
 /* useEffect(() => {
    const unsubscribeAuth = firebase.auth().onAuthStateChanged(async authenticatedUser => {
        await (authenticatedUser ? setCurrentUser(authenticatedUser) : setCurrentUser(null));
        console.log('userToken: 1:'+currentUser);
    });
    return unsubscribeAuth;
  }, []);*/
  const fetchUser = async () => {
    await AsyncStorage.getItem('userToken').then(
      (result) => {
        console.log('fetch test result')
        if(result !== null){
          console.log('result does not null')
          setCurrentUser(JSON.parse(result));
          console.log('this from async storage'+currentUser)
        }else{
          console.log("result is null");
          setCurrentUser(null);
          setLoading(false);
        }
      }
    ).catch(error => console.error('check userToken: '+error))
  }
  if(loading){
    return (
      <AppLoading 
        startAsync={fetchUser}
        onFinish={() => setLoading(false)}
        onError={console.warn}
      ></AppLoading>
    );
  }
  console.log('loading:'+loading)
  console.log('test user'+JSON.stringify(currentUser))
  const Tab = createBottomTabNavigator()
  return (
    <AuthContextUser.Provider value ={{currentUser,setCurrentUser}}>
      <NavigationContainer>
       {currentUser!== ''& currentUser != null?(
         <Tab.Navigator  screenOptions={({route})=>({
           tabBarIcon:({focused,color,size}) =>{
             let icon;
             if(route.name == 'Home'){
               icon = 'home'
             }else{
               icon = 'map'
             }
             return <Ionicons name={icon} size={size} color={color} />
           },
           tabBarActiveTintColor: '#D01D0E',
           tabBarInactiveTintColor:'#000',
           headerShown:false
         })}>
           <Tab.Screen name="Home" component={Home}/>
           <Tab.Screen name="Map" component={map}/>
         </Tab.Navigator>
       )
       :(<>
         <Stack.Navigator  screenOptions={{headerShown: false}}>
           <Stack.Screen name="SignIn" component={SignIn}/>
           <Stack.Screen name="Signup" component={signup}/>
         </Stack.Navigator>
       </>
       )}
      </NavigationContainer>
    </AuthContextUser.Provider>
                    
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
