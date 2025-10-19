import ButtonMain from "@/components/common/buttonMain";
import PageTitle from "@/components/auth/pageTitle";
import TextField from "@/components/common/textField";
import { COLORS } from "@/constants/colors";
import { router, useLocalSearchParams } from "expo-router";
import { ScrollView, StatusBar, StyleSheet, View } from "react-native";
import { useFormField } from "@/hooks/useFormField";
import { registerUser } from "@/services/firebase/firestore";
import ProfileTypeSelector from "@/components/auth/register/profileTypeSelector";
import GenderDropdown from "@/components/auth/register/genderDropdown";
import DatePicker from "@/components/common/datePicker"
import BioInput from "@/components/auth/register/bioInput";
import ProfilePicturePicker from "@/components/auth/register/profilePicturePicker";
import { PROFILE_TYPES, GENDER_OPTIONS, BirthDate, Bio, ImageUri } from "@/constants/registration";
import { isNicknameValid, isBirthDateValid, isBioValid, isImageUriValid } from "@/utils/validation";
import InputLabel from "@/components/auth/register/inputLabel";


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
        // TODO: Add: check if all inputs are valid then proceed
        registerUser(userId, phoneNumber, nicknameField.value, profileTypeField.value, genderField.value, birthDateField.value, bioField.value, imageUriField.value);
        router.push("/(tabs)");
    }

    return (
        <View style={[StyleSheet.absoluteFill, styles.mainContainer]}>
            <StatusBar hidden />
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.backButtonContainer}>
                    {/* Add back button component here */}
                </View>

                <View style={styles.contentContainer}>
                    <PageTitle title="Create Your Account" />

                    <ProfilePicturePicker
                        imageUri={imageUriField.value}
                        setImageUri={imageUriField.setValue}
                    />

                    <View style={styles.formContainer}>
                        <InputLabel text="Nickname" />
                        <TextField
                            placeholder="Enter your nickname"
                            value={nicknameField.value}
                            onChangeText={nicknameField.setValue}
                        />

                        <InputLabel text="Gender" />
                        <GenderDropdown
                            value={genderField.value}
                            onChange={genderField.setValue}
                        />

                        <InputLabel text="Profile Type" />
                        <ProfileTypeSelector
                            value={profileTypeField.value}
                            onChange={profileTypeField.setValue}
                        />

                        <InputLabel text="Date of birth (optional)" />
                        <DatePicker
                            date={birthDateField.value}
                            onChange={birthDateField.setValue}
                        />

                        <InputLabel text="Bio (optional)" />
                        <BioInput
                            bio={bioField.value}
                            setBio={bioField.setValue}
                            error={bioField.error}
                        />
                    </View>

                    <ButtonMain
                        label="Create Account"
                        onPress={CreateNewUser}
                    />
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: COLORS.backgroundPrimary,
        flex: 1,
    },
    scrollContainer: {
        flexGrow: 1,
    },
    backButtonContainer: {
        position: 'absolute',
        top: 40,
        left: 16,
        zIndex: 1,
    },
    contentContainer: {
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 60,
        alignItems: 'center',
    },
    profilePicker: {
        marginTop: 24,
        marginBottom: 32,
    },
    formContainer: {
        width: '100%',
        paddingHorizontal: 16,
        flexDirection: 'column',
        alignItems: 'flex-end'
    },
    inputSpacing: {
        marginTop: 16,
    },
    createButton: {
        marginTop: 32,
        marginBottom: 24,
        width: '90%',
    }
});