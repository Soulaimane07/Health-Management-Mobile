import { ActivityIndicator, StyleSheet, Text, TouchableOpacity } from "react-native"
import AntDesign from "react-native-vector-icons/AntDesign"

export const NavigateBtn = (text, submit, condittion, color, loading) => {
    return (
        <TouchableOpacity
            style={[
                styles.button, 
                !condittion ? styles.disabledBtn : color ? {backgroundColor: color} : {backgroundColor: "#3FC495"},
                loading && {padding: 8}
            ]} 
            onPress={()=> submit()}
            disabled={!condittion ? true : false}
        >
            {loading 
                ?   <ActivityIndicator style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }} size="large" color="white" /> 
                :   <Text style={!condittion ? styles.disabledBtnText : styles.buttonText}> {text} </Text>
            }
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

export const MyButton = (navigation, text, link, icon) => {
    return (
        <TouchableOpacity onPress={()=> navigation.navigate(link)} style={ButtonStyle.button}>
            <Text style={ButtonStyle.buttonText}> {icon && icon} {text} </Text>
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

export const GoBack = (navigation, color, size) => {
    return(
        <TouchableOpacity onPress={()=> navigation.goBack()}>
            <AntDesign name='arrowleft' size={size ? size : 26} color={color} />
        </TouchableOpacity>
    )
}