import React from "react";
import { Image, StyleSheet, View, Text, TouchableOpacity, ScrollView } from "react-native";
import Colors from "../constants/colors";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import { CommonActions, useNavigation } from "@react-navigation/native";
const TermsAndConditions = () => {
    const navigation = useNavigation();
    
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
    
    return (
        <View style={styles.container}>
            <View style={styles.navbar}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image
                        style={styles.icon}
                        source={require("../../assets/icons/arrow-left.png")}
                    />
                </TouchableOpacity>
                <Text style={styles.navbarTitle}>
                    Điều khoản & Bảo mật
                </Text>
                <View style={styles.iconSpacer} />
            </View>
            
            <ScrollView style={styles.scrollView}>
                <View style={styles.content}>
                    <View style={styles.rowWrapper}>
                        <View style={styles.row}>
                            <Text style={styles.update}>
                                Cập nhật lần cuối: 05/02/2023
                            </Text>
                            <Text style={styles.termContent}>
                                Hãy đọc kỹ
                            </Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.termTitle}>
                                Điều khoản người dùng
                            </Text>
                            <Text style={styles.termContent}>
                                Việc người đọc bị phân tâm bởi nội dung dễ đọc của một trang khi xem xét bố cục của nó là một sự thật đã được công nhận từ lâu. Mục đích của việc sử dụng Lorem Ipsum là để nó có sự phân bố các chữ cái gần như bình thường, trái ngược với việc sử dụng 'Content here, content here' (Nội dung ở đây, nội dung ở đây), khiến nó trông giống như tiếng Anh dễ đọc. Nhiều gói xuất bản trên máy tính để bàn và trình chỉnh sửa trang web hiện sử dụng Lorem Ipsum làm văn bản mẫu mặc định, và việc tìm kiếm 'lorem ipsum' sẽ khám phá ra nhiều trang web vẫn còn đang trong giai đoạn sơ khai. Nhiều phiên bản khác nhau đã phát triển qua nhiều năm, đôi khi do tình cờ, đôi khi là có chủ đích (chèn thêm yếu tố hài hước và những thứ tương tự).
                            </Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.termTitle}>
                                Chính sách bảo mật
                            </Text>
                            <Text style={styles.termContent}>
                                Việc người đọc bị phân tâm bởi nội dung dễ đọc của một trang khi xem xét bố cục của nó là một sự thật đã được công nhận từ lâu. Mục đích của việc sử dụng Lorem Ipsum là để nó có sự phân bố các chữ cái gần như bình thường, trái ngược với việc sử dụng 'Content here, content here' (Nội dung ở đây, nội dung ở đây), khiến nó trông giống như tiếng Anh dễ đọc. Nhiều gói xuất bản trên máy tính để bàn và trình chỉnh sửa trang web hiện sử dụng Lorem Ipsum làm văn bản mẫu mặc định, và việc tìm kiếm 'lorem ipsum' sẽ khám phá ra nhiều trang web vẫn còn đang trong giai đoạn sơ khai. Nhiều phiên bản khác nhau đã phát triển qua nhiều năm, đôi khi do tình cờ, đôi khi là có chủ đích (chèn thêm yếu tố hài hước và những thứ tương tự).
                            </Text>
                        </View>
                        
                    </View>
                </View>
            </ScrollView>
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
    navbar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    navbarTitle: {
        fontSize: 18,
        fontWeight: 600,
        textAlign: 'center',
        flex: 1
    },
    iconSpacer: {
        width: 20,
        height: 50,
    },
    scrollView: {
        flex: 1,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        paddingVertical: 20
    },
    icon: {
        width: 20,
        height: 50,
        padding: 0,
    },
    rowWrapper: {
        flexDirection: 'column',
        gap: 20
    },
    row: {
        flexDirection: 'column',
        gap: 10
    },
    update: {
        color: Colors.gray_500,
        fontSize: 16,
    },
    termTitle: {
        color: Colors.primary_500,
        fontSize: 20,
        fontWeight: 600
    },
    termContent: {
        fontSize: 18,
        lineHeight: 28
    }
});

export default TermsAndConditions;