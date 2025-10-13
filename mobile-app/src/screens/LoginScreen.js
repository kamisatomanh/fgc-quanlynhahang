import React, { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import Colors from "../constants/colors";
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";
import CustomLink from "../components/CustomLink";
import { CommonActions, useNavigation } from "@react-navigation/native";
const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();

    const handleLogin = () => {
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [
                    {name: 'HomePage'},
                ],
            })
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Xin chào bạn đến <Text style={styles.appName}>QL-Nhân Sự</Text></Text>
                <Text style={styles.subtitle}>Đăng nhập để tiếp tục sử dụng</Text>
            </View>
            <View style={styles.inputWrapper}>
                <CustomInput
                label="Địa chỉ email"
                placeholder="Nhập địa chỉ email"
                />
                <CustomInput
                    label="Mật khẩu"
                    placeholder="Nhập mật khẩu"
                    isPassword={true}
                />
            </View>
            <View style={styles.linkForgot}>
                <CustomLink 
                    label="Quên mật khẩu?"
                    destination="ForgotPassword"
                />
            </View>
            <CustomButton 
                title="Đăng nhập" 
                type="primary" 
                onPress={handleLogin} />
            <View style={styles.linkRegister}>
                <Text>Chưa có tài khoản?</Text>
                <CustomLink
                    label="Tạo tài khoản"
                    destination="Register"
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#fff'
    },
    header: {
        flexDirection: 'column',
        gap: 10,
        marginBottom: 20,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        width: 250,
    },
    appName: {
        color: Colors.primary_500,
    },
    subtitle: {
        color: Colors.gray_500,
        fontSize: 15
    },
    inputWrapper: {
        flexDirection: 'column',
        gap: 20,
    },
    linkForgot: {
        flexDirection: 'row-reverse',
        marginTop: 10
    },
    linkRegister: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 30,
        gap: 3
    }
});

export default LoginScreen;