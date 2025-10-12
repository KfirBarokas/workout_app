import { View, StyleSheet, Text } from "react-native";
import OtpField from "@/components/auth/otp/otpField";
import PageTitle from "@/components/auth/pageTitle";
import ButtonMain from "@/components/common/buttonMain";
import { COLORS } from "@/constants/colors";

import { useOtpScreen } from "./useOTPScreen";

export default function Otp() {
    const { setEnteredCode, message, handleVerify, loading } = useOtpScreen();

    return (
        <View style={[StyleSheet.absoluteFill, styles.pageContainer]}>
            <PageTitle title="OTP Verification" />
            <OtpField setEnteredCode={setEnteredCode} />

            <ButtonMain label="Verify" onPress={handleVerify} disabled={loading} />
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
