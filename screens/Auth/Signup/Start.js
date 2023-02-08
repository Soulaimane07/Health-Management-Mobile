import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

function Start({navigation}) {
  return (
    <View style={styles.container}>
        <Text style={styles.header}> Welcome! Let's customize HealthManager for your goals.</Text>
        <TouchableOpacity onPress={()=> navigation.navigate("signup")} style={styles.button}>
            <Text style={styles.buttonText}> Continue </Text>
        </TouchableOpacity>
        {/* <Text style={styles.alert}> We will never post anything without your permition. </Text> */}
    </View>
  )
}

export default Start

const styles = StyleSheet.create({
    container: {
        // backgroundColor: "white",
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        padding: 20,
    },
    header: {
        textAlign: 'center',
        fontSize: 24,
        marginBottom: 40,
        fontWeight: 'bold',
    },
    button: {
        borderRadius: 16,
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#3FC495",
        marginBottom: 30,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    alert: {
        color: "black",
    }
})