import { StyleSheet, View } from 'react-native';
import { Icon, Text, useTheme } from 'react-native-paper'

interface ErrorScreenProps {
    message: string,
    details: string | undefined
}

export function ErrorScreen(props: ErrorScreenProps) {
    const theme = useTheme()
    return (
        <View style={styles.container}>
            <Icon
                source="alert"
                color={theme.colors.error}
                size={40}
            />
            <Text>{props.message}</Text>
            <Text>{props.details}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    icon: {
        height: 80,
        width: 80
    },
    message: {
        marginTop: 4
    }
})