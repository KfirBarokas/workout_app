import { COLORS } from "@/constants/colors";
import React, { useState } from "react";
import {
    Modal,
    View,
    Text,
    Pressable,
    StyleSheet,
    Platform,
} from "react-native";
import DateTimePicker, { DateType, useDefaultStyles } from "react-native-ui-datepicker";

interface DatePickerModalProps {
    date: DateType | null;
    onChange: (date: Date) => void;
    label?: string; // optional label above button
}

export default function DatePickerModal({ date, onChange, label }: DatePickerModalProps) {
    const [modalVisible, setModalVisible] = useState(false);
    const defaultStyles = useDefaultStyles();
    const customStyles = {
        ...defaultStyles,
        // text: { ...defaultStyles.tex, color: "black" }, // general text
        dayText: { ...defaultStyles.day, color: "black" }, // specifically the day numbers
    };
    return (
        <View style={styles.container}>
            {label && <Text style={styles.label}>{label}</Text>}

            <Pressable style={styles.button} onPress={() => setModalVisible(true)}>
                <Text style={styles.buttonText}>
                    {date ? date.toDateString() : "Select Date"}
                </Text>
            </Pressable>

            <Modal
                visible={modalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <DateTimePicker
                            mode="single"
                            date={date || new Date()}
                            display={Platform.OS === "ios" ? "spinner" : "default"}
                            onChange={({ date: selectedDate }) => {
                                if (selectedDate) onChange(selectedDate);
                                // setModalVisible(false);
                            }}
                            styles={{ ...customStyles }}
                            textColor="black"
                        />

                        <Pressable
                            onPress={() => setModalVisible(false)}
                            style={styles.closeButton}
                        >
                            <Text style={styles.closeText}>Cancel</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
        width: "100%",
    },
    label: {
        marginBottom: 5,
        fontWeight: "500",
        fontSize: 14,
        color: "#333",
    },
    button: {
        padding: 12,
        backgroundColor: "#eee",
        borderRadius: 8,
        alignItems: "center",
    },
    buttonText: {
        fontSize: 16,
        color: "#000",
    },
    modalOverlay: {
        flex: 1,
        justifyContent: "center",
        // backgroundColor: "rgba(0,0,0,0.5)",
    },
    modalContent: {
        margin: 20,
        backgroundColor: COLORS.backgroundPrimary,
        borderRadius: 12,
        padding: 20,
        alignItems: "center",
    },
    closeButton: {
        marginTop: 10,
        padding: 10,
    },
    closeText: {
        color: "#007AFF",
        fontSize: 16,
    },
});
