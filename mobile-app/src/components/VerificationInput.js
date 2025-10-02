import React, { useRef, useState } from "react";
import Colors from "../constants/colors";

const VerificationInput = ({length = 4, onChange}) => {
    const [value, setValues] = useState(Array(length).fill(""));
    const inputsRef = useRef([]);

    const handleChange = (text, index) => {
        if (text.length > 1) {
            const newValues = text.split("").slice(0, length);
            setValues(newValues);
            onChange && onChange(newValues.join(""));
            return;
        }

        const newValues = [...value];
        newValues[index] = text;
        setValues(newValues);
        onChange && onChange(newValues.join(""));

        if (text && index < length - 1) {
            inputsRef.current[index + 1].focus();
        }
    };

    const handleKeyPress = ({nativeEvent}, index) => {
        if (nativeEvent.key === "Backspace" && !value[index] && index > 0) {
            inputsRef.current[index - 1].focus();
        }
    };
}