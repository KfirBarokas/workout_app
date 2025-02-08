import ButtonMain from "@/components/common/buttonMain";
import PageTitle from "@/components/auth/pageTitle";
import TextField from "@/components/common/textField";
import { COLORS } from "@/constants/colors";
import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, View } from "react-native";


export default function Register() {
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    return (
        <View style={styles.mainContainer}>
            <PageTitle title="Register" />

            <TextField placeholder="Email" value={email} onChangeText={input => setEmail(input)} />
            <TextField placeholder="Username" value={username} onChangeText={input => setUsername(input)} />
            <TextField placeholder="Password" value={password} onChangeText={input => setPassword(input)} />
            <TextField placeholder="Confirm Password" value={confirmPassword} onChangeText={input => setConfirmPassword(input)} />

            <ButtonMain label="Next step" onPress={() => router.push('/register/register_optional')} />
        </View>
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
})