import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useContext, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Image} from 'react-native';
import { NavigateBtn } from '../../../Components/Buttons';
import { PracticeContext } from '../../../Components/Context';
import Error from '../../../Components/Error';

export default function Login({route, navigation}) {
    const {lang, languageObj} = useContext(PracticeContext)

    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")

    
    const condition = email === "" || pass === ""
    
    const fun = async () => {
        try {
            axios.get(`http://192.168.1.36:3001/users/getByEmail/${email}`)
                .then(function (response) {
                    console.log("==> User: ", response.data);
                    (response.data.email).toLowerCase() === (email).toLowerCase() && response.data.pass === pass 
                    ?
                        axios.get(`http://192.168.1.36:3001/usersDetails/getByUserID/${response.data._id}`)
                        .then(function (response1) {
                            console.log(`==> User ${response.data.fname}`, response1.data);
                            
                            let user = {...response.data, ...response1.data}
                            console.log(user);
                            
                            AsyncStorage.setItem('user', JSON.stringify(user))
                            console.log("User info stored");
                            route.params.setLogged(true)
                            navigation.navigate('home')
                        })
                    : 
                        response.data.pass !== pass && console.log("Password is not correct !");
                        setMessage(`Incorrect Password ${response.data.fname} !`)
                })
                .catch(function (error) {
                    console.log("==> Error: ",error);
                    console.log("==> Incorect Email !");
                    setMessage("Incorrect Email or Password !")
                });
            
        } catch (e) {
            console.log("User info isn't stored");
        }
    }

    const [message, setMessage] = useState(null)

  return (

    <View style={styles.container}>
        <View style={{width: "100%", alignItems:"center", position: 'absolute', top: 40}}>
            <Image source={require("../../../assets/logoPng.png")} style={{width: 120, height: 120}} />
        </View>
        <View style={{paddingHorizontal: 20}}>
            <Text style={styles.welcome}> {languageObj?.login.title}  </Text>
            {message && 
                <View style={{marginBottom: 20}}>  
                    <Error text={message} /> 
                </View>
            }
            <View style={styles.info}>
                <Text style={styles.label}> {languageObj?.login.email} </Text>
                <TextInput 
                    email
                    autoComplete='email'
                    style={styles.textInput} 
                    placeholderTextColor='white'
                    onChangeText={e => setEmail(e)}
                />
            </View>
            <View style={styles.info}>
                <Text style={styles.label}> {languageObj?.login.password} </Text>
                <TextInput 
                    autoComplete='password'
                    secureTextEntry={true}
                    style={styles.textInput} 
                    placeholderTextColor='white'
                    textContentType='password'
                    onChangeText={e => setPass(e)}
                />
            </View>
            <View style={[styles.info]}>
                {NavigateBtn(languageObj?.login.login, fun, !condition)}
            </View>
            <View style={[styles.signPara, lang == "ar" && {justifyContent: "flex-end"}]}>
                <Text> {languageObj?.login.dontHave} </Text>
                <TouchableOpacity
                    style={styles.sign}
                    onPress={()=> navigation.navigate("signStack", {screen: 'start'})} 
                >
                    <Text style={styles.signText}> {languageObj?.login.createAccount} </Text>
                </TouchableOpacity>
            </View>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        position: 'relative',
    },
    welcome: {
        fontSize: 30,
        textAlign: 'center',
        marginBottom: 40,
    },
    info: {
        justifyContent: 'center',
        marginBottom: 20,
    },
    label: {
        marginBottom: 6,
        fontSize: 16,
    },
    textInput: {
        borderWidth: 1.6,  
        borderColor: '#3FC495',
        fontSize: 16,
        borderRadius: 16,
        padding: 10,
        paddingHorizontal: 20,
    },
    signText: {
        color: '#3FC495',
    },
    signPara: {
        flexDirection: 'row',
        textAlign: "right",
    },
})