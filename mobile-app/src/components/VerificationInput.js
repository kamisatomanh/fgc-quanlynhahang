import React, { useEffect, useRef, useState } from "react";
import Colors from "../constants/colors";
import { StyleSheet, Text, TextInput, View, Pressable } from "react-native";

const TIMER_START = 30;

const VerificationInput = ({length = 4, onChange}) => {
    const [values, setValues] = useState(Array(length).fill(""));
    const inputsRef = useRef([]);
    const [timer, setTimer] = useState(TIMER_START);
    const [canResend, setCanResend] = useState(false);
    
    const handleChange = (text, index) => {
        if (text.length > 1) {
            const newValues = text.split("").slice(0, length);
            setValues(newValues);
            onChange && onChange(newValues.join(""));
            return;
        }

        const newValues = [...values];
        newValues[index] = text;
        setValues(newValues);
        onChange && onChange(newValues.join(""));

        if (text && index < length - 1) {
            inputsRef.current[index + 1].focus();
        }
    };

    const handleKeyPress = ({nativeEvent}, index) => {
        if (nativeEvent.key === "Backspace" && !values[index] && index > 0) {
            inputsRef.current[index - 1].focus();
        }
    };

    const handleResendCode = () => {
        setCanResend(false);
        setTimer(TIMER_START);
    };

    useEffect(() => {
        let interval;

        if (timer > 0) {
            interval = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);
        } else if (timer === 0) {
            setCanResend(true);
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [timer]);

    const formatTime = (time) => {
        const seconds = time % 60;
        return `00:${seconds < 10 ? '0' : ''}${seconds}`;
    };
    return (
        <View>
            <View style={styles.container}>
                {Array(length).fill(0).map((_, i) => (
                    <TextInput
                        key={i}
                        ref={(ref) => (inputsRef.current[i] = ref)}
                        style={styles.input}
                        keyboardType="number-pad"
                        maxLength={1}
                        value={values[i]}
                        onChangeText={(text) => handleChange(text, i)}
                        onKeyPress={(e) => handleKeyPress(e, i)}
                        returnKeyType="done"
                    />
                ))}
            </View>
            <View style={styles.resend}>
                <Text style={styles.timer}>{formatTime(timer)}</Text>
                <Pressable
                    onPress={handleResendCode}
                    disabled={!canResend}
                >
                    <Text 
                        style={[styles.resendButton,
                        !canResend && styles.resendButtonDisable
                        ]}>
                        Gửi lại
                    </Text>
                </Pressable>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    input: {
        width: 80,
        height: 80,
        borderWidth: 1,
        borderColor: Colors.light_500,
        borderRadius: 8,
        textAlign: "center",
        fontSize: 25,
        color: Colors.dark_500,
        backgroundColor: Colors.white_500,
    },
    resend: {
        flexDirection: 'row',
        alignSelf: 'flex-end',
        gap: 5,
        marginTop: 10
    },
    timer: {
        fontSize: 16,
    },
    resendButton: {
        fontSize: 16,
        color: Colors.primary_500,
    },
    resendButtonDisable: {
        color: Colors.gray_500
    },
});

export default VerificationInput;