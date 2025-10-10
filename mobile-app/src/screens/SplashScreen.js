import React, { useEffect } from "react";
import { Image, StyleSheet, View } from "react-native";

const SplashScreen = ({navigation}) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.replace('Login');
        }, 2000);
        return () => clearTimeout(timer);
    }, [navigation]);

    return (
        <View style={styles.container}>
            <Image 
                source={require('../../assets/splash-image.png')}
                style={styles.logo}
                resizeMode="cover"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    logo: {
        width: '100%',
        height: '100%'
    }
});

export default SplashScreen;