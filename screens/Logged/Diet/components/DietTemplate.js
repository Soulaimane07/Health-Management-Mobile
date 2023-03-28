import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native'

export default function DietTemplate(props) {
  return (
    <View style={styles.box}>
        <View style={styles.head}>
            <Text style={{fontSize: 18, fontWeight: 'bold', color:"#434242"}}> {props.title} </Text>
        </View>
        <View style={{height: 300}}>
            <ScrollView horizontal={true} style={styles.body}>
                {props.data.map((item,key)=>(
                    <TouchableOpacity
                        style={[styles.boxx1, {backgroundColor: props.color}, key+1 === props.data.length && {marginRight: 50}]} 
                        onPress={() => {
                            props.navigation.navigate('dietStack', {
                                screen: "categorie",
                                params: {
                                    data: props.Diets[key]
                                },
                            });
                        }}
                    >
                        <Image source={item.image} style={{alignSelf: 'center', width: "70%", height: "60%", borderRadius: 100}} />
                        <View style={{marginHorizontal: 20, marginTop: 20}}>
                            <Text style={{color: "white", fontSize: 12, marginBottom: 6}}>{item.text} </Text>
                            <Text style={{color: "white", fontSize: 22}}>{item.title} </Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    box: {
        marginBottom: 20,
    },
    head: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-between',
        marginRight: 30,
        marginLeft: 20
    },
    body: {
        marginTop: 20,
        paddingLeft: 20,
    },
    boxx1: {
        marginRight: 10,
        paddingVertical: 20,
        borderRadius: 16,
        width: 200,
        height: 270,
        marginBottom: 10,
    }
})