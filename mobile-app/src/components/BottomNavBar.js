import React from "react";
import Colors from "../constants/colors";
import { Image, Pressable, StyleSheet, TouchableOpacity, View } from "react-native";

const BottomNavBar = ({activeTab, onTabPress}) => {
    return (
        <View style={styles.container}>
            <View style={styles.leftContainer}>
                <Pressable 
                    onPress={() => onTabPress("Home")}
                    style={styles.tabButton}
                >
                    <Image
                        source={require("../../assets/icons/home-tab-icon.png")}
                        style={[styles.icon, activeTab === "Home" && styles.activeIcon]}
                    />
                </Pressable>

                <Pressable 
                    onPress={() => onTabPress("Leave")}
                    style={styles.tabButton}
                >
                    <Image
                        source={require("../../assets/icons/leave-tab-icon.png")}
                        style={[styles.icon, activeTab === "Leave" && styles.activeIcon]}
                    />
                </Pressable>
            </View>
            

            <View style={styles.centerButtonWrapper}>
                <Pressable onPress={() => onTabPress("Member")} style={styles.centerButton}>
                    <Image
                        source={require("../../assets/icons/member-tab-icon.png")}
                        style={styles.centerIcon}
                    />
                </Pressable>
            </View>
            <View style={styles.rightContainer}>
                <Pressable 
                    onPress={() => onTabPress("Holiday")}
                    style={styles.tabButton}
                >
                    <Image
                        source={require("../../assets/icons/holiday-tab-icon.png")}
                        style={[styles.icon, activeTab === "Holiday" && styles.activeIcon]}
                    />
                </Pressable>

                <Pressable 
                    onPress={() => onTabPress("Profile")}
                    style={styles.tabButton}
                >
                    <Image
                        source={require("../../assets/icons/profile-tab-icon.png")}
                        style={[styles.icon, activeTab === "Profile" && styles.activeIcon]}
                    />
                </Pressable>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: 100,
        paddingBottom: 40,      
        flexDirection: "row",
        justifyContent: 'center'
    },
    leftContainer: {
        width: '50%',
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'space-between',
        backgroundColor: Colors.white_500,
        borderTopRightRadius: 100,
        paddingRight: 40,
    },
    rightContainer: {
        width: '50%',
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'space-between',
        backgroundColor: Colors.white_500, 
        borderTopLeftRadius: 100,
        paddingLeft: 40,
    },
    tabButton: {
        flex: 1,
        alignItems: "center",
    },
    icon: {
        width: 25,
        height: 25,
        tintColor: Colors.dark_500,
    },
    activeIcon: {
        tintColor: Colors.primary_500,
    },
    centerButtonWrapper: {
        position: 'absolute',
        zIndex: 1,
        bottom: 50
    },
    centerButton: {
        width: 65,
        height: 65,
        borderRadius: 65,
        backgroundColor: Colors.primary_500,
        justifyContent: "center",
        alignItems: "center",
    },
    centerIcon: {
        width: 25,
        height: 25,
        tintColor: Colors.white_500,
    },
});

export default BottomNavBar;
