import { useState } from "react";
import { Modal, Pressable, StyleSheet, Text, View, FlatList } from "react-native";
import { COLORS } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { GENDER_OPTIONS } from "@/constants/registration";

interface GenderDropdownProps {
    value: GENDER_OPTIONS;
    onChange: (val: GENDER_OPTIONS) => void;
}

const GENDER_OPTIONS_DROPDOWN: { label: string; value: GENDER_OPTIONS }[] = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Other", value: "other" },
];

export default function GenderDropdown({ value, onChange }: GenderDropdownProps) {
    const [visible, setVisible] = useState(false);

    function handleSelect(value: GENDER_OPTIONS) {
        onChange(value);
        setVisible(false);
    }

    return (
        <>
            {/* Dropdown field */}
            <Pressable style={styles.field} onPress={() => setVisible(true)}>
                <Text style={[styles.text, !value && { color: COLORS.textPrimary }]}>
                    {value ? GENDER_OPTIONS_DROPDOWN.find(o => o.value === value)?.label : "Select gender"}
                </Text>

                <Ionicons name="chevron-down" size={20} color={COLORS.textPrimary} />
            </Pressable>

            {/* Modal */}
            <Modal visible={visible} transparent animationType="fade">
                <View style={styles.overlay}>
                    <View style={styles.modal}>
                        <Text style={styles.title}>Select Gender</Text>
                        <FlatList
                            data={GENDER_OPTIONS_DROPDOWN}
                            keyExtractor={(item) => item.value}
                            renderItem={({ item }) => (
                                <Pressable
                                    style={[
                                        styles.option,
                                        item.value === value && styles.optionSelected,
                                    ]}
                                    onPress={() => handleSelect(item.value)}
                                >
                                    <Text
                                        style={[
                                            styles.optionLabel,
                                            item.value === value && styles.optionLabelSelected,
                                        ]}
                                    >
                                        {item.label}
                                    </Text>
                                </Pressable>
                            )}
                        />

                        <Pressable onPress={() => setVisible(false)} style={styles.cancelButton}>
                            <Text style={styles.cancelText}>Cancel</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </>
    );
}

const styles = StyleSheet.create({
    field: {
        width: "80%",
        borderWidth: 1,
        borderColor: COLORS.textPrimary,
        borderRadius: 10,
        paddingVertical: 12,
        paddingHorizontal: 16,
        marginVertical: 10,
        backgroundColor: COLORS.backgroundPrimary,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        direction: "ltr"
    },
    text: {
        fontSize: 16,
        color: COLORS.textPrimary,
    },
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.4)",
        justifyContent: "center",
        alignItems: "center",
    },
    modal: {
        width: "80%",
        backgroundColor: COLORS.backgroundSecondry,
        borderRadius: 12,
        padding: 20,
        alignItems: "stretch",
    },
    title: {
        fontSize: 18,
        color: COLORS.textPrimary,
        fontWeight: "600",
        marginBottom: 10,
        textAlign: "center",
    },
    option: {
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.textPrimary,
    },
    optionSelected: {
        backgroundColor: COLORS.accentPrimary,
    },
    optionLabel: {
        fontSize: 16,
        color: COLORS.textPrimary,
        textAlign: "center",
    },
    optionLabelSelected: {
        color: COLORS.textPrimary,
        fontWeight: "600",
    },
    cancelButton: {
        marginTop: 10,
        paddingVertical: 10,
        alignItems: "center",
    },
    cancelText: {
        color: COLORS.textPrimary,
        fontSize: 15,
    },
});
