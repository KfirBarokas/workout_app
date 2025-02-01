import ButtonMain from "@/components/loginRegister/buttonMain";
import PageTitle from "@/components/loginRegister/pageTitle";
import TextField from "@/components/loginRegister/textField";
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

            <ButtonMain label="Next step" onPress={() => console.log('NEXT STEP!')} />
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
})