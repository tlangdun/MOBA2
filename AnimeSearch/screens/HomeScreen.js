import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Button, TextInput } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';

const Stack = createNativeStackNavigator();

export default function HomeScreen({ navigation }) {
    const [searchTerm, setSearchTerm] = useState('');
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Search for anime"
                onChangeText={text => setSearchTerm(text)}
                value={searchTerm} />
            <Button
                title="Search"
                onPress={() => navigation.navigate('Results', { searchTerm })}
            />
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        fontSize: 24,
        backgroundColor: '#fff',
        textAlign: 'center',
        justifyContent: 'center', // increase the padding value to move the header down
        marginTop: StatusBar.currentHeight, // add padding for status bar
    },
    input: {
        height: 40,
        width: '100%',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginVertical: 20,
    },
    button: {
        margin: 12,
        padding: 10,
        backgroundColor: 'blue',
        borderRadius: 8,
    },
});