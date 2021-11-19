import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useCallback, useContext } from 'react';
import { useState } from 'react';
import { Button, View, Text,StyleSheet,FlatList, StatusBar, SafeAreaView, TextInput, Image,TouchableOpacity } from 'react-native';
import AuthContextUser  from '../AuthContext';
import firebase from '../Config'
import {data} from './data'
import MapView from 'react-native-maps';

import { NavigationContainer } from '@react-navigation/native';
function Home(props) {
    const {currentUset,setCurrentUser} = useContext(AuthContextUser)
    const [dat,setData] = useState(data)
    const [search,setSearch] = useState([])
    const signout = () => {
         AsyncStorage.removeItem('userToken').then(
            () => {        
                console.log('clear is on progress');
                setCurrentUser("");
            }
    
        ).catch(error => console.error('error raised here'+error))
    }
    const items = ({item}) => {
        const avlb = item.avlb=='False'?false:true;
        return(
            <View style={styles.item}>
                <View style={styles.itemHead}>
                    <Text style={styles.title}>{item.Abrv}</Text>
                    <Text style={styles.abrv}>{item.scNm}</Text>
                </View>
                <View style={styles.dispo}>
                    { avlb?
                    <Text style={styles.avab} >disponible</Text>
                    :
                    <Text style={styles.unavab}>indisponible</Text>
                    }
                </View>

            </View>
        );
    }
    /*
                <Button
                onPress={signout}
                title='Logout'
            >
            </Button>
    */
 
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.headApp}>Nos Tests de Laboratoire</Text>
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.search}
                    onChangeText={(text) =>{/*if(text){setSearch(text)}*/    
                    if(text == '' || text == ' '){
                        setData(data)
                    }
                    else{
                    const s = data.filter(
                            (e)=>{
                                if(e.Abrv != null){
                                    if(e.Abrv.includes(text.toLowerCase())){
                                        if(search.map((g)=>{if(g.Abrv == e.Abrv ) return false})){
                                            return e;
                                        }
                                    }
                                }else{
                                    if(e.scNm != null){
                                        if(e.scNm.includes(text.toLowerCase())){
                                            if(search.map((g)=>{if(g.scNm == e.scNm ) return false})){
                                                return e
                                        }
                                    }else{
                                        return;
                                    }
                                }    
                            }
                        }
                        );
                    
                    setData(s)
                    }
                }}
                    placeholder="Rechercher votre Test ici !"
                ></TextInput>
                <View style={styles.image}>
                    <Image source={require('../assets/loupe.png')}></Image>
                </View>
            </View>
            <FlatList
                style={styles.list}
                data={dat}
                renderItem={items}
                keyExtractor={item => item.Abrv}
            />
            <TouchableOpacity style={styles.logout} onPress={() => signout()}>
                <Text style={styles.text_log}>Se déconnecter</Text>
            </TouchableOpacity>
        </SafeAreaView>
    
    );
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        marginTop:StatusBar.currentHeight,
        paddingTop:'5%',
        marginBottom:5
    },
    headApp:{
        fontSize:25,
        color:'#D01D0E',
        fontStyle: 'italic'
    },
    searchContainer:{
        height:70,
        width:'96%',
        flexDirection:'row',
        padding:'4%',
        alignContent:'flex-end',
        justifyContent:'flex-start',
        borderColor:'#cccccc',
        borderBottomWidth:1.5
    },
    search:{
        width:'90%',
        fontSize:18,
    },
    searchImg:{
        height:'100%',
        width:'20%',
        resizeMode:'contain'
    },
    image:{
        flex:1,
        justifyContent:'center'
    },
    list:{
        width:'90%',
        margin:'5%',
        },
    item:{
        flex:1,
        flexDirection:'row',
        width:'97%',
        borderColor:'#D01D0E',
        borderWidth:1,
        margin:'2%',
        borderRadius:10,
        padding:1,
    
    },
    itemHead:{
        flex:1,
        padding:'1%'
    },
    title:{
        fontSize:24,
    },
    abrv:{
        fontSize:12,
        padding:'1%',
        color:'#95a5a6'
    },
    dispo:{
        alignItems:'flex-end',
        justifyContent:'center',
    },
    avab:{
        color:'green',
        width:'100%',
        padding:'3%',
        textAlign:'center',

    },
    unavab:{
        color:'red',
        width:'100%',
        padding:'3%',        
        textAlign:'center',
    },
    logout:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        borderColor:'red',
        borderRadius:10,
        height:40,
        borderWidth:1,
        paddingHorizontal:10,
        backgroundColor:'#D01D0E',
    },
    text_log:{
        fontSize:18,
        color:'white'
    }
})
export default Home;