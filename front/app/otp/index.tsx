import PageTitle from "@/components/auth/pageTitle";
import ButtonMain from "@/components/common/buttonMain";
import { COLORS } from "@/constants/colors";
import { useState } from "react";
import { View, StatusBar, StyleSheet, Text, Pressable } from "react-native";

import { OtpInput } from 'react-native-otp-entry'

// TODO: Create a page template component

// TODO: Fix proportions of this page
// TODO: Add all colors to a single page with variables

export default function Otp() {

    const [enteredCode, setEnteredCode] = useState('')

    return (
        <View style={[StyleSheet.absoluteFill, styles.pageContainer]}>
            <StatusBar hidden />

            <View style={styles.cardContainer}>

                <PageTitle title="OTP Verification" />

                <View style={styles.instructionTextContainer}>
                    <Text style={styles.instructionText}>
                        Enter the code we just sent to your number ********98
                    </Text>
                </View>

                <View style={styles.resendCodeContainer}>
                    <Pressable>
                        <Text>Didn't recive code?</Text><Text>Resend</Text>
                    </Pressable>

                </View>

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


                <ButtonMain label='Verify' onPress={() => { }} />
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    pageContainer: {
        backgroundColor: COLORS.background,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardContainer: {
        backgroundColor: '#FFFFFF',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        // paddingTop: 80,
        borderRadius: 20,
        height: '65%'
    },
    instructionTextContainer: {
        flexDirection: 'column',
        alignItems: 'flex-end',
        // backgroundColor: 'red',
        width: '70%'
    },
    instructionText: {
        color: '#6B6B6B',
        textAlign: 'right',
        width: 190,
    },
    resendCodeContainer: {
        // marginTop: 200
    },
    otpContainer: {
        gap: '12',
        width: 'auto',
        flexDirection: 'row-reverse',
        margin: 20
        // backgroundColor: 'red',
    },
    pinCodeText: {
        color: 'black',
        fontSize: 20,
    },
    pinCodeContainer: {
        borderColor: '#D3C5B0',
        borderWidth: 2,
        backgroundColor: '#EAE2D3',
        height: 50,
        borderRadius: 8
    },
    filledPinCodeContainer: {
        borderColor: '#D27D2C',
        borderWidth: 2
    },
    activePinCodeContainer: {
        borderColor: '#D3C5B0'
    },
    focusStick: {
        color: 'black',
        borderColor: 'black',
        // TODO: HOW DO YOU CHANGE THE STICK COLOR??
    }
});