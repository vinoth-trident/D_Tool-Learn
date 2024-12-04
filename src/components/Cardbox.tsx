import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { CardColor } from "../styles/CommonStyle";
import AnimatedNumber from "./AnimatedNumber";

type CardBoxType = {
  bgColor?: string;
  title?: string;
  value?: number;
  isFullWidth?: boolean;
};

const Cardbox: React.FC<CardBoxType> = ({
  bgColor,
  title,
  value,
  isFullWidth,
}): JSX.Element => {
  return (
    <View
      style={[
        styles?.container,
        { backgroundColor: bgColor ?? CardColor.mutedGray },
        isFullWidth && styles.fullWidthCard,
      ]}
    >
      <AnimatedNumber
        value={value || 0}
        duration={1500}
        style={{ color: "white" }}
      />
      <Text style={{ color: "white", fontSize: 14 }}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 100,
    width: `${95 / 3}%`,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  fullWidthCard: {
    flex: 1,
    marginHorizontal: 5,
    width: "100%",
  },
});

export default Cardbox;
