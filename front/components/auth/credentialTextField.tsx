import { StyleSheet, TextInput, View, Text } from "react-native"
import TextField from "../common/textField"

interface CredentialTextFieldProps {
    value: string,
    onChangeText: (input: string) => void,
    placeholder: string,
    invalidCredentialMessage: string
}

export default function CredentialTextField({ value, onChangeText, placeholder, invalidCredentialMessage }: CredentialTextFieldProps) {
    return (
        <View style={styles.textFieldContainer}>
            <TextField placeholder={placeholder} value={value} onChangeText={onChangeText} />
            <Text style={styles.errorText}>{invalidCredentialMessage}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    textFieldContainer: {
        flexDirection: 'column',
        alignItems: 'flex-end'
    },
    input: {
        height: 50,
        margin: 12,
        // lineHeight:40,
        padding: 10,
        paddingHorizontal: 20,
        fontSize: 18,
        width: 250,
        backgroundColor: 'white',
        borderRadius: 30
    },
    errorText: {
        color: 'red'
    }
})