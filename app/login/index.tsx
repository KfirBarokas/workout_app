import { View, StyleSheet, StatusBar, Button, Pressable, Text } from "react-native";
import { Link } from "expo-router";
import { useLogin } from "./useLogin";

import PageTitle from "@/components/auth/loginRegister/pageTitle";
import CredentialTextField from "@/components/auth/loginRegister/credentialTextField";
import ButtonMain from "@/components/common/buttonMain";
import CredentialNotFoundModal from "@/components/auth/credentialNotFoundModal";

export default function Login() {
    const {
        loginCredential,
        setLoginCredential,
        invalidCredentialModalVisible,
        setInvalidCredentialModalVisible,
        invalidCredentialMessage,
        credentialNotFoundType,
        enteredCredential,
        LoginUser,
        signInWithGoogle,
    } = useLogin();

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

            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Button title="Sign in with Google" onPress={signInWithGoogle} />
            </View>

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
