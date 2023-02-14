import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Image} from 'react-native';
import { NavigateBtn } from '../../../Components/Buttons';
import Height from '../Signup/Height';

export default function Login({route, navigation}) {
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

    console.log(route.params.logged);

  return (

    <View style={styles.container}>
        <View style={{alignItems:"center"}}>
            <Image source={require("../../../assets/logoPng.png")} style={{marginTop: 40,marginBottom: 50 ,width:150, height:150}} />
        </View>
        <Text style={styles.welcome}> Log in your Account </Text>
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
        <View style={styles.info}>
            {NavigateBtn({navigation}, "Login", fun, !condition)}
        </View>
        <View style={styles.signPara}>
            <Text> Don't have an account? </Text>
            <TouchableOpacity
                style={styles.sign}
                onPress={()=> navigation.navigate('start')} 
            >
                <Text style={styles.signText}> Create Account </Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
        width: "100%",
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
    button: {
        borderRadius: 16,
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#3FC495",
        marginBottom: 10,
        width: "100%"
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    signText: {
        color: '#3FC495',
    },
    signPara: {
        flexDirection: 'row',
    },

    disabledBtn: {
        borderRadius: 16,
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    disabledBtnText: {
        color: '#adb5bd',
        fontSize: 16,
    },
})