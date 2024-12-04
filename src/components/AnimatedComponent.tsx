import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, ViewStyle } from "react-native";

interface AnimatedComponentProps {
  animationType: "fade" | "slide" | "zoom"; // Choose between 'fade', 'slide', or 'zoom'
  direction?: "left" | "right" | "top" | "bottom"; // Direction for slide animation
  duration?: number; // Duration of the animation
  delay?: number; // delay before starting the animation (in milliseconds)
  visible?: boolean; // If true, shows the component; if false, hides it
  children: React.ReactNode;
  style?: ViewStyle; // Custom styles for the container (optional)
}

const AnimatedView = ({
  style,
  animationType,
  direction = "top", // Default direction is 'top'
  duration = 800,
  delay = 0, // Default delay is 0 (no delay)
  visible = false, // Control visibility
  children,
}: AnimatedComponentProps) => {
  const animationValue = useRef(new Animated.Value(0)).current; // Initial animation value

  useEffect(() => {
    // Delay the animation if delay is provided
    const timeoutId = setTimeout(() => {
      const animations: Animated.CompositeAnimation[] = [];

      // Handle animation based on visible state (show or hide)
      if (animationType === "fade") {
        animations.push(
          Animated.timing(animationValue, {
            toValue: visible ? 1 : 0, // Fade in or fade out
            duration,
            useNativeDriver: true,
          })
        );
      } else if (animationType === "slide") {
        let offset = 0;

        // Slide offset based on direction
        if (direction === "left") {
          offset = visible ? -300 : -400; // Slide in from left or slide out to left
        } else if (direction === "right") {
          offset = visible ? 300 : 400; // Slide in from right or slide out to right
        } else if (direction === "top") {
          offset = visible ? -300 : -400; // Slide in from top or slide out to top
        } else if (direction === "bottom") {
          offset = visible ? 300 : 400; // Slide in from bottom or slide out to bottom
        }

        // Set the initial value based on the offset (visible or not)
        animationValue.setValue(visible ? offset : 0);

        animations.push(
          Animated.timing(animationValue, {
            toValue: visible ? 0 : offset, // Slide to position or out of view (reverse direction)
            duration,
            useNativeDriver: true,
          })
        );
      } else if (animationType === "zoom") {
        animations.push(
          Animated.spring(animationValue, {
            toValue: visible ? 1 : 0, // Zoom in or zoom out
            duration,
            useNativeDriver: true,
          })
        );
      }

      Animated.sequence(animations).start();
    }, delay); // Timeout before starting the animation

    // Clean up the delay when component unmounts
    return () => clearTimeout(timeoutId);
  }, [animationType, direction, duration, delay, visible]);

  // Determine the animated style based on the animation type
  const animatedStyle = {
    opacity: animationType === "fade" ? animationValue : 1,
    transform: [
      {
        translateX:
          animationType === "slide" &&
          (direction === "left" || direction === "right")
            ? animationValue
            : 0,
      },
      {
        translateY:
          animationType === "slide" &&
          (direction === "top" || direction === "bottom")
            ? animationValue
            : 0,
      },
      {
        scale: animationType === "zoom" ? animationValue : 1,
      },
    ],
  };

  return (
    <Animated.View style={[{ backgroundColor: "" }, animatedStyle, style]}>
      {children}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  zoomedText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#891818", // Dark red color for zoom animation text
  },
  slideText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },
  fadeText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
});

export default AnimatedView;
