import { useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { COLORS } from "@/constants/colors";

export default function ProfileTypeSelector({ value, onChange }: { value: string, onChange: (val: string) => void }) {
    return (
        <View style={styles.container}>
            {["regular", "coach"].map((type) => (
                <Pressable
                    key={type}
                    style={[
                        styles.option,
                        value === type && { backgroundColor: COLORS.accentPrimary },
                    ]}
                    onPress={() => onChange(type)}
                >
                    <Text style={[
                        styles.label,
                        value === type && { color: "white" }
                    ]}>
                        {type === "regular" ? "Regular User" : "Coach"}
                    </Text>
                </Pressable>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        gap: 10,
        marginVertical: 20,
    },
    option: {
        flex: 1,
        borderRadius: 10,
        paddingVertical: 12,
        alignItems: "center",
        borderWidth: 1,
        borderColor: COLORS.textPrimary,
    },
    label: {
        fontSize: 16,
    },
});
