import { Link, Redirect } from "expo-router";
import { useState } from "react";
import { Pressable, Text, TextInput, View, StyleSheet, Button } from "react-native";

export default function Login(){
    const [email, setEmail]=useState('');
    const [password, setPassword]=useState('');


    return (
        <View style={styles.mainContainer}>
            <View style={{
                flexDirection:'column',
                justifyContent:'center',
                alignItems:'center',
            }}>
                <Text style={styles.title}>Login</Text>
                <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={(input)=>{setEmail(input)}}/>
                <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={(input)=>{setPassword(input)}}/>

                <Link href="/(tabs)" asChild>
                    <Pressable style={styles.pressableTextContainer}>
                        <Text style={styles.pressableText}>Forgot password? click here</Text>
                    </Pressable>
                </Link>

                <Pressable style={styles.loginButton}> <Text style={styles.loginButtonText}>Login</Text></Pressable>
            
                <Text style={{marginTop:20, fontSize: 15, color:'white'}}>OR</Text>

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

                <Link href="/(tabs)" asChild>
                    <Pressable style={styles.pressableTextContainer}>
                        <Text style={styles.pressableText}>Click here to register</Text>
                    </Pressable>
                </Link>
            </View>

        </View>
    )
}


const styles = StyleSheet.create({
    mainContainer:{
        marginTop:'25%',
        height:'100%',
    },
    title:{
        color:'white',
        fontSize: 45
    },
    input: {
        height: 50,
        margin: 12,
        // lineHeight:40,
        padding: 10,
        paddingHorizontal:20,
        fontSize:18,
        width:250,
        backgroundColor:'white',
        borderRadius:30
    },
    loginButton:{
        backgroundColor:'cyan',
        padding:15,
        borderRadius:30,
        width:130,
        alignItems:'center',
        marginTop:30
    },
    loginButtonText:{
        fontSize: 20
    },
    googleLoginButton:{
        backgroundColor:'white',
        padding:20,
        borderRadius:30,
        width:250,
        alignItems:'center',
        marginTop:30
    },
    pressableTextContainer:{
        marginTop:20
    },
    pressableText:{
        fontSize: 15,
        fontFamily:'underline',
        color:'white'
    }
});