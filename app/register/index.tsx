import ButtonMain from "@/components/common/buttonMain";
import PageTitle from "@/components/auth/pageTitle";
import TextField from "@/components/common/textField";
import { COLORS } from "@/constants/colors";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import { useFormField } from "@/hooks/useFormField";
import { registerUser } from "@/services/firebase/firestore";
import ProfileTypeSelector from "@/components/auth/register/profileTypeSelector";
import GenderDropdown from "@/components/auth/register/genderDropdown";
import DatePicker from "@/components/common/datePicker"
// phone
// nickname
// gender - male / female / other
// profile type - regular / coach

// date of birth - optional
// profile picture - optional
// bio - optional

function isNicknameValid(nickname: string) {
    const regex = /^[a-zA-Z0-9_]{3,30}$/;

    if (nickname.length == 0) {
        return { valid: false, message: "Nickname cannot be empty" };
    }

    if (!regex.test(nickname)) {
        return { valid: false, message: "Invalid nickname" };
    }

    return { valid: true }
}



export default function Register() {
    const nicknameField = useFormField<string>("", isNicknameValid);
    const [profileType, setProfileType] = useState("regular")
    const [gender, setGender] = useState("male");
    const [birthDate, setBirthDate] = useState<Date | null>(null);

    const params = useLocalSearchParams();
    const userId = params.userId as string;
    const phoneNumber = params.phoneNumber as string;

    function CreateNewUser() {
        registerUser(userId, phoneNumber, nicknameField.value,)
        router.push("/(tabs)")
    }

    return (
        <View style={[StyleSheet.absoluteFill, styles.mainContainer]}>
            <StatusBar hidden />

            <PageTitle title="Register" />

            <TextField placeholder="Nickname" value={nicknameField.value} onChangeText={input => nicknameField.setValue(input)} />

            <ProfileTypeSelector value={profileType} onChange={setProfileType} />

            <GenderDropdown value={gender} onChange={setGender} />

            <DatePicker date={birthDate} onChange={setBirthDate} />

            <ButtonMain label="Done" onPress={CreateNewUser} />
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: COLORS.background,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
})