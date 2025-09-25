import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import Colors from "../constants/colors";

const CustomInput = ({
    label, 
    placeholder, 
    keyboardType = 'default',
    isPassword = false,
}) => {
    const [value, setValue] = useState("");
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);

    const isActive = isFocused || !!value;

    return (
        <View style={styles.container}>
            <View style={[
                styles.inputContainer,
                isActive && styles.inputActive,
            ]}>
                <Text style={[
                    styles.label,
                    isActive && styles.labelActive,
                ]}>
                    {label}
                </Text>
                <TextInput
                    style={styles.input}
                    placeholder={!isActive ? placeholder : ''}
                    placeholderTextColor={Colors.gray_500}
                    keyboardType={keyboardType}
                    value={value}
                    onChangeText={setValue}
                    secureTextEntry={isPassword}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginBottom: 20,
    },
    inputContainer: {
        width: '100%',
        backgroundColor: Colors.white_500,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: Colors.light_500,
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    inputActive: {
        borderColor: Colors.primary_500,
    },
    label: {
        fontSize: 12,
        color: Colors.gray_500,
    },
    labelActive: {
        fontSize: 12,
        color: Colors.primary_500,
    },
    input: {
        fontSize: 16,
        color: Colors.dark_500,
        padding: 0,
    },
});

export default CustomInput;