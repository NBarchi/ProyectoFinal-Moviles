import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from '../screens/LoginScreen';
import { RegisterScreen } from '../screens/RegisterScreen';
import { HomeScreen } from '../screens/HomeScreen/HomeScreen';
import { useState } from 'react';

export interface User{
    id: number,
    nombre: string,
    apellidos: string,
    email: string,
    password: string
  }
  
  const users:User[]=[
    {id:1, nombre:'Nicholas', apellidos:'Barrera Guerra', email:'nicobarrera.g10@gmail.com', password:'123456'},
  ]

const Stack = createStackNavigator();

export const StackNavigator=()=>{

    const [usersLogin, setUsersLogin]=useState(users);

    const handlerAddUser=(user:User)=>{
        setUsersLogin([...usersLogin, user])
    }

  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" options={{headerShown:false}} children={()=><LoginScreen users={usersLogin}/>} />
      <Stack.Screen name="Register" options={{headerShown:false}} children={()=><RegisterScreen usersLogin={usersLogin} setUsersLogin={handlerAddUser}/>} />
      <Stack.Screen name="Home" options={{headerShown:false}} component={HomeScreen} />
    </Stack.Navigator>
  );
}