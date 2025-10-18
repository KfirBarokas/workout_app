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
        today: { borderColor: "black" }, // specifically the day numbers
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
                            // display={Platform.OS === "ios" ? "spinner" : "default"}
                            onChange={({ date: selectedDate }) => {
                                if (selectedDate) onChange(selectedDate);
                                // setModalVisible(false);
                            }}
                            showOutsideDays={true}
                            // TODO: Seperate styles into variable
                            styles={{
                                ...defaultStyles,
                                // today: { borderColor: 'blue', borderWidth: 1 }, // Add a border to today's date
                                selected: { backgroundColor: 'red' }, // Highlight the selected day
                                selected_label: { color: 'white' }, // Highlight the selected day label
                                day_label: { color: 'black' },
                                month_label: { color: 'black' },

                                month_selector_label: { color: 'black', fontWeight: "600" },
                                month_selector: { backgroundColor: 'orange', borderRadius: 6, paddingHorizontal: 10, paddingVertical: 5 },

                                year_selector_label: { color: 'black', fontWeight: "600" },
                                year_selector: { backgroundColor: 'orange', borderRadius: 6, paddingHorizontal: 10, paddingVertical: 5 },

                                year_label: { color: 'black' },
                                button_next_image: { tintColor: 'black', transform: [{ scaleX: 1 }] },
                                button_prev_image: { tintColor: 'black', transform: [{ scaleX: 1 }] },
                            }}
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
