import React ,{useState} from 'react';
import { View ,StyleSheet, StatusBar} from 'react-native';
import MapView from 'react-native-maps';

function map({navigation}) {
    const [mapRegion, setmapRegion] = useState({
        latitude: 35.20964614026268,
        longitude: -0.6331509261634762,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });
    return (
        <View style={styles.container}>
            <MapView 
             style={styles.map}
             region={mapRegion}
            >
            </MapView>
        </View>
    );
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        marginTop: StatusBar.currentHeight,
    },
    map:{
        justifyContent:'flex-start',
        height:'50%'
    }
})

export default map;