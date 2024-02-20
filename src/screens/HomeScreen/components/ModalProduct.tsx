import React, { useState } from 'react'
import { Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Product } from '../HomeScreen';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { panHandlerName } from 'react-native-gesture-handler/lib/typescript/handlers/PanGestureHandler';

interface Props{
    product: Product,
    isVisible: boolean,
    changeVisible:()=>void
    handlerChangeStockProduct:(idProducto:number, quantity:number)=>void
}

export const ModalProduct = ({product, isVisible, changeVisible, handlerChangeStockProduct}:Props) => {

    const [quantity, setQuantity] = useState(1)

    const handlerChangeQuantity=(value:number)=>{
        setQuantity(quantity+value)
    }

    const handlerAddProduct=()=>{
        handlerChangeStockProduct(product.id, quantity);

        setQuantity(1)
                
        changeVisible()
    }

  return (
    <Modal visible={isVisible} animationType='slide' transparent={true}>
        <View style={styles.content}>
            <View style={styles.box}>
                <View style={styles.headerModal}> 
                    <Icon name={'arrow-back'} size={30} color={'black'} onPress={changeVisible}/>
                </View>
                <View style={{gap: 20, padding: 20}}>
                    <Text style={styles.title}>{product.name}</Text>
                    <View style={styles.image}>
                        <Image source={{
                            uri: product.pathImage
                            }}
                            style={{height: 400, width: 400,}}/>
                    </View>
                    {
                        (product.stock == 0)
                        ?<Text style={styles.txtStock}>Producto Agotado!</Text>
                        :
                        <View>
                            <View style={styles.footer}>
                                <Text style={{fontSize:20, fontWeight: 'bold', color: 'black'}}>${product.price}</Text>
                                <View style={styles.containerQuantity}>
                                <TouchableOpacity style={styles.btnQuantity} onPress={()=>handlerChangeQuantity(-1)}
                                    disabled={quantity == 1}>
                                    <Text style={styles.txtQuantityBtn}>-</Text>
                                </TouchableOpacity>
                                <Text style={styles.txtQuantity}>{quantity}</Text>
                                <TouchableOpacity style={styles.btnQuantity} onPress={()=>handlerChangeQuantity(+1)}
                                    disabled={quantity == product.stock}>
                                <Text style={styles.txtQuantityBtn}>+</Text>
                                </TouchableOpacity>
                                </View>
                            </View>
                            <View style={{alignItems:'center'}}>
                                <Text style={styles.txtQuantity}>Total: ${(product.price*quantity).toFixed(2)}</Text>
                            </View>
                            <TouchableOpacity style={styles.buttonCart} onPress={handlerAddProduct}>
                                <Text style={styles.txtCart}>Add To Cart</Text>
                            </TouchableOpacity>
                        </View>
                    }
                    
                </View>
            </View>
            
        </View>
    </Modal>
  )
}

const styles=StyleSheet.create({
    content:{
        flex:1,
        borderRadius:10,
        backgroundColor:'white'
    },

    headerModal:{
        borderBottomColor:'#ccc',
        borderBottomWidth: 1,
        borderStyle: 'solid',
        padding: 5

    },

    box:{
        gap: 20,
    },

    image:{
        alignItems:'center',
        justifyContent:'center'
    },

    title:{
        fontSize:20,
        fontWeight: 'bold',
        color: 'black',
    },

    footer:{
        flexDirection:'row', 
        borderTopColor: '#ccc', 
        justifyContent: 'space-between',
        borderTopWidth:1, 
        borderStyle: 'solid', 
        paddingTop: 10 
    },

    containerQuantity:{
        flexDirection:'row', 
        justifyContent:'center', 
        alignItems: 'center', 
        right: 20, 
        gap: 10
    },

    btnQuantity:{
        height:40,
        width: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#8A2BE2',
        borderRadius: 10
    },

    txtQuantityBtn:{
        fontSize: 15,
        fontWeight: 'bold',
        color: 'white'
    },

    txtQuantity:{
        fontSize:17,
        color:'#000'
    },

    buttonCart:{
        height: 40,
        borderWidth: 1,
        alignItems: 'center',
        padding:10,
        marginTop: 30,
        backgroundColor: '#8A2BE2',
        borderColor: '#8A2BE2',
        borderRadius: 10
    },

    txtCart:{
        color:'white',
        fontWeight: 'bold'
    },

    txtStock:{
        fontSize: 20,
        fontWeight: 'bold',
        color: '#a93131'
    }

})
