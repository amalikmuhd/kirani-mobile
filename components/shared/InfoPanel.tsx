import { StyleProp, StyleSheet, TextStyle } from "react-native";
import AppText from "./AppText";
import DesignSystem from "@/constants/DesignSystem";

type InfoPanel = {
  title?: string;
  subtitle?: string;
  marginBottom?: number;
  left?: boolean;
  newSubtitleStyle?: StyleProp<TextStyle>;
  titleStyle?: StyleProp<TextStyle>;
  center?: boolean;
};
export default function InfoPanel({
  title,
  subtitle,
  left,
  marginBottom,
  newSubtitleStyle,
  titleStyle,
  center,
}: InfoPanel) {
  return (
    <>
      {title && <AppText title={title} style={[styles.title, titleStyle, { textAlign: center ? "center" : "left" }]} />}

      {subtitle && (
        <AppText
          title={subtitle}
          style={[
            {
              textAlign: !left ? "center" : "left",
              marginBottom: marginBottom,
              ...DesignSystem.subtitle[300],
              color: DesignSystem.colors.content.secondary,
            },
            newSubtitleStyle,
          ]}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    ...DesignSystem.display[400],
    color: DesignSystem.colors.content.primary,
  },
});
