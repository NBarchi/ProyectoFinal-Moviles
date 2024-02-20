import React from 'react'
import { StyleSheet, Text } from 'react-native'

interface TilteProps{
    title: string;
}

export const TitleComponent = ({title}:TilteProps) => {
  return (
    <Text style={styles.title}>{title}</Text>
  )
}

const styles=StyleSheet.create({
    title:{
        fontSize:20,
        color: 'black',
        fontWeight: 'bold'
    },
})
