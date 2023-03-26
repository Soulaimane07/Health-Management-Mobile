import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, ImageBackground } from 'react-native'
import React from 'react'

export default function Diet() {

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
            "image":require(`../../../assets/images/logged/meals/snacks.jpg`),
            "title": "Vegan Diet",
            "duration":"15 Days Plan",
        },
        {
            "image":require(`../../../assets/images/logged/meals/dinner.jpg`),
            "title": "Keto Diet",
            "duration":"10 Days Plan",
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

  return (
    <View style={{paddingTop: 20, height: 1000, backgroundColor: "white"}}>
      <View style={styles.box}>
        <View style={styles.head}>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}> Today's Diet Plan </Text>
            <TouchableOpacity> 
                <Text style={{fontSize: 14, color: "#3FC495", fontWeight: 'bold'}}> See All </Text> 
            </TouchableOpacity>
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
            <Text style={{fontSize: 18, fontWeight: 'bold'}}> Diet Categoties </Text>
            <TouchableOpacity> 
                <Text style={{fontSize: 14, color: "#3FC495", fontWeight: 'bold'}}> See All </Text> 
            </TouchableOpacity>
        </View>
        <View style={{height: 360}}>
            <ScrollView horizontal={true} style={styles.body}>
                {diets.map((item,key)=>(
                    <ImageBackground key={key} source={item.image} resizeMode="cover" style={[styles.boxx1, key+1 === meals.length && {marginRight: 50}]}>
                        <View style={{width: "100%", padding: 20}}>
                            <Text style={{color: "white", fontSize: 20, fontWeight: 'bold' }}> {item.title} </Text>
                            <Text style={{color: "white", fontSize: 16}}> {item.duration} </Text>
                        </View>
                    </ImageBackground>
                ))}
            </ScrollView>
        </View>
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
        width: 280,
        overflow: 'hidden',
        justifyContent: "flex-end",
        marginBottom: 10
    }
})