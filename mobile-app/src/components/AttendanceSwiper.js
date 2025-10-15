import React, { useState, useRef, useEffect } from "react";
import { Animated, Image, PanResponder, StyleSheet, View, Text } from "react-native";
import Colors from "../constants/colors";

const AttendanceSwiper = ({ checkType = "CheckIn", onComplete }) => {
  const [completed, setCompleted] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);
  const translateX = useRef(new Animated.Value(0)).current;
  const maxSlide = Math.max(containerWidth - 55, 0);

  const isCheckIn = checkType === "CheckIn";
  const activeColor = isCheckIn ? Colors.primary_90p : Colors.tertiary_90p;
  const completeColor = isCheckIn ? Colors.primary_90p : Colors.tertiary_90p;
  const text = completed
    ? isCheckIn
      ? "Đã điểm danh!"
      : "Đã kết thúc giờ làm"
    : isCheckIn
    ? "Trượt để điểm danh"
    : "Trượt để kết thúc giờ làm";

  useEffect(() => {
    setCompleted(false);
    translateX.setValue(0);
  }, [checkType]);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, g) => !completed && Math.abs(g.dx) > 5,
      onPanResponderMove: Animated.event([null, { dx: translateX }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: (_, g) => {
        if (g.dx > maxSlide * 0.75) {
          Animated.timing(translateX, {
            toValue: maxSlide,
            duration: 200,
            useNativeDriver: false,
          }).start(() => {
            setCompleted(true);
            onComplete && onComplete();
          });
        } else {
          Animated.spring(translateX, {
            toValue: 0,
            useNativeDriver: false,
          }).start();
        }
      },
    })
  ).current;
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.swipeContainer,
          { backgroundColor: completed ? completeColor : activeColor },
        ]}
        onLayout={(e) => setContainerWidth(e.nativeEvent.layout.width)}
      >
        <Text style={styles.text}>{text}</Text>

        {!completed && containerWidth > 0 && (
          <Animated.View
            style={[
              styles.iconContainer,
              {
                transform: [
                  {
                    translateX: translateX.interpolate({
                      inputRange: [0, maxSlide],
                      outputRange: [0, maxSlide],
                      extrapolate: "clamp",
                    }),
                  },
                ],
              },
            ]}
            {...panResponder.panHandlers}
          >
            <Image
              source={require("../../assets/icons/arrow-swipe-right.png")}
              resizeMode="contain"
              style={styles.icon}
            />
          </Animated.View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 135,
    left: 20,
    right: 20,
    alignItems: "center",
  },
  swipeContainer: {
    width: "100%",
    height: 55,
    borderRadius: 10,
    justifyContent: "center",
    overflow: "hidden",
  },
  text: {
    color: Colors.white_500,
    fontSize: 16,
    textAlign: "center",
  },
  iconContainer: {
    position: "absolute",
    left: 5,
    top: 7,
    width: 42,
    height: 42,
    borderRadius: 10,
    backgroundColor: Colors.white_500,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: { width: 25 },
});

export default AttendanceSwiper;
