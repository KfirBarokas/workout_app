import OtpField from "@/components/auth/otpField";
import PageTitle from "@/components/auth/pageTitle";
import ButtonMain from "@/components/common/buttonMain";
import { COLORS } from "@/constants/colors";
import ServerHttpRequest from "@/services/axios_request.mjs";
import { useState } from "react";
import { View, StatusBar, StyleSheet, Text, Pressable } from "react-native";

import { OtpInput } from 'react-native-otp-entry'

// TODO: Create a page template component

// TODO: Fix proportions of this page

export default function Otp() {

    const [enteredCode, setEnteredCode] = useState('')

    async function SendCodeCheckRequest() {
        let OTPcheckData = {
            code: enteredCode,
            credential: 
        }
        let codeValid = await ServerHttpRequest('post', '/checkOTP',)
    }

    return (
        <View style={[StyleSheet.absoluteFill, styles.pageContainer]}>
            <StatusBar hidden />

            <View style={styles.cardContainer}>
                <View style={styles.topContainer}>
                    <PageTitle title="OTP Verification" />


                    <View style={styles.instructionTextContainer}>
                        <Text style={styles.instructionText}>
                            Enter the code we just sent to your number ********98
                        </Text>
                    </View>



                    <OtpField setEnteredCode={setEnteredCode} />
                </View>

                <View style={styles.bottomContainer}>
                    <View style={styles.resendCodeContainer}>

                        <Text>Didn't recive code? </Text><Pressable hitSlop={15} onPress={() => { alert('resent code') }}><Text style={styles.resendCodeText}>Resend</Text></Pressable>

                    </View>
                    <ButtonMain label='Verify' onPress={SendCodeCheckRequest} />
                </View>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    pageContainer: {
        backgroundColor: COLORS.backgroundPrimary,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardContainer: {
        backgroundColor: COLORS.backgroundSurface,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderColor: COLORS.textPrimary,
        borderWidth: 1,
        borderRadius: 20,
        height: '65%'
    },
    topContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: '20%'
    },
    bottomContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        paddingBottom: '10%'
    },
    instructionTextContainer: {
        flexDirection: 'column',
        alignItems: 'flex-end',
        width: '70%'
    },
    instructionText: {
        color: COLORS.textSecondry,
        textAlign: 'right',
        width: 190,
    },
    resendCodeContainer: {
        // marginTop: 200
        flexDirection: 'row-reverse',
    },
    resendCodeText: {
        color: COLORS.accentPrimary,
        textDecorationLine: 'underline'
    }
});