import React, { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import Colors from "../constants/colors";
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";
const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Xin chào bạn đến <Text style={styles.appName}>QL-Nhân Sự</Text></Text>
            <CustomInput
                label="Địa chỉ email"
                placeholder="Nhập địa chỉ email"
            />
            <CustomInput
                label="Mật khẩu"
                placeholder="Nhập mật khẩu"
                isPassword={true}
            />
            <CustomButton title="Đăng nhập" type="primary" onPress={handleLogin} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#fff'
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20,
        width: 250
    },
    appName: {
        color: Colors.primary_500,
    },
    input: {
        borderWidth: 1,
        borderColor: '#aaa',
        padding: 10,
        borderRadius: 8,
        marginBottom: 10,
    },
});

export default LoginScreen;