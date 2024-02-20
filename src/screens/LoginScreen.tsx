import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { InputComponent } from '../components/InputComponent'
import { StackScreenProps } from '@react-navigation/stack';
import { TitleComponent } from '../components/TitleComponent';
import { ButtonComponent } from '../components/ButtonComponent';
import { NativeGesture } from 'react-native-gesture-handler/lib/typescript/handlers/gestures/nativeGesture';
import { stylesGlobal } from '../theme/appTheme';
import { HeaderComponent } from '../components/HeaderComponent';
import { User } from '../navigators/StackNavigator';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { hasErrorFormLogin, showSnackBar, verifyExistUser } from '../commons/authValidation';

export interface LoginForm{
  email: string,
  password: string,
  hasError: boolean
}

//interface Props extends StackScreenProps<any, any>{};
interface LoginProps{
    users: User[]
}

export const LoginScreen = ({users}:LoginProps) => {

    const navigation=useNavigation();

  const [form, setForm] = useState<LoginForm>({
    email: '',
    password: '',
    hasError: false 
  })

  const [hiddenPassword, setHiddenPassword] = useState(true)

  const handlerTextChange=(name: string, value: string)=>{
    setForm(prevState => ({
      ...prevState,
      [name]:value
    }))
  }

  const handlerSendInfo=()=>{

    if(hasErrorFormLogin(form)){
        setForm(prevState=>({
            ...prevState,
            hasError:true
        }))
        return;
    }

    setForm(prevState=>({
        ...prevState,
        hasError:false
    }))

    const existUser=verifyExistUser(users,form)
        if(!existUser || existUser.password != form.password){
            showSnackBar('Usuario o contraseña incorrecta!', '#a93131');
            return;
        }
    console.log(form);

    navigation.dispatch(CommonActions.navigate({name:'Home'}))
    
  }

  

  return (
    <View style={stylesGlobal.containerAccount}>
        <View>
            <HeaderComponent/>
        </View>
      <View style={stylesGlobal.boxAccount}>
        <TitleComponent title='ACCEDE A TU CUENTA'/>
        <InputComponent placeholder='EMAIL' OnChangeText={handlerTextChange} name='email' hasError={form.hasError}/>
        <InputComponent placeholder='CONTRASEÑA' OnChangeText={handlerTextChange} name='password' isPassword={hiddenPassword}
            hasIcon={true} actionIcon={()=>setHiddenPassword(!hiddenPassword)} hasError={form.hasError}/>
        <ButtonComponent title='INICIAR SESIÓN'onPress={handlerSendInfo}/>
      </View>
      <View style={{alignItems:'center'}}>
        <TouchableOpacity onPress={()=>navigation.dispatch(CommonActions.navigate({name:'Register'}))}>
            <Text style={{fontSize: 15, color:'black'}}>No tienes una cuenta? Regístrate</Text>
        </TouchableOpacity>
      </View>
    </View>  
    )
} 

const styles=StyleSheet.create({
    
})