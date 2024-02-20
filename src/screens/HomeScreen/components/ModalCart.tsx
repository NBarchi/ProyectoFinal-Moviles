import React from 'react'
import { Cart } from '../HomeScreen'
import { FlatList, Modal, Text, View } from 'react-native'

interface Props{
    carts: Cart[],
    isVisible: boolean
    changeVisible:()=>void
}

export const ModalCart = ({carts, isVisible, changeVisible}:Props) => {
  return (
    <Modal visible={isVisible} animationType='fade' transparent={false}>
        <View>
            <FlatList
            data={carts}
            keyExtractor={item=>item.id.toString()}
            renderItem={({item})=><Text onPress={changeVisible}>{item.name}</Text>}
            />
            
        </View>
    </Modal>    
  )
}
