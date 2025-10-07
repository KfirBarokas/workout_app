import { StyleSheet, TextInput } from "react-native"

interface TextFieldProps {
    value: string,
    onChangeText: (input: string) => void,
    placeholder: string,
}

export default function TextField({ value, onChangeText, placeholder }: TextFieldProps) {
    return (
        <TextInput style={styles.input} placeholder={placeholder} value={value} onChangeText={onChangeText} />
    )
}

const styles = StyleSheet.create({
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
})