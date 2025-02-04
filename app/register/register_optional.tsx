import PageTitle from "@/components/loginRegister/pageTitle";
import TextField from "@/components/loginRegister/textField";

import DropDownPicker from 'react-native-dropdown-picker';
import * as ImagePicker from 'expo-image-picker';

import { COLORS } from "@/constants/colors";
import { COUNTRIES } from "@/constants/countries";
import React, { useState } from "react";

import { View, Text, StyleSheet, Button, Image, Alert } from "react-native";

export default function RegisterOptional() {
    const [openCountryPicker, setOpenCountryPicker] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState(null);

    const objectList = Object.entries(COUNTRIES).map(([key, name]) => ({
        label: name,
        value: key
    }));

    const [countries, setCountries] = useState(objectList);

    const [image, setImage] = useState<string | null>(null);
    // const [status, requestPermission] = ImagePicker.useCameraPermissions();

    async function requestPermission() {
        // NOT WORKING! !!!!
        console.log("Requesting permission")
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
            Alert.alert("Permission Denied", "We need camera roll permissions to continue!");
            return false;
        }
        return true;
    };

    async function pickImage() {
        const hasPermission = await requestPermission();
        if (!hasPermission) return;

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images', 'videos'],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    return (
        <View style={styles.mainContainer}>
            <PageTitle title='Register' />

            <View style={styles.pickerContainer}>
                <DropDownPicker
                    placeholder="Choose country"
                    open={openCountryPicker}
                    value={selectedCountry}
                    items={countries}
                    setOpen={setOpenCountryPicker}
                    setValue={setSelectedCountry}
                    setItems={setCountries}
                    theme="LIGHT"
                />
            </View>

            <View>
                <Button title="Pick an image from camera roll" onPress={pickImage} />
                {image && <Image source={{ uri: image }} style={styles.image} />}
            </View>


        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: COLORS.background,
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    pickerContainer: {
        width: '50%',
    },
    image: {
        width: 200,
        height: 200
    }
})