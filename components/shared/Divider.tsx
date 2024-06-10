import DesignSystem from '@/constants/DesignSystem';
import { StyleSheet, Text, View } from 'react-native';

type Divider = {
  title?: string;
  mode: 'default' | 'line' | 'bottom';
  center?: boolean;
};
export default function Divider({
  title,
  mode = 'default',
  center = true
}: Divider) {
  if (mode === 'line') {
    return (
      <View style={center ? styles.containerHorizontal : null}>
        <View style={styles.lineHorizontal} />
      </View>
    );
  } else if (mode === 'bottom') {
    return (
      <View
        style={{
          borderBottomColor: '#FFD3BA',
          borderBottomWidth: 1,
          flex: 1
        }}
      />
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.lineStyle} />
      <Text style={styles.textStyle}>{title}</Text>
      <View style={styles.lineStyle} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: DesignSystem.spacing.rekka_spacing_4x
  },

  lineStyle: {
    width: '42%',
    height: 1,
    backgroundColor: DesignSystem.colors.border.decorative
  },

  containerHorizontal: {
    paddingHorizontal: DesignSystem.spacing.rekka_spacing_4x
  },

  lineHorizontal: {
    height: 1,
    backgroundColor: DesignSystem.colors.border.decorative
  },
  textStyle: {
    ...DesignSystem.body[300],
    color: DesignSystem.colors.content.primary
  }
});
