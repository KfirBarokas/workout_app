import { StyleSheet, Text } from "react-native";

interface PageTitleProps {
    title: string
}

export default function PageTitle({ title }: PageTitleProps) {
    return (
        <Text style={styles.title}>{title}</Text>
    )
}

const styles = StyleSheet.create({
    title: {
        width: "100%",
        textAlign: 'center',
        direction: 'ltr',
        color: 'black',
        fontSize: 35
    },
})