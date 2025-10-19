import { StyleProp, StyleSheet, TextInput, ViewStyle } from "react-native"

interface TextFieldProps {
    label?: string;
    placeholder: string;
    value: string;
    onChangeText: (text: string) => void;
    // style?: StyleProp<ViewStyle>;
    keyboardType?: "default" | "numeric" | "email-address" | "phone-pad"
}

export default function TextField({ value, onChangeText, placeholder, keyboardType }: TextFieldProps) {
    return (
        <TextInput style={styles.input} placeholder={placeholder} value={value} keyboardType={keyboardType} onChangeText={onChangeText} />
    )
}

const styles = StyleSheet.create({
    input: {
        height: 50,
        marginVertical: 10,
        // lineHeight: 40,
        padding: 10,
        paddingHorizontal: 20,
        fontSize: 18,
        width: 250,
        backgroundColor: 'white',
        borderRadius: 10
    },
})