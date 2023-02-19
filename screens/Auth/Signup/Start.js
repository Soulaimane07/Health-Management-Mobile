import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { MyButton } from '../../../Components/Buttons'

function Start({navigation}) {
  return (
    <View style={styles.container}>
        <Text style={styles.header}> Welcome! Let's customize HealthManager for your goals.</Text>
        {MyButton({navigation}, "Continue", "signup")}
    </View>
  )
}

export default Start

const styles = StyleSheet.create({
    container: {
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
})