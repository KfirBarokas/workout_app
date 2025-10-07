import ButtonMain from "@/components/common/buttonMain";
import PageTitle from "@/components/auth/pageTitle";
import { Link, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, Text, View, StyleSheet, StatusBar, Button } from "react-native";

import { COLORS } from "@/constants/colors";
import { CREDENTIAL_TYPES, INVALID_CREDENTIAL_MESSAGES } from "@/constants/auth";

import ServerHttpRequest from "../../services/axios_request.mjs";
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
    const router = useRouter();

    const [loginCredential, setLoginCredential] = useState("");
    const [invalidCredentialModalVisible, setInvalidCredentialModalVisible] =
        useState(false);
    const [invalidCredentialMessage, setInvalidCredentialMessage] = useState(
        INVALID_CREDENTIAL_MESSAGES.noMessage
    );
    const [credentialNotFoundType, setCredentialNotFoundType] = useState(
        CREDENTIAL_TYPES.NONE
    );
    const [enteredCredential, setEnteredCredential] = useState("");

    function ShowInvalidCredentialModal() {
        setInvalidCredentialModalVisible(true);
    }

    function UpdateInvalidCredentialMessage(credential: string) {
        if (!credential) {
            setInvalidCredentialMessage(INVALID_CREDENTIAL_MESSAGES.empty);
        } else {
            setInvalidCredentialMessage(INVALID_CREDENTIAL_MESSAGES.notPhoneOrEmail);
        }
    }

    async function LoginUser() {
        const credentialType = GetCredentialType(loginCredential);

        if (credentialType === CREDENTIAL_TYPES.INVALID) {
            UpdateInvalidCredentialMessage(loginCredential);
            return;
        }

        setEnteredCredential(loginCredential);
        setCredentialNotFoundType(credentialType);

        const credentialData = {
            credential: loginCredential,
            credentialType: credentialType,
        };

        try {
            // 🔹 Example usage of helper
            if (credentialType === CREDENTIAL_TYPES.EMAIL) {
                // try login with Firebase (password could be collected separately)
                // const user = await login(loginCredential, "123456");
                // console.log("Firebase login success:", user.uid);
            }

            // 🔹 Keep your backend request logic
            const response = await ServerHttpRequest("post", "/login", credentialData);

            if (response) {
                if (response.data.exists) {
                    await ServerHttpRequest("post", "/sendOTP", credentialData);
                    router.navigate({ pathname: `/otp` });
                } else {
                    ShowInvalidCredentialModal();
                }
            }
        } catch (err: any) {
            console.error("Login error:", err.message);
            ShowInvalidCredentialModal();
        }
    }

    return (
        <View style={[StyleSheet.absoluteFill, styles.mainContainer]}>
            <StatusBar hidden />

            <CredentialNotFoundModal
                isVisible={invalidCredentialModalVisible}
                setIsVisible={setInvalidCredentialModalVisible}
                credentialType={credentialNotFoundType}
                enteredCredential={enteredCredential}
            />

            <PageTitle title="Login" />

            <CredentialTextField
                value={loginCredential}
                placeholder="Email/phone number"
                onChangeText={(input) => setLoginCredential(input)}
                invalidCredentialMessage={invalidCredentialMessage}
            />



            <Link href="/(tabs)" asChild>
                <Pressable style={styles.pressableTextContainer}>
                    <Text style={styles.pressableText}>
                        Forgot password? click here
                    </Text>
                </Pressable>
            </Link>

            <ButtonMain label="Login" onPress={LoginUser} />
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    pressableTextContainer: {
        marginTop: 20,
    },
    pressableText: {
        fontSize: 15,
        fontFamily: "underline",
        color: "white",
    },
});
