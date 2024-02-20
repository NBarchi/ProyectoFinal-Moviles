import React, { useState } from 'react'
import { View } from 'react-native'
import { TitleComponent } from '../components/TitleComponent'
import { stylesGlobal } from '../theme/appTheme';
import { HeaderComponent } from '../components/HeaderComponent';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { InputComponent } from '../components/InputComponent';
import { ButtonComponent } from '../components/ButtonComponent';
import { User } from '../navigators/StackNavigator';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { getNewIdUser, hasErrorFormRegister, showSnackBar, verifyExistUser } from '../commons/authValidation';

export interface RegisterForm{
    nombre: string,
    apellidos: string,
    email: string,
    password: string,
    hasError: boolean
}

interface RegisterProps{
    usersLogin: User[],
    setUsersLogin: (user:User)=>void
}
  

export const RegisterScreen = ({usersLogin, setUsersLogin}:RegisterProps) => {

    const navigation=useNavigation();

    const [form, setForm] = useState<RegisterForm>({
        nombre: '',
        apellidos: '',
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

    const handlerSaveUser=()=>{
        if(hasErrorFormRegister(form)){
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

        const existUsers=verifyExistUser(usersLogin, form)
        if(existUsers){
            showSnackBar('El usuario ya se encuentra registrado!', '#a93131')
            return
        }

        const newUser:User={
            id: getNewIdUser(usersLogin),
            ...form
        }

        setUsersLogin(newUser),
        showSnackBar('Usuario registrado con éxito!', '#32CD32')

        console.log(form);
        
        
        navigation.goBack();
    }

  return (
    <View style={stylesGlobal.containerAccount}>
        <Icon name='arrow-back-ios' size={30} style={{position: 'absolute', marginHorizontal: 10}} onPress={()=>navigation.goBack()}/>
        <View>
            <HeaderComponent/>
        </View>
        <View style={stylesGlobal.boxAccount}>
            <TitleComponent title='DATOS PERSONALES'/>
            <InputComponent placeholder='NOMBRE' OnChangeText={handlerTextChange} name='nombre' hasError={form.hasError}/>
            <InputComponent placeholder='APELLIDOS' OnChangeText={handlerTextChange} name='apellidos' hasError={form.hasError}/>
            <InputComponent placeholder='EMAIL' OnChangeText={handlerTextChange} name='email' hasError={form.hasError}/>
            <InputComponent placeholder='CONTRASEÑA' OnChangeText={handlerTextChange} name='password' isPassword={hiddenPassword}
            hasIcon={true} actionIcon={()=>setHiddenPassword(!hiddenPassword)} hasError={form.hasError}/>
        </View>
        <ButtonComponent title='CREAR CUENTA' onPress={handlerSaveUser}/>
    </View>
  )
}

