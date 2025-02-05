import { Pressable, StyleSheet, Text } from "react-native";

interface ButtonProps {
    label: string,
    onPress: () => void
}

export default function ButtonMain({ label, onPress }: ButtonProps) {
    return (
        <Pressable style={styles.button} onPress={onPress}>
            <Text style={styles.text}>{label}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'cyan',
        padding: 15,
        borderRadius: 30,
        width: 130,
        alignItems: 'center',
        marginTop: 30
    },
    text: {
        fontSize: 20
    }
})