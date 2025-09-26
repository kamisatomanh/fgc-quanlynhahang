import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import Colors from "../constants/colors";
import { useNavigation } from "@react-navigation/native";

const CustomLink = ({
    label,
    destination,
}) => {
    const navigation = useNavigation();
    return (
        <Pressable onPress={() => navigation.navigate(destination)}>
            <Text style={[styles.link]}>
                {label}
            </Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    link: {
        color: Colors.primary_500,
        fontSize: 15,
    }
});

export default CustomLink;