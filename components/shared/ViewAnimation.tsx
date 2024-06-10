import { MotiView } from "moti";
import { ReactNode } from "react";
import { StyleProp, ViewStyle } from "react-native";

type ViewAnimation = {
  children: ReactNode;
  fromOpacity?: number;
  fromTranslateY?: number;
  fromTranslateX?: number;
  animateOpacity?: number;
  animateTranslateY?: number;
  delay?: number;
  style?: StyleProp<ViewStyle>;
};

export default function ViewAnimation({
  children,
  fromOpacity,
  fromTranslateY,
  fromTranslateX,
  animateOpacity,
  animateTranslateY,
  delay,
  style,
}: ViewAnimation) {
  return (
    <MotiView
      from={{
        opacity: fromOpacity || 0,
        translateY: fromTranslateY || 50,
        translateX: fromTranslateX,
      }}
      animate={{
        opacity: animateOpacity || 1,
        translateY: animateTranslateY || 0,
      }}
      transition={{ delay: delay || 300 }}
      style={style}
    >
      {children}
    </MotiView>
  );
}
