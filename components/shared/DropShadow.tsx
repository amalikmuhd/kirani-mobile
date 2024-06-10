import { ReactNode } from 'react';
import { DimensionValue, StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';

type AppInput = {
  left: number;
  bottom: number;
  right: number;
  top: number;
  children: ReactNode;
  width?: DimensionValue;
};

function DropShadow({
  left,
  bottom,
  right,
  top,
  children,
  width = '100%'
}: AppInput) {
  return (
    <Animated.View
      style={{
        ...styles.dropShadow,
        shadowOffset: { width: 0, height: -top },
        width: width
      }}
    >
      <Animated.View
        style={{
          ...styles.dropShadow,
          shadowOffset: { width: right, height: 0 }
        }}
      >
        <Animated.View
          style={{
            ...styles.dropShadow,
            shadowOffset: { width: -left, height: 0 }
          }}
        >
          <Animated.View
            style={{
              ...styles.dropShadow,
              shadowOffset: { width: 0, height: bottom }
            }}
          >
            {children}
          </Animated.View>
        </Animated.View>
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  dropShadow: {
    shadowColor: 'rgba(255, 211, 186, 0.64)',
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 4,
    shadowRadius: 0.2,
    elevation: 2
  }
});
export default DropShadow;
