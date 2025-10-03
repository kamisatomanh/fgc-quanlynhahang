import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View, Image, TouchableOpacity } from "react-native";
import Colors from "../constants/colors";

const CustomInput = ({
    label,
    placeholder,
    keyboardType = "default",
    isPassword = false,
}) => {
    const [value, setValue] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);

    const isActive = isFocused || !!value;

    return (
        <View style={styles.container}>
            <View
                style={[
                    styles.inputContainer,
                    isActive && styles.inputActive,
                ]}
            >
                <Text
                    style={[
                        styles.label,
                        isActive && styles.labelActive,
                    ]}
                >
                    {label}
                </Text>

                {isPassword ? (
                    <View style={styles.row}>
                        <TextInput
                            style={[styles.input, { flex: 1 }]}
                            placeholder={!isActive ? placeholder : ""}
                            placeholderTextColor={Colors.gray_500}
                            keyboardType={keyboardType}
                            value={value}
                            onChangeText={setValue}
                            secureTextEntry={!showPassword}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                        />
                        <TouchableOpacity
                            onPress={() => setShowPassword(!showPassword)}
                            style={styles.iconWrapper}
                        >
                            <Image
                                source={
                                    showPassword
                                        ? require("../../assets/icons/eye-close.png")
                                        : require("../../assets/icons/eye-open.png")
                                }
                                style={styles.icon}
                                resizeMode="contain"
                            />
                        </TouchableOpacity>
                    </View>
                ) : (
                    <TextInput
                        style={styles.input}
                        placeholder={!isActive ? placeholder : ""}
                        placeholderTextColor={Colors.gray_500}
                        keyboardType={keyboardType}
                        value={value}
                        onChangeText={setValue}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                    />
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
    },
    inputContainer: {
        width: "100%",
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
        color: Colors.dark_500,
        marginBottom: 5,
    },
    labelActive: {
        fontSize: 12,
        color: Colors.primary_500,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
    },
    input: {
        fontSize: 16,
        color: Colors.dark_500,
        padding: 0,
    },
    iconWrapper: {
        marginLeft: 10,
    },
    icon: {
        width: 22,
        height: 22,
        tintColor: Colors.gray_500,
        marginTop: -20
    },
});

export default CustomInput;
