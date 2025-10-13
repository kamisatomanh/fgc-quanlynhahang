import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import Colors from "../constants/colors";

const ActivityItem = ({
    icon,
    title,
    time,
    date,
    description,
}) => {
    return (
        <View style={styles.itemWrapper}>
            <View style={styles.iconWrapper}>
                <Image
                    source={icon}
                    resizeMode="cover"
                    style={styles.icon}
                />
            </View>
            <View style={{flex: 1, gap: 5}}>
                <View style={styles.row}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.time}>{time}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.description}>{date}</Text>
                    <Text style={styles.description}>{description}</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    itemWrapper: {
        backgroundColor: Colors.white_500,
        borderRadius: 10,
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
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
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 18,
        fontWeight: 600,
    },
    time: {
        fontSize: 18,
        fontWeight: 600,
    },
    description: {
        fontSize: 16,
        color: Colors.gray_500
    }
});

export default ActivityItem;