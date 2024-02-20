import Snackbar from "react-native-snackbar";
import { User } from '../navigators/StackNavigator';
import { LoginForm } from "../screens/LoginScreen";
import { Text } from 'react-native';
import { RegisterForm } from "../screens/RegisterScreen";

export const hasErrorFormLogin=(form:LoginForm)=>{
    return form.email == '' || form.password == '' 
}

export const hasErrorFormRegister=(form:RegisterForm)=>{
    return form.nombre == '' || form.apellidos == '' || form.email == '' || form.password == ''
}

export const verifyExistUser=(users:User[], form:LoginForm)=>{
    return users.filter(user=>user.email == form.email)[0]; 
}

export const showSnackBar=(message: string, background:string)=>{
    Snackbar.show({
        text:message,
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor:background,
        textColor: 'white'
    })
}


export const getNewIdUser=(users: User[])=>{
    const getIdUser=users.map(user=>user.id);   
    return Math.max(...getIdUser)+1;
}
