import { View, Modal, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { Video } from 'expo-av';

export default function VerrifiedModal(props) {

    useEffect(()=> {
        setTimeout(() => {
            props.setVisible(false)
        }, 1600);
    }, [props.visible])

    const video = React.useRef(null);

  return (
    <Modal animationType='fade' visible={props.visible} transparent={true}>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: "rgba(0, 0, 0, 0.636)"}}>
            <Video
                ref={video}
                style={styles.video}
                source={require('../assets/finish/verification.mp4')}
                resizeMode="contain"
                shouldPlay={true}
                isMuted
            />
        </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
    video: {
        width: 200,
        height: 200,
        borderRadius: 16,
        overflow: 'hidden',
    }
})