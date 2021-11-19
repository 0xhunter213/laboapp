import AsyncStorage from '@react-native-async-storage/async-storage';
import { setItemAsync } from 'expo-secure-store';
import AppLoading from 'expo-app-loading';
import React ,{useState} from 'react';
import { View ,StyleSheet, StatusBar, FlatList, TouchableOpacity,Text} from 'react-native';
import MapView ,{Marker} from 'react-native-maps';
import {Hopitale} from './data'
import firebase from '../Config'
import { useEffect } from 'react';
function map({navigation}) {
    const [mapRegion, setmapRegion] = useState({
        latitude: 35.20325777435713,
        latitudeDelta: 0.0007343366509563,
        longitude: -0.6339909395442291,
        longitudeDelta: 0.10097647180557,
    });
    const [hopital,setHop]= useState([])
    let general = null;
    let blood= null;
    const infos = AsyncStorage.getItem('Informations').then(
        (data) =>{
            general = JSON.parse(data)
            blood = general.BloodType
     
        }
    ).catch(
        (error) => {
            console.log("seddaoui make error fuck you ",error)
        }
    )
    const [loading,setLoading] = useState(true)
    const [id,setID] = useState([])   
    const [marker,setMarker] = useState(false)
    const [coordinate,setCoordinate] = useState()
    const fetchData = async () =>{
        await infos;
        let data =[]
        await firebase.firestore().collection("hopitals").get().then(
            (docs) =>{
                docs.forEach(
                    (dat) => {
                        let e = dat.data()
                        data.push(e)
                    }
                )
            }
        ).catch(
            err => console.error("fetching data error :"+err)
        ).finally(
            setHop(data)
        )

    }
    const hopitalItem = ({item}) => {
        console.log(item)
        let donateState = (id.includes(item.id))? {borderColor:'grey'}:{borderColor:'green'};
        let colorText = (id.includes(item.id))?{color:'grey'}:{color:'green'}
        let text = (id.includes(item.id))? 'Merci!': 'Donner du sang'
        return(
            <TouchableOpacity 
                style={styles.hopitalContainer}
                onPress={() => {
                    if(coordinate === item.coordinate){
                        setMarker(false)
                        console.log(marker)
                        setCoordinate(null) 
                    }else{
                        setMarker(true)
                        setCoordinate({
                            latitude: item.coordinate.latitude, 
                            latitudeDelta: 0.7237343366509563,
                            longitude:item.coordinate.longitude,
                            longitudeDelta: 1.123857647180557,
                        })
                    }
                }}
            >
                <View style={styles.hopitalNames}>
                    <Text style={styles.contentTitle}>{item.hopitalName}</Text>
                    <Text style={[styles.contenBlood,styles.contentTitle]}>{item.bladeNeed}</Text>
                    <Text style={styles.contentTitle}>{item.deadLine}</Text>
                </View>
                <TouchableOpacity style={[styles.addMe,donateState]} onPress={async () =>{
                    if(!id.includes(item.id)){
                        setID([...id,item.id])
                        /*console.log(typeof(infos),"infos ==>",infos,infos.FirstName)
                        await firebase.firestore().collection("donationList").doc().set(
                            {
                                firstName:general.FirstName,
                                LastName:general.LastName,
                                PhoneNumber:general.phoneNumber,
                                Email:firebase.auth().currentUser.email,
                                hopital:item.hopitalName
                            }
                        )*/
                        
                        await firebase.database().ref('/donationList').set(
                            {
                                firstName:general.FirstName,
                                LastName:general.LastName,
                                PhoneNumber:general.phoneNumber,
                                Email:firebase.auth().currentUser.email,
                                hopital:item.hopitalName
                            }
                        )
                        await AsyncStorage.setItem("donnationHopital",id.toString())
                    }
                }}>
                    <Text style={[styles.donate,colorText]}>{text}</Text>
                </TouchableOpacity>
            </TouchableOpacity>
        );
    }

    var infor = []
    if(loading){
        return (
          <AppLoading 
            startAsync={fetchData}
            onFinish={() => {
                console.log(hopital)
                setLoading(false)
            }}
            onError={console.warn}
          ></AppLoading>
        );
      }
    return (
        <View style={styles.container}>
            <MapView 
             style={styles.map}
             initialRegion={mapRegion}
            >
                {
                    marker && <Marker coordinate={coordinate} />
                   /* coordinates.map( (coordinate,e)=> { return <Marker key={e} coordinate={coordinate}/>})*/                   
                }
            </MapView>
            <FlatList 
                style={styles.hopitalList}
                data={hopital}
                renderItem={hopitalItem}
                keyExtractor={item => item.hopitalName}
            />
        </View>
    );
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        marginTop: StatusBar.currentHeight,
        backgroundColor:'white'
    },
    map:{
        justifyContent:'flex-start',
        height:'50%'
    },
    hopitalList:{
        height:'50%',
        width:'100%',
        
    },  
    hopitalContainer:{
        width:'98%',
        margin:'1%',
        flex:1,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        padding:'2%',
        paddingRight:'1%',
        borderColor:'#D01D0E',
        borderWidth:1,
        borderRadius:10
    },
    hopitalNames:{
        flex:1,
        justifyContent:'flex-start',
        alignContent:'center',
    },
    addMe:{
        justifyContent:'flex-end',
        alignContent:'center',
        padding:5,
        borderWidth:1,
        borderRadius:5
    },
    contentTitle:{
        fontStyle:'italic',
        fontSize:16
    },
    contenBlood:{
        color:'red'
    }


})

export default map;