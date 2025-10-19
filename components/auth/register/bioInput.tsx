import React, { useState } from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";

const MAX_LENGTH = 200;

// Allow printable Unicode characters (letters, punctuation, emojis, etc.)
const SAFE_INPUT_REGEX = /^[\p{L}\p{N}\p{P}\p{S}\p{Zs}\n\r]*$/u;

interface BioInputProps {
    bio: string;
    setBio: (bio: string) => void;
    error: string;
}

export default function BioInput({ bio, setBio, error }: BioInputProps) {
    // const handleChange = (text: string) => {
    //     // Block control or invalid characters, allow emojis and normal symbols
    //     if (!SAFE_INPUT_REGEX.test(text)) {
    //         setError("Some characters are not supported.");
    //         return;
    //     }

    //     setBio(text);
    // };

    return (
        <View style={styles.container}>
            <TextInput
                style={[styles.input, error && styles.inputError]}
                value={bio}
                onChangeText={(text) => setBio(text)}
                placeholder="Tell us a bit about yourself 😊"
                multiline
                maxLength={MAX_LENGTH}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { marginVertical: 10 },
    label: { fontSize: 16, color: "black", marginBottom: 6 },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 10,
        height: 100,
        width: 230,
        flexWrap: "wrap",
        textAlignVertical: "top",
        fontSize: 14,
        color: "black",
        backgroundColor: "white",
    },
    inputError: { borderColor: "#d9534f" },
    footer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 4,
    },
    counter: { fontSize: 12, color: "#666" },
    counterLimit: { color: "#d9534f" },
    error: { fontSize: 12, color: "#d9534f" },
});
