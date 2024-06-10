import { StyleSheet, View } from "react-native";
import { ReactNode } from "react";
import DesignSystem from "@/constants/DesignSystem";

type Container = {
  isColor?: boolean;
  children: ReactNode;
  marginHorizontal?: number;
  marginTop?: number;
};

export default function Container({ children, isColor, marginHorizontal, marginTop }: Container) {
  return (
    <View
      style={[styles.container, isColor && styles.plainContainer, { marginHorizontal, marginTop: marginTop || 29 }]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  plainContainer: {
    ...DesignSystem.shadow.rekka_shadow_100,
    borderRadius: DesignSystem.borderRadius.rekka_border_radius_300,
    backgroundColor: DesignSystem.colors.rekkaBlack.pureWhite,
    padding: DesignSystem.spacing.rekka_spacing_4x,
  },

  container: {
    borderRadius: DesignSystem.borderRadius.rekka_border_radius_300,
    padding: DesignSystem.spacing.rekka_spacing_4x,
  },
});
