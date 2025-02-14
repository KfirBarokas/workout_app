import { COLORS } from "@/constants/colors";
import { StyleSheet } from "react-native";
import { OtpInput } from "react-native-otp-entry";

interface OtpFieldProps {
    setEnteredCode: (code: string) => void
}

export default function OtpField({ setEnteredCode }: OtpFieldProps) {
    return (
        <OtpInput
            numberOfDigits={6}
            onTextChange={input => setEnteredCode(input)}
            focusColor="green"
            autoFocus={false}
            hideStick={true}
            // placeholder="******"
            blurOnFilled={true}
            type="numeric"
            secureTextEntry={false}
            focusStickBlinkingDuration={500}
            onFocus={() => console.log("Focused")}
            onBlur={() => console.log("Blurred")}
            onFilled={(text) => console.log(`OTP is ${text}`)}
            textInputProps={{
                accessibilityLabel: "One-Time Password",
            }}
            theme={{
                containerStyle: styles.otpContainer,
                pinCodeContainerStyle: styles.pinCodeContainer,
                pinCodeTextStyle: styles.pinCodeText,
                focusStickStyle: styles.focusStick,
                focusedPinCodeContainerStyle: styles.activePinCodeContainer,
                // placeholderTextStyle: styles.placeholderText,
                filledPinCodeContainerStyle: styles.filledPinCodeContainer,
                // disabledPinCodeContainerStyle: styles.disabledPinCodeContainer,
            }}

        />
    )
}

const styles = StyleSheet.create({
    otpContainer: {
        gap: '12',
        width: 'auto',
        flexDirection: 'row-reverse',
        margin: 20
    },
    pinCodeText: {
        color: COLORS.textPrimary,
        fontSize: 20,
    },
    pinCodeContainer: {
        borderColor: COLORS.borderStandard,
        borderWidth: 2,
        backgroundColor: COLORS.backgroundSecondry,
        height: 50,
        borderRadius: 8
    },
    filledPinCodeContainer: {
        borderColor: COLORS.accentPrimary,
        borderWidth: 2
    },
    activePinCodeContainer: {
        borderColor: COLORS.borderStandard
    },
    focusStick: {
        color: COLORS.textPrimary,
        borderColor: COLORS.textPrimary,
        // TODO: HOW DO YOU CHANGE THE STICK COLOR??
    }
})