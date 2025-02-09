import ButtonMain from "@/components/common/buttonMain";
import PageTitle from "@/components/auth/pageTitle";
import TextField from "@/components/common/textField";
import { Link } from "expo-router";
import { useState } from "react";
import { Pressable, Text, View, StyleSheet, Switch, Modal, StatusBar } from "react-native";

import { router } from "expo-router";
import { COLORS } from "@/constants/colors";
import { CREDENTIAL_TYPES } from "@/constants/auth"

import ServerHttpRequest from '../../services/axios_request.mjs'
import InvalidCredentialModal from "@/components/auth/invalidCredentialModal";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

function isValidEmail(input: string) {
    return String(input)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
}

function GetCredentialType(credential: string) {
    if (isValidEmail(credential)) {
        return CREDENTIAL_TYPES.EMAIL;
    }
    if (isNaN(parseInt(credential))) {
        return CREDENTIAL_TYPES.PHONE_NUMBER;
    }

    return CREDENTIAL_TYPES.INVALID;
}



export default function Login() {
    const [loginCredential, setLoginCredential] = useState('');

    const [invalidCredentialModalVisible, setInvalidCredentialModalVisible] = useState(false);

    function ValidateLoginCredential(credential: string) {
        let credentialType = GetCredentialType(loginCredential);
        if (credentialType === CREDENTIAL_TYPES.INVALID) {

        }
    }

    function ShowInvalidCredentialModal() { setInvalidCredentialModalVisible(true); }

    async function LoginUser() {
        setInvalidCredentialModalVisible(true)

        if (!loginCredential) { return; }

        console.log("Requesting")

        // Is phone number or email

        let loginData = {
            email: loginCredential
        }
        let response = await ServerHttpRequest('get', '/login', loginData)

        if (response) {
            console.log(response.data);
        }
    }

    //TODO: Add missing credential type
    return (
        <View style={[StyleSheet.absoluteFill, styles.mainContainer]}>
            <StatusBar hidden />
            {/* <View > */}

            <InvalidCredentialModal isVisible={invalidCredentialModalVisible} setIsVisible={setInvalidCredentialModalVisible} />

            <PageTitle title="Login" />

            <TextField value={loginCredential} placeholder="Email/phone number" onChangeText={input => setLoginCredential(input)} />


            <Link href="/(tabs)" asChild>
                <Pressable style={styles.pressableTextContainer}>
                    <Text style={styles.pressableText}>Forgot password? click here</Text>
                </Pressable>
            </Link>

            <ButtonMain label='Login' onPress={LoginUser} />

        </View>
    )
}


const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: COLORS.background,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    googleLoginButton: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 30,
        width: 250,
        alignItems: 'center',
        marginTop: 30
    },
    pressableTextContainer: {
        marginTop: 20
    },
    pressableText: {
        fontSize: 15,
        fontFamily: 'underline',
        color: 'white'
    }
});