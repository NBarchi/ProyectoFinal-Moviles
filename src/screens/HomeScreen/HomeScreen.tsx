import React, { useState } from 'react'
import { Dimensions, FlatList, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import { TitleComponent } from '../../components/TitleComponent'
import { CardProducts } from './components/CardProducts'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { ModalCart } from './components/ModalCart'


export interface Product{
  id: number,
  name: string,
  price: number,
  stock: number,
  pathImage: string
}

const products=[
  {id: 1, name:'PlayStation 5 Console',price: 499.99, stock: 10, pathImage: 'https://elbosque.com.ec/multijuegos/wp-content/uploads/sites/59/2021/07/FRONT-CONSOLE-PS5.jpg' },
  {id: 2, name:'SAMSUNG 32-inch FHD TV 720P (UN32M4500BFXZA)',price: 197.99, stock: 6, pathImage: 'https://i5.walmartimages.com/asr/a3cac2be-714d-48ef-b3b4-48eb3201d592.c40e9b2c10d66743e47367b2972cfa2b.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF' },
  {id: 3, name:'Xiaomi Redmi 12',price: 160.69, stock: 20, pathImage: 'https://mundotek.com.ec/wp-content/uploads/2023/07/Xiaomi-Redmi-12-1.jpg' },
  {id: 4, name:'$25 PlayStation Store Gift Card [Digital Code]',price: 25.00, stock: 20, pathImage: 'https://m.media-amazon.com/images/I/51hUzkHpoEL._SL1082_.jpg' },
  {id: 5, name:'Echo Dot (5th Gen, 2022 release)',price: 49.99, stock: 10, pathImage: 'https://m.media-amazon.com/images/I/71xoR4A6q-L._AC_SX679_.jpg' },
  {id: 6, name:'ASUS VivoBook 16 Laptop',price: 599.99, stock: 5, pathImage: 'https://www.bestcell.com.ec/imgadmin/storage/imagenes_articulos/1440/7127.jpg.webp' },
  {id: 7, name:'AMD Ryzen™ 9 7900X3D',price: 409.98, stock: 7, pathImage: 'https://m.media-amazon.com/images/I/51fRtv4UyBL.__AC_SY300_SX300_QL70_FMwebp_.jpg' },
  {id: 8, name:'Sony ZV-1F Vlog Camera',price: 498.00, stock: 3, pathImage: 'https://sony.scene7.com/is/image/sonyglobalsolutions/Primary_image-17?$S7Product$&fmt=png-alpha' },
  {id: 9, name:'Adidas Samba OG' ,price: 149.90, stock: 10, pathImage: 'https://assets.adidas.com/images/w_1880,f_auto,q_auto/3bbecbdf584e40398446a8bf0117cf62_9366/B75806_01_standard.jpg' },
  {id: 10, name:'Nike T-shirt Max90',price: 45.00, stock: 20, pathImage: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/a4a37a20-96c8-4390-a35f-1a0fb7765bbb/playera-max90-sportswear-fkMGdv.png' }
]

export interface Cart{
  id: number,
  name: string,
  price: number,
  total: number
}

export const HomeScreen = () => {

  const [productsState, setProductsState] = useState(products);

  const [carts, setCarts] = useState<Cart[]>([]);

  const [showModal, setShowModal] = useState(false)

  const handlerChangeStockProduct=(idProducto:number, quantity:number)=>{
    const updateStock=productsState.map(item=>item.id == idProducto
      ?{...item, 
        stock:item.stock-quantity}
        :item);
    setProductsState(updateStock)
  }

  const addProduct=(idProduct:number, quantity: number)=>{
    const product=productsState.find((item)=>item.id == idProduct)

    if(!product){
      return
    }

    const newCart:Cart={
      id:product.id,
      name:product.name,
      price: product.price,
      total: product.price*quantity
    }

    setCarts(prevCarts=>[...prevCarts, newCart])
    
  }

  const numColumns = 2;
  const screenWidth = Dimensions.get('window').width;
  const itemWidth = screenWidth / numColumns;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text  style={styles.title}>Shop</Text>
        <Icon name={'shopping-cart'} size={30} color={'black'} onPress={()=>setShowModal(!showModal)}/>           
      </View>
      <View style={{justifyContent:'center', alignItems: 'center'}}>
        <Image style={{height: 100, width: 100}} source={{uri:'https://i.pinimg.com/originals/ab/ca/4c/abca4c51c7e166b2980105b5e98b7ac2.jpg'}}/>
      </View>    
      <View style={{flex:1}}>
        <FlatList 
          data={productsState}
          numColumns={numColumns}
          keyExtractor={item=>item.id.toString()}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          renderItem={({item})=>(
            <View style={[styles.item, { width: itemWidth - 10 }]}>
            <CardProducts  product={item} handlerChangeStockProduct={handlerChangeStockProduct}/>
            </View>
            )}/>
      </View>
    <ModalCart carts={carts} isVisible={showModal} changeVisible={()=>setShowModal(!showModal)}/>
    </View>
  )
}

const styles=StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: 'white'
  },

  item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin:10,
    backgroundColor: 'white'
  },

  title:{
    fontSize: 30,
    fontWeight: 'bold',
    color: '#8A2BE2'
  },

  header:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10
  }
})
