import React, { useState, useEffect, useRef } from "react";
import { Image, StyleSheet, View, Text, TouchableOpacity, ScrollView } from "react-native";
import Colors from "../constants/colors";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import { CommonActions, useNavigation } from "@react-navigation/native";
import DateBoxItem from "../components/DateBoxItem";
import AttendanceItem from "../components/AttendanceItem";
import ActivityItem from "../components/ActivityItem";
import CustomLink from "../components/CustomLink";
import AttendanceSwiper from "../components/AttendanceSwiper";
import BottomNavBar from "../components/BottomNavBar";
const HomePage = () => {
    const [activeTab, setActiveTab] = useState("Home");
    const navigation = useNavigation();
    const [checkType, setCheckType] = useState("CheckIn");
    const handleCheckedIn = () => {
        setTimeout(() => {
            setCheckType("CheckOut");
        }, 5000);
    };
    
    const handleResetPassword = () => {
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [
                    {name: 'Login'},
                ],
            })
        );
    };

    const today = new Date();
    
    const days = Array.from({length: 7}, (_, i) => {
        const date = new Date(today);
        date.setDate(today.getDate() + i - 3);
        return date;
    });

    const getWeekday = (date) => {
        return date.toLocaleDateString("en-US", {weekday: "short"});
    };

    const scrollRef = useRef(null);

    useEffect(() => {
        setTimeout(() => {
            if (scrollRef.current) {
                const screenCenterOffset = (35) * 3;
                scrollRef.current.scrollTo({x: screenCenterOffset, animated: false});
            }
        }, 0);
    }, []);

    
    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <View style={styles.content}>
                    <View style={styles.userWrapper}>
                        <View style={styles.userInfoWrapper}>
                            <Image
                                style={styles.userAvatar}
                                source={require("../../assets/images/user-avatar-image.png")}
                            />
                            <View style={styles.userInfo}>
                                <Text style={styles.userName}>
                                    Michael Mitc
                                </Text>
                                <Text style={styles.userPosition}>
                                    Nhân viên phục vụ
                                </Text>
                            </View>
                        </View>
                        <View style={styles.userNotiWrapper}>
                            <Image
                                style={styles.userNoti}
                                source={require("../../assets/icons/notification-bell-image.png")}
                                resizeMode="cover"
                            />
                        </View>
                    </View>
                    <ScrollView
                        ref={scrollRef}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.scrollContent}
                    >
                        {days.map((date, index) => {
                            const isToday = date.toDateString() === today.toDateString();
                            return (
                                <DateBoxItem
                                    key={index}
                                    dateNum={String(date.getDate()).padStart(2, "0")}
                                    dateText={getWeekday(date)}
                                    type={isToday ? "primary" : ""}
                                />
                            )
                        })

                        }
                    </ScrollView>
                    
                    <View style={styles.attendanceContent}>
                        <View style={styles.contentSection}>
                            <View style={styles.contentHeaderWrapper}>
                                <Text style={styles.contentHeader}>
                                    Chấm công hôm nay
                                </Text>
                            </View>
                            <View style={styles.attendanceGroup}>
                                <AttendanceItem
                                    icon={require("../../assets/icons/check-in-icon.png")}
                                    title="Check In"
                                    time="10:20 AM"
                                    description="On Time"
                                />
                                <AttendanceItem
                                    icon={require("../../assets/icons/check-out-icon.png")}
                                    title="Check Out"
                                    time="07: 00 PM"
                                    description="Go Home"
                                />
                                <AttendanceItem
                                    icon={require("../../assets/icons/breaktime-icon.png")}
                                    title="Break Time"
                                    time="00: 30 min"
                                    description="Avg Time 30 min"
                                />
                                <AttendanceItem
                                    icon={require("../../assets/icons/calendar-icon.png")}
                                    title="Total Days"
                                    time="28"
                                    description="Working Days"
                                />
                            </View>
                        </View>

                        <View style={styles.contentSection}>
                            <View style={styles.contentHeaderWrapper}>
                                <Text style={styles.contentHeader}>
                                    Hoạt động cá nhân
                                </Text>
                                <CustomLink
                                    label="Xem tất cả"
                                    destination=""
                                />
                            </View>
                            
                            <View style={styles.activityGroup}>
                                <ActivityItem
                                    icon={require("../../assets/icons/check-in-icon.png")}
                                    title="Check in"
                                    time="10:00 AM"
                                    date="April 17, 2023"
                                    description="On Time"
                                />
                                <ActivityItem
                                    icon={require("../../assets/icons/breaktime-icon.png")}
                                    title="Break In"
                                    time="12:30 AM"
                                    date="April 17, 2023"
                                    description="On Time"
                                />
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
            <AttendanceSwiper
                checkType={checkType}
                onComplete={handleCheckedIn}
            />
            <BottomNavBar activeTab={activeTab} onTabPress={setActiveTab} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        width: '100%',
        height: '100%',
        paddingVertical: 50,
    },
    content: {
        paddingTop: 30,
    },
    userWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    userInfoWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
    userAvatar: {
        width: 60,
        height: 60,
        borderRadius: 60,
        borderWidth: 1
    },
    userInfo: {
        flexDirection: 'column',
        gap: 5,
    },
    userName: {
        fontSize: 20,
        fontWeight: 600
    },
    userPosition: {
        fontSize: 18,
    },
    userNotiWrapper: {
        width: 50,
        height: 50,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: Colors.light_500,
        padding: 10
    },
    userNoti: {
        width: '100%',
        height: '100%',
    },
    scrollContent: {
        flexDirection: 'row',
        gap: 15,
        paddingVertical: 30,
        paddingHorizontal: 20,
    },
    attendanceContent: {
        backgroundColor: Colors.gray_10p,
        paddingTop: 30,
        paddingBottom: 170,
        paddingHorizontal: 20,
        flexDirection: 'column',
        gap: 30,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25
    },
    attendanceGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 20
    },
    activityGroup: {
        flexDirection: 'column',
        gap: 10,
    },
    contentHeaderWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 25
    },
    contentHeader: {
        fontSize: 16,
        fontWeight: 600,
    }
});

export default HomePage;