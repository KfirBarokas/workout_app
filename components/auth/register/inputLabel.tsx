import { StyleSheet, Text } from "react-native";

interface InputLabelProps {
    text: string
}

export default function InputLabel({ text }: InputLabelProps) {
    return (
        <Text style={styles.text}>{text}</Text>
    )
}

const styles = StyleSheet.create({
    text: {
        color: 'black',
        fontSize: 15
    },
})