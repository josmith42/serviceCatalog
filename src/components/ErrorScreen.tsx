import React from 'react';
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
        padding: 32,
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