import React from "react";
import { Image, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import Colors from "../constants/colors";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import VerificationInput from "../components/VerificationInput";
const Verification = () => {
    const navigation = useNavigation();
    const handleCodeChange = (code) => {
        if (code.length === 4) {

        }
    }
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
                        Nhập mã xác thực
                    </Text>
                    <Text style={styles.subtitle}>
                        Hệ thống đã gửi mã xác thực đến địa chỉ email của bạn
                    </Text>
                </View>
                <Image
                    style={styles.image}
                    source={require("../../assets/images/verification-image.png")}
                    resizeMode="contain"
                />
                <VerificationInput
                    length={4}
                    onChange={handleCodeChange}
                />
                <CustomButton 
                    title="Xác nhận" 
                    type="primary"
                    onPress={() => navigation.navigate("ResetPassword")}
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

export default Verification;