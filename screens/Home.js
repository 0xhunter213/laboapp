import React from 'react';
import { Button, View } from 'react-native';
import firebase from '../Config'
const signout = async () => {
    await firebase.auth().signOut();
}

function Home(props) {
    return (
        <View>
            <Button
                onPress={signout}
            ></Button>
        </View>
    );
}

export default Home;