import React ,{useState}from 'react';
import {SafeAreaView, Text, TextInput,StyleSheet, Pressable, Image,View, TouchableOpacity, ScrollView, StatusBar,Picker} from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker';
import firebase from '../Config'

function signup({navigation}) {
    const [firstName,setFirstname] = useState(null)
    const [lastName, setLastName] = useState(null)
    const [email,setEmail] = useState(null)
    const [password,setPassword] = useState(null)
    const [phoneNumber,setPhoneNumber] = useState(null) 
    const [bloodType,setBloodType] = useState("A+")
    const [show,setShow] = useState(true)
    const [show1,setShow1] = useState(true)
    const [confirm , setConfirm] = useState(false)
    const [error,setError] = useState(false)
    const [errText,setErrText] = useState('')
    const [confPass,setConfPass]= useState(null)
    const [selectItem,setSelectItem] = useState()
    const signup = (firstName,lastName,email,password,phoneNumber,bloodType)=>{
        firebase.auth().createUserWithEmailAndPassword(email,password).then(
            (CredentialUser) => {
                const uid = firebase.auth().currentUser.uid;
                console.log(uid)
                /*const uid = "tnfapBxvvagcFueO6PjNpaJUqxv1"*/
                firebase.firestore().collection("users").doc(uid).set(
                    {
                        FirstName:firstName,
                        LastName:lastName,
                        phoneNumber:phoneNumber,
                        BloodType:bloodType,

                    }
                ).then(
                    console.log("data was inseted thnx !")
                ).catch(
                    error => {
                        setError(true)
                        setErrText("server error try again !")
                    }
                )
        }  
        ).catch(
            (error) => {
            setError(true)
            setErrText("the email has already tokenS")  
            console.log(error)  
            }
        )
        
    }
    const SignUpInfos=  () =>{
        const uid = firebase.auth().currentUser.uid;
        console.log(typeof(uid))
        /*const uid = "tnfapBxvvagcFueO6PjNpaJUqxv1"*/
        firebase.firestore().collection("users").doc(uid).set(
            {
                FirstName:firstName,
                LastName:lastName,
                phoneNumber:phoneNumber,
                BloodType:bloodType,

            }
        ).then(
            console.log("data was inseted thnx !")
        ).catch(
            error => {
                setError(true)
                setErrText("server error try again !")
            }
        )
    }
    return (
        <SafeAreaView style={styles.contianer}>
        <ScrollView>
        <View style={styles.contianer}>
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
                    placeholder="Nom"
                    onChangeText={text =>{if(text) setFirstname(text)}}
                    style={styles.textIn}
                >
                </TextInput>
            </View>
            <View style={styles.Input}>
                <Image 
                    style={styles.icon}
                    source={require('../assets/username.png')}
                />
                <TextInput
                    placeholder="Prénom"
                    onChangeText={text =>{if(text) setLastName(text)}}
                    style={styles.textIn}
                >
                </TextInput>
            </View>
            <View style={styles.Input}>
                <Image 
                    style={styles.icon}
                    source={require('../assets/phoneNumber.png')}
                />
                <TextInput
                    placeholder="Numéro de téléphone"
                    onChangeText={text =>{if(text) setPhoneNumber(text)}}
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
                <Image 
                    style={styles.icon}
                    source={require('../assets/bloodType.png')}
                />
                <Picker
                    placeholder="Groupe sanguin"
                    selectedValue={bloodType}
                    onValueChange = {
                        (itemValue, itemIndex) =>{setBloodType(itemValue)}
                    }
                    style={[styles.textIn,styles.picker]}
                >
                    <Picker.Item label="A+" value="A+" />
                    <Picker.Item label="B+" value="B+" />
                    <Picker.Item label="O+" value="O+" />
                    <Picker.Item label="AB+" value="AB+"/>
                    <Picker.Item label="A-" value="A-" />
                    <Picker.Item label="B-" value="B-" />
                    <Picker.Item label="O-" value="O-" />
                    <Picker.Item label="AB-" value="AB-"/>
                   
                </Picker>
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
        <TouchableOpacity style={styles.button} onPress = {() =>{
        const cond = firstName && lastName && phoneNumber && password && email && bloodType;
        if(cond){
            if(password ==confPass ){
                setError(false)
                try{
                signup(firstName,lastName,email,password,phoneNumber,bloodType);
                navigation.navigate('SignIn');
                }catch(e){
                    console.log("error is here man !")
                }
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
        </View>
    </ScrollView>
    </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    contianer:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#fff',
        marginTop:StatusBar.currentHeight,
        paddingBottom:StatusBar.currentHeight,

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
        marginTop:5,
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
    },
    picker:{
        width:'85%'
    }
})
export default signup;