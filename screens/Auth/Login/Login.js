import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Image} from 'react-native';
import { NavigateBtn } from '../../../Components/Buttons';
import { LangFun } from '../../../Components/Language';

export default function Login({route, navigation}) {
    const [language, setLanguage] = useState()

    useEffect(() => {
        async function getLang(){
            const value = await AsyncStorage.getItem('lang')
            const val = JSON.parse(value)
            if(value !== null) {
                console.log(value);
                setLanguage(val.lang)
            }else {
            }
        }
  
        getLang();
    }, [])


    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")

    const condition = email === "" || pass === ""

    const user = {
        email: email,
        pass: pass,
    }

    const fun = async () => {
        try {
            await AsyncStorage.setItem('user', JSON.stringify(user))
            console.log("User info stored");
            route.params.setLogged(true)
            navigation.navigate('home')
        } catch (e) {
            console.log("User info isn't stored");
        }
    }

    const langs = LangFun(language)
    
  return (

    <View style={styles.container}>
        <View style={{width: "100%", alignItems:"center", position: 'absolute', top: 40}}>
            <Image source={require("../../../assets/logoPng.png")} style={{width: 120, height: 120}} />
        </View>
        <View style={{paddingHorizontal: 20}}>
            <Text style={styles.welcome}> {langs?.login.title}  </Text>
            <View style={styles.info}>
                <Text style={styles.label}> Email Adress </Text>
                <TextInput 
                    email
                    autoComplete='email'
                    style={styles.textInput} 
                    placeholderTextColor='white'
                    onChangeText={e => setEmail(e)}
                />
            </View>
            <View style={styles.info}>
                <Text style={styles.label}> Password </Text>
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
                {NavigateBtn("Login", fun, !condition)}
            </View>
            <View style={styles.signPara}>
                <Text> Don't have an account? </Text>
                <TouchableOpacity
                    style={styles.sign}
                    onPress={()=> navigation.navigate('signStack')} 
                >
                    <Text style={styles.signText}> Create Account </Text>
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
    },
})