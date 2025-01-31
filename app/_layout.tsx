import { Slot } from 'expo-router';
import { Stack } from 'expo-router/stack';

export default function Layout() {
  return <Slot/>;
}

// (
//   <Stack screenOptions={{
//       headerShown:false,
//       contentStyle:{
//         backgroundColor:'#FF0000'
//       }
//     }} >
//     {/* <Stack.Screen name="login" /> */}
//     {/* <Stack.Screen name="(tabs)"/> */}
//   </Stack>