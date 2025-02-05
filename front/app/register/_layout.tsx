import { Stack } from "expo-router";
import { View } from "react-native";


export default function RegisterLayout() {
    return (
        <Stack >
            <Stack.Screen name='index' options={{ headerShown: false }} />
            <Stack.Screen name='register_optional' options={{ title: '' }} />
        </Stack>
    )
}