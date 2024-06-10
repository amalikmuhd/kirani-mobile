import DesignSystem, { Typography } from '@/constants/DesignSystem';
import {
  ColorValue,
  GestureResponderEvent,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle
} from 'react-native';

type AppText = {
  title: string | undefined;
  style?: StyleProp<TextStyle>;
  color?: ColorValue;
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
};

export default function AppText({ title, style, color, onPress }: AppText) {
  return (
    <Text
      onPress={onPress}
      style={[
        styles.textStyle,
        { color: color || DesignSystem.colors.content.secondary },
        style
      ]}
    >
      {title}
    </Text>
  );
}

const styles = StyleSheet.create({
  textStyle: {
    ...Typography.body.default
  }
});
