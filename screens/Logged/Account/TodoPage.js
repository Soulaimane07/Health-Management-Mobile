import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Modal, TextInput, Button } from 'react-native'
import React, { useState } from 'react'
import Statusbar from '../../../Components/Statusbar'
import { Agenda } from 'react-native-calendars';
import Aicon from "react-native-vector-icons/AntDesign"
import DatePicker from 'react-native-date-picker'

export default function TodoPage() {
    const month = (new Date().getMonth()+1) < 10 ? `0${new Date().getMonth()+1}` : new Date().getMonth()+1
    const day = `${new Date().getFullYear()}-${month}-${new Date().getDate()}`
    const [selectedD, setSelectedD] = useState()
    const [selectedM, setSelectedM] = useState()
    const [modalVisible, setModalVisible] = useState(false)
    
    const [items, setItems] = useState({
        '2023-02-22': [{title:"Title", body: 'item 22 - any js object'}],
        '2023-02-23': [{title:"Title", body: 'item 23 - any js object'}],
        '2023-02-25': [{title:"Title", body: 'item 25 - any js object'}, {title:"Title", body: 'any js object'}],
        '2023-02-26': [{title:"Title", body: 'item 26 - any js object'}, {title:"Title", body: 'any js object'}],
        '2023-02-27': [{title:"Title", body: 'item 27 - any js object'}, {title:"Title", body: 'any js object'}],
        '2023-02-28': [{title:"Title", body: 'item 28 - any js object'}, {title:"Title", body: 'any js object'}],
        '2023-03-01': [{title:"Title", body: 'item 29 - any js object'}, {title:"Title", body: 'any js object'}],
        '2023-03-02': [{title:"Title", body: 'item 30 - any js object'}, {title:"Title", body: 'any js object'}],
        '2023-03-03': [{title:"Title", body: 'item 31 - any js object'}, {title:"Title", body: 'any js object'}],
    })

    const renderItem = (item) => {
        return (
            <TouchableOpacity style={{backgroundColor: "white", minHeight: 80, marginTop: 17, marginRight: 10, borderRadius: 10, padding: 10}}>
                <Text> {item.title} </Text>
                <Text> {item.body} </Text>
            </TouchableOpacity>
        )
    }

    const [categorie, setCategorie] = useState(null)
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)
    const categories = [
        {
            "title":"Breakfast",
        },
        {
            "title":"Lunch",
        },
        {
            "title":"Snack",
        },
        {
            "title":"Dinner",
        },
        {
            "title":"Workout",
        },
        {
            "title":"Challenge"
        }
    ]

  return (
    <View style={{flex: 1}}>
        <Statusbar color={modalVisible == true ? "white" : "#3FC495"} style="light" /> 
        <Agenda
            items={items}
            renderItem={renderItem}
            onDayPress={day => {
                console.log(`day pressed ${JSON.stringify(day)}`);
            }}
            onDayChange={day => {
                console.log('day changed');
            }}
            firstDay={1}
            pastScrollRange={1}
            futureScrollRange={12}
            hideExtraDays={true}
            hideKnob={false}
            showClosingKnob={true}
            markedDates={{
                '2023-02-25': {marked: true}
            }}
            disabledByDefault={true}
            onRefresh={() => console.log('refreshing...')}
            refreshing={false}
            refreshControl={null}
            theme={{
                dotColor: '#3FC495',
                selectedDayBackgroundColor: '#3FC495',
                agendaDayTextColor: '#3FC495',
                agendaDayNumColor: 'gray',
                agendaTodayColor: '#3FC495',
            }}
            style={{}}
        />
        
        <View style={{marginHorizontal: 20, paddingBottom: 10,}}>
            <TouchableOpacity onPress={()=> setModalVisible(true)} style={ButtonStyle.button}>
                <Text style={ButtonStyle.buttonText}> Create Task </Text>
            </TouchableOpacity>
        </View>

        <Modal onRequestClose={() => setModalVisible(false)} visible={modalVisible} animationType={"slide"}>
            <View style={styles.modal}>
                <View style={{marginHorizontal: 20}}>
                    <TouchableOpacity onPress={()=> setModalVisible(false)} style={{backgroundColor: '#3FC495', padding: 10, borderRadius: 10, position: 'absolute', top: 0, left: 0}}>
                        <Aicon name='left' size={20} color={"white"} />
                    </TouchableOpacity>
                    <Text style={styles.h1}> Create New Task </Text>
                </View>
                
                <View style={{flex: 1, marginTop: 50, marginVertical: 30}}>
                    <View style={{marginHorizontal: 20, marginBottom: 14}}>
                        <Text style={{marginBottom: 10, fontSize: 18}}> Task Name </Text>
                        <TextInput 
                            placeholder='Title of the Task...'
                            style={styles.textInput}
                        />
                    </View>
                    
                    <View style={{marginTop: 14, marginBottom: 4}}>
                        <Text style={{marginHorizontal: 20, fontSize: 18}}> Category </Text>
                        <ScrollView style={{paddingVertical: 10, padding: 20}} horizontal>
                            {categories.map((item,key)=>(
                                <TouchableOpacity onPress={()=> setCategorie(key)} key={key} style={[key === categorie ? {backgroundColor:"#3FC495"} : {backgroundColor:"#EEEEEE"} , {paddingHorizontal: 20, paddingVertical: 10, marginRight: 10, borderRadius: 10}]}>
                                    <Text style={[key === categorie ? {color:"white"} : {color: "black"}]}> {item.title} </Text>
                                </TouchableOpacity>
                            ))}    
                        </ScrollView>
                    </View>
                    
                    <View style={{marginHorizontal: 20, marginVertical: 14}}>
                        <Text style={{marginBottom: 10, fontSize: 18}}> Date </Text>
                        <TextInput 
                            style={styles.textInput}
                            value={`${new Date().getDate()}-${new Date().getMonth()+1}-${new Date().getFullYear()}`}
                        />
                    </View>

                    <View style={{marginHorizontal: 20, marginVertical: 14}}>
                        <Text style={{marginBottom: 10, fontSize: 18}}> Description </Text>
                        <TextInput 
                            placeholder='Description of the Task...'
                            style={[styles.textInput]}
                            multiline
                            numberOfLines={4}
                        />
                    </View>
                </View>

                <View style={{backgroundColor: 'white', paddingHorizontal: 20, paddingBottom: 20}}>
                    <TouchableOpacity onPress={()=> setModalVisible(false)} style={ButtonStyle.button}>
                        <Text style={ButtonStyle.buttonText}> Save </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
   </View>
  )
}

const styles = StyleSheet.create({
    modal: {
        position: 'relative',
        justifyContent: 'space-between',
        flex: 1,
        marginTop: 30,
    },
    h1: {
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold',
    },
    textInput: {
        borderWidth: 1.6,  
        borderColor: '#3FC495',
        fontSize: 16,
        borderRadius: 16,
        padding: 10,
        paddingHorizontal: 20,
    },
})

const ButtonStyle = StyleSheet.create({
    button: {
        borderRadius: 16,
        padding: 15,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#3FC495",
        marginVertical: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: "bold",
    },
})