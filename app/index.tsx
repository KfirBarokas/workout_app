import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { Redirect } from "expo-router";
import { useEffect } from "react";
import { View } from "react-native";

export default function Index() {

    useEffect(() => {
        console.log("hi")
        GoogleSignin.configure({
            webClientId: '766634426305-gdh4u518okpthasg3keukh55jbp5fq28.apps.googleusercontent.com',
        });
    }, [])

    return <Redirect href="/login" />
};