import React, { useContext } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { MyButton } from '../../../Components/Buttons'
import { PracticeContext } from '../../../Components/Context'

function Start({navigation}) {
  const {languageObj} = useContext(PracticeContext)

  return (
    <View style={styles.container}>
        <Text style={styles.header}> {languageObj?.signup.welcome} </Text>
        {MyButton(navigation, languageObj?.signup.continue, "signup")}
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