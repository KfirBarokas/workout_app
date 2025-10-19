import { useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { COLORS } from "@/constants/colors";
import { PROFILE_TYPES } from "@/constants/registration";

interface ProfileTypeSelectorProps {
    value: PROFILE_TYPES,
    onChange: (value: PROFILE_TYPES) => void
}

const PROFILE_TYPE_OPTIONS: PROFILE_TYPES[] = ["regular", "coach"];

export default function ProfileTypeSelector({ value, onChange }: ProfileTypeSelectorProps) {
    return (
        <View style={styles.container}>
            {PROFILE_TYPE_OPTIONS.map((type) => (
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
        direction: "rtl",
        gap: 10,
        marginVertical: 10,
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
