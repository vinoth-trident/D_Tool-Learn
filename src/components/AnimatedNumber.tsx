import React, { useEffect, useRef, useState } from "react";
import { Text, Animated, StyleSheet, TextStyle } from "react-native";

type AnimNumType = {
  value: number; // The target value to animate to
  duration?: number; // Optional duration for the animation
  style?: TextStyle; // Style applied to the Text component
};

const AnimatedNumber: React.FC<AnimNumType> = ({
  value,
  duration = 1000,
  style,
}) => {
  const animatedValue = useRef(new Animated.Value(0)).current; // Animated value reference
  const [displayValue, setDisplayValue] = useState(0); // State to show the current value

  useEffect(() => {
    // Animate the value to the target
    Animated.timing(animatedValue, {
      toValue: value,
      duration,
      useNativeDriver: false, // Can't use native driver for non-physical properties
    }).start();

    // Update displayValue as the animated value changes
    const listener = animatedValue.addListener(({ value }) => {
      setDisplayValue(Math.floor(value)); // Round down for whole numbers
    });

    // Cleanup the listener on unmount or value change
    return () => {
      animatedValue.removeListener(listener);
    };
  }, [value, duration]);

  return <Text style={[styles.text, style]}>{displayValue}</Text>;
};

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000", // Default color
  },
});

export default AnimatedNumber;
