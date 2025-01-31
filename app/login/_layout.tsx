import { Slot, Stack } from 'expo-router';
import { StatusBar } from 'react-native';

export default function LoginLayout() {
  return (
  <Stack screenOptions={{
    headerShown:false,
    contentStyle:{
        // backgroundColor:'red'
        backgroundColor:'black'
    },
  }}>

    <Stack.Screen name='index'/>
    {/* <Stack.Screen name='register' options={{headerShown:false}}/> */}
  <StatusBar hidden/>
  </Stack>)
}