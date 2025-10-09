import { StyleSheet, TextInput, View, Text } from "react-native"
import TextField from "../../common/textField"

interface PhoneNumberTextFieldProps {
    value: string,
    onChangeText: (input: string) => void,
    placeholder: string,
    invalidPhoneNumberMessage: string
}

export default function PhoneNumberTextField({ value, onChangeText, placeholder, invalidPhoneNumberMessage }: PhoneNumberTextFieldProps) {
    return (
        <View style={styles.textFieldContainer}>
            <TextField placeholder={placeholder} value={value} onChangeText={onChangeText} keyboardType="phone-pad" />
            <Text style={styles.errorText}>{invalidPhoneNumberMessage}</Text>
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