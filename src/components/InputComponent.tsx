import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/MaterialIcons'

interface InputProps{
    placeholder: string,
    name: string,
    OnChangeText:(name: string, value: string)=> void,
    isPassword?: boolean,
    hasIcon?: boolean,  
    actionIcon?: ()=>void,
    hasError: boolean

}

export const InputComponent = ({placeholder, name, OnChangeText, isPassword=false, hasIcon=false, actionIcon=()=>{}, hasError}: InputProps) => {
  return (
    <View>
        <TextInput
            placeholder={placeholder}
            keyboardType='default'  
            style={(hasError)
                    ?{...styles.input, ...styles.error}
                    :{...styles.input}}
            onChangeText={(value: string)=> OnChangeText(name,value)}
            secureTextEntry={isPassword}
    />
    {
        (hasIcon)
        ?<Icon style={styles.icon} name='visibility' size={20} onPress={actionIcon}/>
        :null
    }

    {
        (hasError)
        ?<Text style={styles.errorTxt}><Icon name='error' size={15} color={'#a93131'}/> Campo obligatorio</Text>
        :null
    }
    </View>
  )
}



const styles=StyleSheet.create({
    input:{
        borderBottomWidth: 1,
      },

    icon:{
        position:'absolute',
        right:20,
        marginTop:20
    },

    error:{
        borderBottomColor: '#a93131',
        borderStyle: 'solid',
        borderBottomWidth: 2,
    },
    errorTxt:{
        fontSize:15,
        color: '#a93131',
        fontWeight: 'bold'
    }
})