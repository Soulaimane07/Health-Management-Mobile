import {StatusBar } from 'react-native'

export default function Statusbar(props) {
  return (
    <StatusBar
        barStyle={props.style}
        backgroundColor={props.color}
    />
  )
}