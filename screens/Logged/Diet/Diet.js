import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ImageBackground, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import MaterialIcons from "react-native-vector-icons/MaterialIcons"

export default function Diet({navigation}) {

    const meals = [
        {
            "image":require(`../../../assets/images/logged/meals/breakfast.webp`),
            "title": "breakfast",
            "text":"Recommended 830 - 1170Cal",
            "path":"breakfast"
        },
        {
            "image":require(`../../../assets/images/logged/meals/lunch.webp`),
            "title": "lunch",
            "text":"Recommended 255 - 370Cal",
            "path":"lunch"
        },
        {
            "image":require(`../../../assets/images/logged/meals/snacks.jpg`),
            "title": "snacks",
            "text":"Recommended 830 - 1170Cal",
            "path":"snack"
        },
        {
            "image":require(`../../../assets/images/logged/meals/dinner.jpg`),
            "title": "dinner",
            "text":"Recommended 255 - 370Cal",
            "path":"dinner"
        },
    ]

    const diets = [
        {
            "image": require(`../../../assets/images/logged/meals/snacks.jpg`),
            "title": "Vegan Diet",
            "duration": "15 Days Plan",
        },
        {
            "image": require(`../../../assets/images/logged/meals/dinner.jpg`),
            "title": "Keto Diet",
            "duration": "10 Days Plan",
        },
        {
            "image":require(`../../../assets/images/logged/meals/breakfast.webp`),
            "title": "Egg Diet",
            "duration":"10 Days Plan",
        },
        {
            "image":require(`../../../assets/images/logged/meals/lunch.webp`),
            "title": "Fruit Diet",
            "duration":"15 Days Plan",
        },
    ]

    const [test, setTest] = useState(false)
    useEffect(()=> {
        setTest(false)
        setTimeout(() => {
            setTest(true)
        }, 1500);
    }, [])

  return (
    <View style={{flex: 1}}>
        <ScrollView style={{paddingTop: 20, backgroundColor: "white"}}>
            <View style={styles.box}>
                <View style={styles.head}>
                    <Text style={{fontSize: 18, fontWeight: 'bold'}}> Today's Diet Plan </Text>
                </View>
                <View>
                    <ScrollView horizontal={true} style={styles.body}>
                        {meals.map((item,key)=>(
                            <View key={key} style={[styles.boxx, key+1 === meals.length && {marginRight: 50}]}>
                                <ImageBackground source={item.image} resizeMode="cover" style={{borderRadius: 8, justifyContent: "flex-end", overflow: 'hidden', width: 300, height: 160}}>
                                    <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 20, paddingVertical: 10, backgroundColor: "#B2B2B2", color: "white", borderBottomLeftRadius: 16, borderBottomRightRadius: 16}}> {item.title} </Text>
                                </ImageBackground>
                            </View>
                        ))}
                    </ScrollView>
                </View>
            </View>

            <View style={[styles.box, {marginTop: 20}]}>
                <View style={styles.head}>
                    <Text style={{fontSize: 18, fontWeight: 'bold'}}> BALANCED </Text>
                </View>
                <View style={{height: 300}}>
                    <ScrollView horizontal={true} style={styles.body}>
                        {diets.map((item,key)=>(
                            <TouchableOpacity 
                                style={[styles.boxx1, key+1 === meals.length && {marginRight: 50}]} 
                                onPress={() => {
                                    navigation.navigate('dietStack', {
                                        screen: "categorie",
                                        params: {
                                            data: diets[key]
                                        },
                                    });
                                }}
                            >
                                <ImageBackground key={key} source={item.image} resizeMode="cover" style={[{justifyContent: "flex-end", height: 270}]}>
                                    <View style={{width: "100%", padding: 20}}>
                                        <Text style={{color: "white", fontSize: 20, fontWeight: 'bold' }}> {item.title} </Text>
                                        <Text style={{color: "white", fontSize: 16}}> {item.duration} </Text>
                                    </View>
                                </ImageBackground>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
            </View>
            
            <View style={[styles.box, {marginTop: 20}]}>
                <View style={styles.head}>
                    <Text style={{fontSize: 18, fontWeight: 'bold'}}> FASTING </Text>
                </View>
                <View style={{height: 300}}>
                    <ScrollView horizontal={true} style={styles.body}>
                        {diets.map((item,key)=>(
                            <TouchableOpacity 
                                style={[styles.boxx1, key+1 === meals.length && {marginRight: 50}]} 
                                onPress={() => {
                                    navigation.navigate('dietStack', {
                                        screen: "categorie",
                                        params: {
                                            data: diets[key]
                                        },
                                    });
                                }}
                            >
                                <ImageBackground key={key} source={item.image} resizeMode="cover" style={[{justifyContent: "flex-end", height: 270}]}>
                                    <View style={{width: "100%", padding: 20}}>
                                        <Text style={{color: "white", fontSize: 20, fontWeight: 'bold' }}> {item.title} </Text>
                                        <Text style={{color: "white", fontSize: 16}}> {item.duration} </Text>
                                    </View>
                                </ImageBackground>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
            </View>
            
            <View style={[styles.box, {marginTop: 20}]}>
                <View style={styles.head}>
                    <Text style={{fontSize: 18, fontWeight: 'bold'}}> KETO / LOW CARB </Text>
                </View>
                <View style={{height: 300}}>
                    <ScrollView horizontal={true} style={styles.body}>
                        {diets.map((item,key)=>(
                            <TouchableOpacity 
                                style={[styles.boxx1, key+1 === meals.length && {marginRight: 50}]} 
                                onPress={() => {
                                    navigation.navigate('dietStack', {
                                        screen: "categorie",
                                        params: {
                                            data: diets[key]
                                        },
                                    });
                                }}
                            >
                                <ImageBackground key={key} source={item.image} resizeMode="cover" style={[{justifyContent: "flex-end", height: 270}]}>
                                    <View style={{width: "100%", padding: 20}}>
                                        <Text style={{color: "white", fontSize: 20, fontWeight: 'bold' }}> {item.title} </Text>
                                        <Text style={{color: "white", fontSize: 16}}> {item.duration} </Text>
                                    </View>
                                </ImageBackground>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
            </View>
            
            <View style={[styles.box, {marginTop: 20, marginBottom: 120}]}>
                <View style={styles.head}>
                    <Text style={{fontSize: 18, fontWeight: 'bold'}}> HIGH PROTEIN </Text>
                </View>
                <View style={{height: 300}}>
                    <ScrollView horizontal={true} style={styles.body}>
                        {diets.map((item,key)=>(
                            <TouchableOpacity 
                                style={[styles.boxx1, key+1 === meals.length && {marginRight: 50}]} 
                                onPress={() => {
                                    navigation.navigate('dietStack', {
                                        screen: "categorie",
                                        params: {
                                            data: diets[key]
                                        },
                                    });
                                }}
                            >
                                <ImageBackground key={key} source={item.image} resizeMode="cover" style={[{justifyContent: "flex-end", height: 270}]}>
                                    <View style={{width: "100%", padding: 20}}>
                                        <Text style={{color: "white", fontSize: 20, fontWeight: 'bold' }}> {item.title} </Text>
                                        <Text style={{color: "white", fontSize: 16}}> {item.duration} </Text>
                                    </View>
                                </ImageBackground>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
            </View>
        </ScrollView>

        {test &&
            <View style={{position: 'absolute', left: 0, right: 0, bottom: 0, marginHorizontal: 20, marginVertical: 10,}}>
                <TouchableOpacity onPress={()=> navigation.navigate("dietStack", {screen: "dietTest"})} style={{backgroundColor: "#3FC495", width: "100%", flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 14, borderRadius: 16}}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Image source={require("../../../assets/logo.jpg")} style={{width: 50, height: 50, marginRight: 10, borderRadius: 8}} />
                        <View>
                            <Text style={{fontSize: 20, color: "white"}}> Take the test </Text>
                            <Text style={{color: "white"}}> To get help choosing a plan </Text>
                        </View>
                    </View>
                    <MaterialIcons name="arrow-forward-ios" color={"white"} size={20} />
                </TouchableOpacity>
            </View>
        }
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
        marginLeft: 30
    },
    body: {
        marginTop: 20,
        paddingLeft: 30,
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