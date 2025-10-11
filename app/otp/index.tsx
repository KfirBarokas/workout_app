import { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { usePhoneAuth } from "./usePhoneAuth";
import OtpField from "@/components/auth/otp/otpField";
import PageTitle from "@/components/auth/pageTitle";
import ButtonMain from "@/components/common/buttonMain";
import { COLORS } from "@/constants/colors";

export default function Otp() {
    const router = useRouter();
    const { verificationId } = useLocalSearchParams();
    const { verifyOTP } = usePhoneAuth();
    const [enteredCode, setEnteredCode] = useState("");
    const [message, setMessage] = useState("");

    async function handleVerify() {
        console.log(verificationId)
        if (!verificationId) {
            setMessage("No verification ID available. Retry sending OTP.");
            return;
        }
        const success = await verifyOTP(enteredCode, verificationId);
        if (!success) {
            setMessage("Invalid OTP. Try again.");
            return;
        }

        router.replace("/(tabs)");
    }

    return (
        <View style={[StyleSheet.absoluteFill, styles.pageContainer]}>
            <PageTitle title="OTP Verification" />
            <OtpField setEnteredCode={setEnteredCode} />

            <ButtonMain label="Verify" onPress={handleVerify} />
            {message ? <Text>{message}</Text> : null}
        </View>
    );
}

const styles = StyleSheet.create({
    pageContainer: {
        backgroundColor: COLORS.backgroundPrimary,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
});
