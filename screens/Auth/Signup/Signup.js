import AsyncStorage from '@react-native-async-storage/async-storage';
import { useContext, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Image, ScrollView} from 'react-native';
import axios from 'axios';
import { NavigateBtn } from '../../../Components/Buttons';
import { PracticeContext } from '../../../Components/Context';
import Error from '../../../Components/Error';

export default function Signup({navigation}) {
    const {languageObj} = useContext(PracticeContext)
    
    const [email, setEmail] = useState(null)
    const [fname, setFname] = useState(null)
    const [lname, setLname] = useState(null)
    const [pass, setPass] = useState(null)

    const user = {
        email: email,
        fname: fname,
        lname: lname,
        pass: pass,
    }
    
    const condittion = email !== null && fname !== null && lname !== null && pass !== null && pass.length > 4
    const [loading, setLoading] = useState(false)

    const Submit = async () => {
        try {
            setMessage(null)
            setLoading(true)

            let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
            reg.test(email) === true 
            ?
                axios.post('https://health-manager.onrender.com/users/', user)
                .then(function (response) {
                    console.log("==> User Created: ", response.data.user);
                    
                    AsyncStorage.setItem('user', JSON.stringify(response.data.user))
                    console.log("User info is Stored");
                    setLoading(false)
                    navigation.navigate('goal')
                })
                .catch(function (error) {
                    console.log("==> Error: ",error);
                    setLoading(false)
                    setMessage("Email is already taken !")
                })
            :   (
                setLoading(false),
                setMessage("Email is not valid !")
            )
        } catch (e) {
            console.log("User info isn't stored: ", e);
        }
    }

    const [message, setMessage] = useState(null)

  return (
    <ScrollView vertical={true} style={styles.container}>
        <View style={{alignItems:"center"}}>
            <Image source={require("../../../assets/logoPng.png")} style={{marginBottom: 30, width: 120, height: 120}} />
        </View>
        <Text style={styles.welcome}> {languageObj?.signup.title} </Text>
        {message && 
            <Error text={message} />
        }
        <View style={styles.info}>
            <Text style={styles.label}> {languageObj?.login.email} </Text>
            <TextInput 
                autoComplete='email'
                style={styles.textInput} 
                placeholderTextColor='white'
                onChangeText={e => setEmail(e)}
            />
        </View>
        <View style={styles.info}>
            <Text style={styles.label}> {languageObj?.signup.fname} </Text>
            <TextInput 
                autoComplete="name-given"
                style={styles.textInput} 
                placeholderTextColor='white'
                onChangeText={e => setFname(e)}
            />
        </View>
        <View style={styles.info}>
            <Text style={styles.label}> {languageObj?.signup.lname} </Text>
            <TextInput 
                autoComplete='name-family'
                style={styles.textInput} 
                placeholderTextColor='white'
                onChangeText={e => setLname(e)}
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
        <View style={[styles.info, {marginBottom: 160}]}>
            {NavigateBtn(languageObj?.signup.create, Submit, condittion, null, loading)}
        </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        padding: 20,
        paddingVertical: 40,
        paddingBottom: 100,
    },
    welcome: {
        fontSize: 30,
        textAlign: 'center',
        marginBottom: 10,
    },
    info: {
        justifyContent: 'center',
        marginTop: 20,
    },
    label: {
        marginBottom: 6,
        fontSize: 16,
    },
    textInput: {
        borderWidth: 1,  
        borderColor: '#3FC495',
        fontSize: 16,
        borderRadius: 16,
        padding: 10,
        paddingHorizontal: 20,
    },
})