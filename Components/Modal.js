import { View, Modal, Text, TouchableOpacity } from 'react-native'
import React from 'react'

export default function ModalC(props) {
  return (
    <Modal 
    // style={styles.modal}
    // transparent={true}
    animationType="slide"
    visible={props.ShowModal}
    >
        <TouchableOpacity onPress={()=> props.setShowmodal(false)}>
            <Text> close </Text>
            <Text> {props.ModalVal} </Text>
        </TouchableOpacity>
    </Modal>
  )
}