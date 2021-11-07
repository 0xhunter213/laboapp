import React ,{useState}from 'react';
import {SafeAreaView, Text, TextInput,StyleSheet, Pressable, Image,View, TouchableOpacity} from 'react-native'
import firebase from '../Config'

function signup({navigation}) {
    const [username,setUsername] = useState(null)
    const [email,setEmail] = useState(null)
    const [password,setPassword] = useState(null)
    const [show,setShow] = useState(true)
    const [show1,setShow1] = useState(true)
    const [confirm , setConfirm] = useState(false)
    const [error,setError] = useState(false)
    const [errText,setErrText] = useState('')
    const [confPass,setConfPass]= useState(null)
    const signup = (username,email,password)=>{
        firebase.auth().createUserWithEmailAndPassword(email,password).then(
            (CredentialUser) => {
                console.log(CredentialUser.user)
            }
        )
    }
    return (
        <SafeAreaView style={styles.contianer}>
        <Image 
            style={styles.images}
            source={require('../assets/logo.png')}
        ></Image>
        {error?
        <Text style={styles.error}>{errText}</Text>
        :<></>
        }
        <View style={styles.viewCreds}>
            <View style={styles.Input}>
                <Image 
                    style={styles.icon}
                    source={require('../assets/username.png')}
                />
                <TextInput
                    placeholder="Nom d'utilisateur"
                    onChangeText={text =>{if(text) setUsername(text)}}
                    style={styles.textIn}
                >
                </TextInput>
            </View>
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
                {confirm?
                <Image source={require('../assets/check.png')} style={styles.eye}/>
                :
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
                }
            </View>
            <View style={styles.Input}>
                <Image source={require('../assets/password-gray.png')} style={[styles.icon,styles.icon1]}/>
                <TextInput
                    placeholder="Confirmer Mot de Passe"
                    secureTextEntry={show}
                    onChangeText={text => {if(password === text){setConfirm(true);setConfPass(text)}}}
                    style={styles.textIn}
                ></TextInput>
                <View>
                {confirm?
                <Image source={require('../assets/check.png')} style={styles.eye}/>
                :
                <TouchableOpacity 
                    style={styles.eyeCont} 
                    onPress={() => setShow1(!show1)}
                >
                    {show1?
                    <Image source={require('../assets/eye.png')} style={styles.eye}/>
                    :
                    <Image source={require('../assets/closed-eye.png')} style={styles.eye}/>
                    }
                </TouchableOpacity>
                }
                </View>
            </View>
        </View>
        <TouchableOpacity style={styles.button} onPress = {() =>{if(email && password && username){
            if(password ==confPass ){
                setError(false)
                signup(username,email,password);
                navigation.navigate('SignIn');
            }else{
                setConfirm(false)
                setErrText("confirmer votre mot de passe")
                setError(true)
            }
            
        }else{
            setErrText("remplissez toutes les informations s'il vous plaît !")
            setError(true)
        }
            }}>
            <Text style={styles.text}>s'inscrire</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.noaccount} onPress={() => navigation.navigate('SignIn')}>
                <Text>J'ai déjà un compte</Text>
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
        height:'100%',
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
    error:{
        fontSize:14,
        color:'red'
    }
})
export default signup;