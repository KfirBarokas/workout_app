import ButtonMain from "@/components/common/buttonMain";
import PageTitle from "@/components/auth/pageTitle";
import TextField from "@/components/common/textField";
import { Link } from "expo-router";
import { useState } from "react";
import { Pressable, Text, View, StyleSheet, Switch } from "react-native";

import { router } from "expo-router";
import { COLORS } from "@/constants/colors";


import ServerHttpRequest from '../../services/axios_request.mjs'
export default function Login() {
    const [email, setEmail] = useState('')

    async function LoginUser() {

        if (!email) { return; }

        console.log("Requesting")

        let loginData = {
            email: email
        }
        let response = await ServerHttpRequest('get', '/login', loginData)

        if (response) {
            console.log(response.data);
        }
    }


    return (
        <View style={styles.mainContainer}>

            <PageTitle title="Login" />

            <TextField value={email} placeholder="Email" onChangeText={input => setEmail(input)} />

            <Link href="/(tabs)" asChild>
                <Pressable style={styles.pressableTextContainer}>
                    <Text style={styles.pressableText}>Forgot password? click here</Text>
                </Pressable>
            </Link>

            <ButtonMain label='Login' onPress={LoginUser} />

            <Text style={{ marginTop: 20, fontSize: 15, color: 'white' }}>OR</Text>

            <Link href="/(tabs)" asChild>
                <Pressable style={styles.googleLoginButton}>
                    <Text>Login with Google</Text>
                </Pressable>
            </Link>
            <Link href="/(tabs)" asChild>
                <Pressable style={styles.googleLoginButton}>
                    <Text>Login with Facebook</Text>
                </Pressable>
            </Link>


            <Pressable hitSlop={12} style={styles.pressableTextContainer} onPress={() => router.push('/register')}>
                <Text style={styles.pressableText}>Click here to register</Text>
            </Pressable>


        </View >
    )
}


const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: COLORS.background,
        height: '100%',
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