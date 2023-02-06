import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import IconFo from 'react-native-vector-icons/FontAwesome';
import IconEn from 'react-native-vector-icons/Entypo';

export const Progress = ({navigation}, p) => {

    const prog = [
        {
            'title': 'Goal',
            'text':"Let's get to know you better!",
            'header':"What goal do you have in mind?"
        },
        {
            'title': 'Sex',
            'text': "Great, let's continue.",
            'header': "What sex should we use to calculate your recommendations?",
        },
        {
            'title': 'Birth',
            'text':'Got it',
            'header':"What's your date of birth?",
        },
        {
            'title': 'height',
            'text': "Thanks, you're doing great!",
            'header':"What's your height?",
        },
        {
            'title': 'weight',
            'text':"Ok, let's continue.",
            'header':"What's your current weight?",
        },
    ]

    return (
        <View>
            <View style={styles.header}>
                <View style={styles.prog}>
                    {prog.map((item,key)=>(
                        <IconEn key={key} name="minus" color={key === p ? "#3FC495" : "white"} size={34} />
                    ))}
                </View>
                <TouchableOpacity
                    style={styles.button} 
                    onPress={() => navigation.goBack()}
                >
                    <IconFo name="angle-left" size={30} />
                </TouchableOpacity>
            </View>
            <View style={styles.text}>
                <Image 
                    style={styles.logo}
                    source={require('../assets/logo.jpg')}
                />
                <Text style={styles.text1}> {prog[p]?.text} </Text>
            </View>
            <Text style={styles.text2}> {prog[p]?.header} </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        alignItems: "center",
        padding: 20,
        paddingTop: 40,
        position: 'relative',
    },
    button: {
        position: "absolute",
        top: 20,
        bottom: 0,
        left: 10,
        paddingLeft: 16,
        paddingRight: 16,
        alignItems: "center",
        flexDirection: "row"
    },
    prog: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },

    text: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    logo: {
        width: 30,
        height: 30,
        marginRight: 8,
    },
    text1: {
        fontWeight: "bold",
    },
    text2: {
        textAlign: 'center',
        fontSize: 24,
        paddingLeft: 40,
        paddingRight: 40,
        marginTop: 20,
    },
})