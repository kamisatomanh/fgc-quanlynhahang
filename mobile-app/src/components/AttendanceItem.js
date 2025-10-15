import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import Colors from "../constants/colors";

const AttendanceItem = ({
    icon,
    title,
    time,
    description,
}) => {
    return (
        <View style={styles.itemWrapper}>
            <View style={styles.headerWrapper}>
                <View style={styles.iconWrapper}>
                    <Image
                        source={icon}
                        resizeMode="cover"
                        style={styles.icon}
                    />
                </View>
                <Text style={styles.title}>{title}</Text>
            </View>
            <Text style={styles.time}>{time}</Text>
            <Text style={styles.description}>{description}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    itemWrapper: {
        backgroundColor: Colors.white_500,
        borderRadius: 10,
        padding: 20,
        width: 175,
        flexDirection: 'column',
        gap: 5
    },
    headerWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
    iconWrapper:{
        width: 35,
        height: 35,
        backgroundColor: Colors.primary_10p,
        borderRadius: 5,
        padding: 7
    },
    icon: {
        width: '100%',
        height: '100%'
    },
    title: {
        fontSize: 16
    },
    time: {
        fontSize: 20,
        fontWeight: 600,
    },
    description: {
        fontSize: 16
    }
});

export default AttendanceItem;