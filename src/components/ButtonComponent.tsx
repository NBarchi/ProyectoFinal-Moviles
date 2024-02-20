import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'

interface BtnProps{
    title: string
    onPress: ()=>void
}

export const ButtonComponent = ({title, onPress}:BtnProps) => {
  return (
    <TouchableOpacity style={styles.btn} onPress={onPress}>
        <Text style={styles.textBtn}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles=StyleSheet.create({
    btn:{
        height: 40,
        borderWidth: 1,
        alignItems: 'center',
        padding:10,
        marginTop: 30,
        backgroundColor: '#8A2BE2',
        borderColor: '#8A2BE2',
        borderRadius: 10
      },

    textBtn:{
        color:'white',
        fontWeight: 'bold'
    }
})
