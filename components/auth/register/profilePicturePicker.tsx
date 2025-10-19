import React, { useState } from "react";
import { View, Image, TouchableOpacity, Text, StyleSheet, Alert } from "react-native";
import { launchImageLibrary } from "react-native-image-picker";

interface ProfilePicturePickerProps {
    imageUri: string | null;
    setImageUri: (uri: string | null) => void;
}

export default function ProfilePicturePicker({ imageUri, setImageUri }: ProfilePicturePickerProps) {
    const handleSelectImage = () => {
        launchImageLibrary(
            {
                mediaType: "photo",
                maxWidth: 400,
                maxHeight: 400,
                quality: 0.8,
            },
            (response) => {
                if (response.didCancel) return;
                if (response.errorCode) {
                    Alert.alert("Error", response.errorMessage || "Could not select image.");
                    return;
                }

                const uri = response.assets && response.assets[0].uri;
                if (uri) setImageUri(uri);
            }
        );
    };

    const handleRemoveImage = () => {
        setImageUri(null);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={handleSelectImage} style={styles.imageWrapper}>
                {imageUri ? (
                    <Image source={{ uri: imageUri }} style={styles.image} />
                ) : (
                    <Text style={styles.placeholder}>Add Photo</Text>
                )}
            </TouchableOpacity>

            {imageUri && (
                <TouchableOpacity onPress={handleRemoveImage}>
                    <Text style={styles.remove}>Remove</Text>
                </TouchableOpacity>
            )}
        </View>
    );
}

const IMAGE_SIZE = 100;

const styles = StyleSheet.create({
    container: { alignItems: "center", marginVertical: 16 },
    imageWrapper: {
        width: IMAGE_SIZE,
        height: IMAGE_SIZE,
        borderRadius: IMAGE_SIZE / 2,
        borderWidth: 2,
        borderColor: "#ccc",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        backgroundColor: "#f0f0f0",
    },
    image: { width: IMAGE_SIZE, height: IMAGE_SIZE, borderRadius: IMAGE_SIZE / 2 },
    placeholder: { color: "#666", textAlign: "center" },
    remove: { marginTop: 8, color: "#d9534f" },
});
