import ButtonMain from "@/components/common/buttonMain";
import PageTitle from "@/components/auth/pageTitle";
import TextField from "@/components/common/textField";
import { COLORS } from "@/constants/colors";
import { router, useLocalSearchParams } from "expo-router";
import { StatusBar, StyleSheet, View } from "react-native";
import { useFormField } from "@/hooks/useFormField";
import { registerUser } from "@/services/firebase/firestore";
import ProfileTypeSelector from "@/components/auth/register/profileTypeSelector";
import GenderDropdown from "@/components/auth/register/genderDropdown";
import DatePicker from "@/components/common/datePicker"
import BioInput from "@/components/auth/register/bioInput";
import ProfilePicturePicker from "@/components/auth/register/profilePicturePicker";
import { PROFILE_TYPES, GENDER_OPTIONS, BirthDate, Bio, ImageUri } from "@/constants/registration";
import { isNicknameValid, isBirthDateValid, isBioValid, isImageUriValid } from "@/utils/validation/registation";

// Validation functions (you can move these to a separate utils file)


export default function Register() {
    const nicknameField = useFormField<string>("", isNicknameValid);
    const profileTypeField = useFormField<PROFILE_TYPES>("regular");
    const genderField = useFormField<GENDER_OPTIONS>("male");
    const birthDateField = useFormField<BirthDate>(null, isBirthDateValid);
    const bioField = useFormField<Bio>("", isBioValid);
    const imageUriField = useFormField<ImageUri>(null, isImageUriValid);

    const params = useLocalSearchParams();
    const userId = params.userId as string;
    const phoneNumber = params.phoneNumber as string;

    function CreateNewUser() {
        registerUser(userId, phoneNumber, nicknameField.value);
        router.push("/(tabs)");
    }

    return (
        <View style={[StyleSheet.absoluteFill, styles.mainContainer]}>
            <StatusBar hidden />
            <PageTitle title="Register" />

            <TextField
                placeholder="Nickname"
                value={nicknameField.value}
                onChangeText={nicknameField.setValue}
            />

            <ProfileTypeSelector
                value={profileTypeField.value}
                onChange={profileTypeField.setValue}
            />

            <GenderDropdown
                value={genderField.value}
                onChange={genderField.setValue}
            />

            <DatePicker
                date={birthDateField.value}
                onChange={birthDateField.setValue}
            />

            <BioInput
                bio={bioField.value}
                setBio={bioField.setValue}
                error={bioField.error}
                setError={() => { }} // Remove this prop if not needed
            />

            <ProfilePicturePicker
                imageUri={imageUriField.value}
                setImageUri={imageUriField.setValue}
            />

            <ButtonMain label="Done" onPress={CreateNewUser} />
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: COLORS.backgroundPrimary,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
})