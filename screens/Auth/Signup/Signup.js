import { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput} from 'react-native';

export default function Signup({navigation}) {
    const [email, setEmail] = useState("null")
    const [fname, setFname] = useState("null")
    const [lname, setLname] = useState("null")
    const [pass, setPass] = useState("null")

    const user = {
        email: email,
        fname: fname,
        lname: lname,
        pass: pass,
    }

  return (
    <View style={styles.container}>
        <Text style={styles.welcome}> Create your Account </Text>
        <View style={styles.info}>
            <Text style={styles.label}> Email Adress </Text>
            <TextInput 
                style={styles.textInput} 
                placeholderTextColor='white'
                onChangeText={e => setEmail(e)}
            />
        </View>
        <View style={styles.info}>
            <Text style={styles.label}> First Name </Text>
            <TextInput 
                style={styles.textInput} 
                placeholderTextColor='white'
                onChangeText={e => setFname(e)}
            />
        </View>
        <View style={styles.info}>
            <Text style={styles.label}> Last Name </Text>
            <TextInput 
                style={styles.textInput} 
                placeholderTextColor='white'
                onChangeText={e => setLname(e)}
            />
        </View>
        <View style={styles.info}>
            <Text style={styles.label}> Password </Text>
            <TextInput 
                secureTextEntry={true}
                style={styles.textInput} 
                placeholderTextColor='white'
                textContentType='password'
                onChangeText={e => setPass(e)}
            />
        </View>
        <View style={styles.info}>
            <TouchableOpacity 
                style={styles.button} 
                onPress={()=> navigation.navigate('goal')}>
                <Text style={styles.buttonText}> Create </Text>
            </TouchableOpacity>
        </View>
        {/* <Text> {email} {fname} {lname} {pass} </Text> */}
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
        justifyContent: 'center',
        width: "100%",
        backgroundColor: "white",
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
        borderWidth: 1,  
        borderColor: '#3FC495',
        fontSize: 16,
        borderRadius: 16,
        padding: 10,
    },
    button: {
        borderRadius: 16,
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#3FC495",
        marginBottom: 10,
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

})