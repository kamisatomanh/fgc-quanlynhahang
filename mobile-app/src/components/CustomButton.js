import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import Colors from "../constants/colors";

const CustomButton = ({title, type = "primary", onPress}) => {
    return (
        <TouchableOpacity
            style={[styles.button, styles[type]]}
            onPress={onPress}
            activeOpacity={0.8}
        >
            <Text style={[styles.text, styles[`${type}Text`]]}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 40,
    },

    primary: {
        backgroundColor: Colors.primary_500,
    },

    primaryText: {
        color: Colors.white_500,
        fontWeight: "400",
    },
});

export default CustomButton;