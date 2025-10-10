import React, { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import Colors from "../constants/colors";
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";
import CustomLink from "../components/CustomLink";
import Checkbox from 'expo-checkbox';
import { CommonActions, useNavigation } from "@react-navigation/native";

const RegisterScreen = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [accepted, setAccepted] = useState(false);
    const handleRegister = () => {
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [
                    {name: 'Login'},
                ],
            })
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Đăng ký tài khoản <Text style={styles.appName}>QL-Nhân Sự</Text></Text>
                <Text style={styles.subtitle}>Xin chào, đăng ký tài khoản để tiếp tục</Text>
            </View>
            <View style={styles.inputWrapper}>
                <CustomInput
                label="Họ và tên"
                placeholder="Nhập họ tên"
                />
                <CustomInput
                label="Địa chỉ email"
                placeholder="Nhập địa chỉ email"
                />
                <CustomInput
                    label="Mật khẩu"
                    placeholder="Nhập mật khẩu"
                    isPassword={true}
                />
                <CustomInput
                    label="Xác nhận mật khẩu"
                    placeholder="Nhập lại mật khẩu"
                    isPassword={true}
                />
            </View>
            <View style={styles.termWrapper}>
                <Checkbox
                    style={styles.checkbox}
                    value={accepted}
                    onValueChange={setAccepted}
                    color={accepted ? Colors.primary_500 : undefined}
                />
                <View style={styles.termTextGroup}> 
                    <Text style={styles.termText}>Tôi đồng ý với</Text>
                    <CustomLink
                        label="Điều khoản & Bảo mật"
                        destination="TermsAndConditions"
                    />
                </View>
            </View>
            <CustomButton title="Đăng ký" type="primary" onPress={handleRegister} />
            <View style={styles.linkLogin}>
                <Text style={{fontSize: 15}}>Đã có tài khoản?</Text>
                <CustomLink
                    label="Đăng nhập"
                    destination="Login"
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
    linkLogin: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 30,
        gap: 3
    },
    termWrapper: {
        flexDirection: 'row', 
        alignItems: 'center',
        gap: 10,
        marginTop: 15,
    },
    checkbox: {
        borderRadius: 3,
        borderColor: Colors.light_500
    },
    termTextGroup: { 
        flexDirection: 'row',
        alignItems: 'flex-end',
        gap: 5
    },
    termText: { 
        fontSize: 15,
    },
});

export default RegisterScreen;