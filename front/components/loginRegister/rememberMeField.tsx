import { useState } from "react";
import { Switch, View, Text, StyleSheet } from "react-native";
import { isEnabled } from "react-native/Libraries/Performance/Systrace";

interface RememberMeSwitchProps {
    isEnabled: boolean,
    toggleSwitch: () => void
}

export default function RememberMeField({ isEnabled, toggleSwitch }: RememberMeSwitchProps) {

    return (
        <View style={styles.container}>
            <Switch
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
            />
            <Text style={styles.text}>Remember me</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row-reverse',
        alignItems: 'center'
    },
    text: {
        color: 'white'
    }
})