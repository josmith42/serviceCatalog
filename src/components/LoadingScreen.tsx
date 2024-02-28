import { ActivityIndicator, Text } from "react-native-paper"
import { StyleSheet, View } from 'react-native';
import React from "react";

export default function LoadingScreen() {
    return (
        <View style={styles.container}>
            <ActivityIndicator animating={true} size={'large'} />
            <Text style={styles.loadingText}>Loading...</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 32,
        alignItems: 'center',
        justifyContent: 'center'
    },
    loadingText: {
        marginTop: 4
    }
})