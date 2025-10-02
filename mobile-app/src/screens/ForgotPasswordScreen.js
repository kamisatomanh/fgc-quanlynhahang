import React from "react";
import { Image, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import Colors from "../constants/colors";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
const ForgotPassword = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image
                    style={styles.icon}
                    source={require("../../assets/icons/arrow-left.png")}
                />
            </TouchableOpacity>
            <View style={styles.content}>
                <View style={styles.header}>
                    <Text style={styles.title}>
                        Quên mật khẩu
                    </Text>
                    <Text style={styles.subtitle}>
                        Vui lòng nhập địa chỉ email để nhận mã xác thực
                    </Text>
                </View>
                <Image
                    style={styles.image}
                    source={require("../../assets/images/forgot-password-image.png")}
                    resizeMode="contain"
                />
                <CustomInput 
                    label="Email"
                    placeholder="Nhập địa chỉ email"
                />
                <CustomButton 
                    title="Xác nhận" 
                    type="primary"
                    onPress={() => navigation.navigate("Verification")}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        width: '100%',
        height: '100%',
        paddingHorizontal: 20,
        paddingVertical: 50,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
    },
    icon: {
        width: 20,
        height: 50,
        padding: 0,
    },
    header: {
        
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        width: 250,
    },
    subtitle: {
        color: Colors.gray_500,
        fontSize: 15,
        marginTop: 5
    },
    image: {
        width: '100%',
        height: '40%',
        marginTop: 10,
        marginBottom: 25,
    }
});

export default ForgotPassword;