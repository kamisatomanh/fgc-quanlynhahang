import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import Colors from "../constants/colors";

const DateBoxItem = ({dateNum, dateText, type = "primary", onPress}) => {
    return (
        <TouchableOpacity
            style={[styles[`${type}Button`]]}
            onPress={onPress}
        >
            <Text style={[styles.text, styles[`${type}DateNum`]]}>{dateNum}</Text>
            <Text style={[styles.text, styles[`${type}DateText`]]}>{dateText}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    primaryButton: {
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: "center",
        width: 70,
        paddingVertical: 10,
        backgroundColor: Colors.primary_500,
    },

    Button: {
        paddingVertical: 15,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: Colors.light_500,
        alignItems: "center",
        width: 70,
        paddingVertical: 10,
    },

    primaryDateNum: {
        color: Colors.white_500,
        fontWeight: "600",
        fontSize: 20
    },
    primaryDateText: {
        color: Colors.white_500,
        fontWeight: '300',
        fontSize: 16
    },
    DateNum: {
        color: Colors.dark_500,
        fontWeight: "600",
        fontSize: 20
    },
    DateText: {
       color: Colors.dark_500,
        fontWeight: '300',
        fontSize: 16 
    }
});

export default DateBoxItem;