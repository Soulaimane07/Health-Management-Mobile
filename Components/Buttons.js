import { StyleSheet, Text, TouchableOpacity } from "react-native"

export const NavigateBtn = (text, submit, condittion, color) => {
    return (
        <TouchableOpacity
            style={[!condittion ? styles.disabledBtn : color ? {backgroundColor: color} : {backgroundColor: "#3FC495"}  , styles.button]} 
            onPress={()=> submit()}
            disabled={!condittion ? true : false}
        >
            <Text style={!condittion ? styles.disabledBtnText : styles.buttonText}> {text} </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
      borderRadius: 16,
      padding: 15,
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: "bold",
    },
    disabledBtn: {
        borderRadius: 16,
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "white",
    },
    disabledBtnText: {
        color: '#adb5bd',
        fontSize: 16,
        fontWeight: "bold",
    },
})

export const MyButton = ({navigation}, text, link) => {
    return (
        <TouchableOpacity onPress={()=> navigation.navigate(link)} style={ButtonStyle.button}>
            <Text style={ButtonStyle.buttonText}> {text} </Text>
        </TouchableOpacity>
    )
}

const ButtonStyle = StyleSheet.create({
    button: {
        borderRadius: 16,
        padding: 15,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#3FC495",
        marginBottom: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: "bold",
    },
})