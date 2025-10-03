import React, { useState } from "react";
import { Image, StyleSheet, View, Text, TouchableOpacity, Modal } from "react-native";
import Colors from "../constants/colors";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import { CommonActions, useNavigation } from "@react-navigation/native";
const ResetPassword = () => {
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);
    const navigateToLoginAndReset = () => {
        setModalVisible(false);
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [
                    {name: 'Login'},
                ],
            })
        );
    };

    const handleResetPassword = () => {
        setModalVisible(true);
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
                        Thay đổi mật khẩu
                    </Text>
                    <Text style={styles.subtitle}>
                        Vui lòng nhập mật khẩu mới
                    </Text>
                </View>
                <Image
                    style={styles.image}
                    source={require("../../assets/images/reset-password-image.png")}
                    resizeMode="contain"
                />
                <View style={{flexDirection: 'column', gap: 20}}>
                    <CustomInput 
                        label="Mật khẩu mới"
                        placeholder="Nhập mật khẩu mới"
                        isPassword={true}
                    />
                    <CustomInput 
                        label="Nhập lại mật khẩu"
                        placeholder="Nhập lại mật khẩu"
                        isPassword={true}
                    />
                </View>
                
                <CustomButton 
                    title="Hoàn tất" 
                    type="primary"
                    onPress={handleResetPassword}
                />
            </View>

            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(false);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Image
                            style={styles.modalIcon}
                            source={require("../../assets/images/succeeded-image.png")}
                        />
                        <Text style={styles.modalTitle}>Thành công!</Text>
                        <Text style={styles.modalText}>Mật khẩu của bạn đã được thành đổi thành công!</Text>
                        <CustomButton 
                            title="Quay về đăng nhập"
                            type="primary"
                            onPress={navigateToLoginAndReset}
                        />
                    </View>
                </View>
            </Modal>
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
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.dark_90p
    },
    modalView: {
        margin: 20,
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: Colors.dark_500,
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '85%'
    },
    modalIcon: {
        width: 100,
        height: 100,
        marginBottom: 20,
    },
    modalTitle: {
        marginBottom: 10,
        textAlign: 'center',
        fontSize: 22,
        fontWeight: 600,
        color: Colors.primary_500,
    },
    modalText: {
        textAlign: 'center',
        fontSize: 16,
        color: Colors.gray_500
    }
});

export default ResetPassword;