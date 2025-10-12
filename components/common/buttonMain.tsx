import { COLORS } from "@/constants/colors";
import { Pressable, StyleSheet, Text } from "react-native";

interface ButtonProps {
    label: string,
    onPress: () => void,
    disabled?: boolean
}

export default function ButtonMain({ label, onPress, disabled = false }: ButtonProps) {
    return (
        <Pressable style={({ pressed }) => [
            { backgroundColor: pressed ? COLORS.accentPrimaryPressed : COLORS.accentPrimary },
            styles.button
        ]}
            onPress={onPress}
            disabled={disabled}
        >
            <Text style={styles.text}>{label}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        // backgroundColor: '#D27D2C',
        padding: 15,
        borderRadius: 30,
        width: 300,
        alignItems: 'center',
        marginTop: 30
    },
    text: {
        fontSize: 20
    }
})