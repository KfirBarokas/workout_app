import ButtonMain from "@/components/common/buttonMain";
import PageTitle from "@/components/auth/pageTitle";
import TextField from "@/components/common/textField";
import { Link } from "expo-router";
import { useState } from "react";
import { Pressable, Text, View, StyleSheet, Switch, Modal, StatusBar } from "react-native";
import { router } from "expo-router";

import { COLORS } from "@/constants/colors";
import { CREDENTIAL_TYPES, INVALID_CREDENTIAL_MESSAGES } from "@/constants/auth"

import ServerHttpRequest from '../../services/axios_request.mjs'
import CredentialNotFoundModal from "@/components/auth/credentialNotFoundModal";
import CredentialTextField from "@/components/auth/credentialTextField";

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
    if (/^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g.test(credential)) {
        return CREDENTIAL_TYPES.PHONE_NUMBER;
    }

    return CREDENTIAL_TYPES.INVALID;
}


export default function Login() {
    const [loginCredential, setLoginCredential] = useState('');

    const [invalidCredentialModalVisible, setInvalidCredentialModalVisible] = useState(false);

    const [invalidCredentialMessage, setInvalidCredentialMessage] = useState(INVALID_CREDENTIAL_MESSAGES.noMessage)

    function UpdateInvalidCredentialMessage(credential: string, type: number) {
        if (!credential) {
            console.log('empty')
            setInvalidCredentialMessage(INVALID_CREDENTIAL_MESSAGES.empty)
        }

        else if (type === CREDENTIAL_TYPES.INVALID) {
            console.log('invalid')
            setInvalidCredentialMessage(INVALID_CREDENTIAL_MESSAGES.notPhoneOrEmail)
        }
    }

    function ShowInvalidCredentialModal() { setInvalidCredentialModalVisible(true); }

    async function LoginUser() {
        let credentialType = GetCredentialType(loginCredential);

        UpdateInvalidCredentialMessage(loginCredential, credentialType);

        if (credentialType == CREDENTIAL_TYPES.INVALID) { return; }

        let loginData = {
            email: loginCredential
        }
        let response = await ServerHttpRequest('get', '/login', loginData)

        if (response) {
            console.log(response.data);
            if (!response.data.exists) {
                ShowInvalidCredentialModal()
            }
        }
    }

    //TODO: Add missing show credential type
    return (
        <View style={[StyleSheet.absoluteFill, styles.mainContainer]}>
            <StatusBar hidden />

            <CredentialNotFoundModal isVisible={invalidCredentialModalVisible} setIsVisible={setInvalidCredentialModalVisible} />

            <PageTitle title="Login" />

            <CredentialTextField
                value={loginCredential}
                placeholder="Email/phone number"
                onChangeText={input => setLoginCredential(input)}
                invalidCredentialMessage={invalidCredentialMessage}
            />

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