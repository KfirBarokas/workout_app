import { View, StyleSheet, StatusBar, Button, Pressable, Text } from "react-native";
import { Link } from "expo-router";
import { useLogin } from "./useLogin";
import PageTitle from "@/components/auth/loginRegister/pageTitle";
import PhoneNumberTextField from "@/components/auth/loginRegister/phoneNumberTextField";
import ButtonMain from "@/components/common/buttonMain";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { auth } from "@/services/firebase/auth";

export default function Login() {
    const {
        phoneNumberField,
        handlePhoneInput,
        loginUser,
        signInWithGoogle,
        recaptchaVerifierRef,
    } = useLogin();

    return (
        <View style={[StyleSheet.absoluteFill, styles.mainContainer]}>
            <StatusBar hidden />

            <PageTitle title="Login" />

            <PhoneNumberTextField
                value={phoneNumberField.value}
                placeholder="Phone number"
                onChangeText={(input) => handlePhoneInput(input)}
                invalidPhoneNumberMessage={phoneNumberField.error}
            />

            <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Button title="Sign in with Google" onPress={signInWithGoogle} />
            </View>

            <Link href="/(tabs)" asChild>
                <Pressable style={styles.pressableTextContainer}>
                    <Text style={styles.pressableText}>Forgot password? click here</Text>
                </Pressable>
            </Link>

            {/* Single reCAPTCHA modal */}
            <FirebaseRecaptchaVerifierModal
                ref={recaptchaVerifierRef}
                firebaseConfig={auth.app.options}
                attemptInvisibleVerification={true} // use true if invisible works
                style={{
                    flex: 0,
                    height: 100,
                    width: 100,
                    backgroundColor: "transparent",
                }}
            />

            <ButtonMain label="Login" onPress={loginUser} />
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
