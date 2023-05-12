import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native'
import Statusbar from '../../../Components/Statusbar'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { ServerLink } from '../../../Components/API'
import {Dimensions} from 'react-native';

export default function Diet({navigation}) {
    const [diets, setDiets] = useState([])
    
    useEffect(() => {
        axios.get(`${ServerLink}/diets`)
            .then(res => {
                console.log(res.data);
                setDiets(res.data)
            })
    }, [])

    const windowWidth = Dimensions.get('window').width;

  return (
    <View style={{flex: 1}}>
        <Statusbar color="#3FC495" style="light" />
        <ScrollView 
            style={{paddingTop: 20, backgroundColor: "white"}}
        >
            <View style={{flexDirection: 'row', alignItems: 'center', marginHorizontal: 20, marginBottom: 20, borderBottomColor: "#F9F5EB", borderBottomWidth: 1}}>
                <Image source={require("../../../assets/logo.jpg")} style={{width: 40, height: 40, marginBottom: 10}} />
                <Text style={{fontWeight: 'bold', fontSize: 12, marginLeft: 6, marginBottom: 10, color: "#B2B2B2"}}> Curated by Health Manager's nutrition experts </Text>
            </View>

            <ScrollView contentContainerStyle={{minHeight: 400, flexDirection:'row', justifyContent: "space-evenly", flexWrap:'wrap', alignItems: 'flex-start'}}>
                <TouchableOpacity
                        style={[{backgroundColor: "#B2B2B2", borderRadius: 8, width: (windowWidth/2)-10, paddingVertical: 40, marginBottom: 10}]} 
                        onPress={() => {
                            navigation.navigate('dietStack', {screen: "fastingStack", params: {color: "red"}});
                        }}
                    >
                        <Image source={require('../../../assets/images/logged/diets/fasting1.jpg')} style={{alignSelf: 'center', width: windowWidth/3, height: 130, borderRadius: 200}} />
                        <View style={{marginTop: 20}}>
                            <Text style={{color: "white", textAlign: "center", fontSize: 22}}> Fasting </Text>
                        </View>
                </TouchableOpacity>
                {diets.map((item,key)=>(
                    <TouchableOpacity
                        key={key}
                        style={[{backgroundColor: "#B2B2B2", borderRadius: 8, width: (windowWidth/2)-10, paddingVertical: 40, marginBottom: 10}]} 
                        onPress={() => {
                            navigation.navigate('dietStack', {screen: "categorie", params: {data: item}});
                        }}
                    >
                        <Image source={{uri: `${ServerLink}/${item.image}`}} style={{alignSelf: 'center', width: windowWidth/3, height: 130, borderRadius: 200}} />
                        <View style={{marginTop: 20}}>
                            <Text style={{color: "white", textAlign: "center", fontSize: 22}}>{item.title} </Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            <View style={{marginTop: 50}}></View>
        </ScrollView>
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
    boxx: {
        marginRight: 10,
        borderRadius: 16,
        width: 300,
        overflow: 'hidden',
        marginBottom: 10
    },
    boxx1: {
        marginRight: 10,
        borderRadius: 16,
        width: 220,
        overflow: 'hidden',
        height: 270,
        marginBottom: 10,
    }
})