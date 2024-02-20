import React, { useState } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Product } from '../HomeScreen';
import { stylesGlobal } from '../../../theme/appTheme';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { ModalProduct } from './ModalProduct';
import { panHandlerName } from 'react-native-gesture-handler/lib/typescript/handlers/PanGestureHandler';

interface Props{
    product: Product,
    handlerChangeStockProduct:(idProducto:number, quantity:number)=>void
}


export const CardProducts = ({product, handlerChangeStockProduct}: Props) => {

    const [showModal, setShowmodal] = useState(false)

  return (
    <View>
        <TouchableOpacity onPress={()=>setShowmodal(!showModal)}>
            <View style={styles.root}>
                <View>
                    <Image style={styles.image}
                        source={{
                        uri: product.pathImage
                    }}/>          
                    <Text style={styles.title}>{product.name}</Text>
                    <View style={styles.box}>
                        <Text style={styles.price}>${product.price}</Text>
                        <Icon name={'add-shopping-cart'} size={30} color={'#8A2BE2'}/>
                    </View>
                </View>
             </View>
        </TouchableOpacity>
        <ModalProduct product={product} isVisible={showModal} changeVisible={()=>setShowmodal(!showModal)} handlerChangeStockProduct={handlerChangeStockProduct}/>
    </View>
  )
}


const styles=StyleSheet.create({
    root:{
        flexDirection: 'row',
        padding: 10,
        backgroundColor: 'white'
    },

    title:{
        fontSize: 15,
        color: 'black'
    },

    price:{
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black'
    },

    image:{
        height: 150,
        width: 150   
    },

    box:{
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})