import DesignSystem from '@/constants/DesignSystem';
import { Keyboard, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import Button, { OutlineButton } from '../shared/Button';
import { useEffect, useState } from 'react';

type BottomButtons = {
  outlineButtonOnPress: () => void;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  type?: boolean;
  outlineTitle?: string;
  title?: string;
  style?: StyleProp<ViewStyle>;
};
export default function BottomButtons({
  outlineButtonOnPress,
  onPress,
  loading,
  type,
  outlineTitle,
  title,
  disabled,
  style
}: BottomButtons) {
  const [isFocus, setIsFocus] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setIsFocus(true); // Change border color when keyboard is active
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setIsFocus(false); // Change border color to purple when keyboard is dismissed
      }
    );

    return () => {
      keyboardDidShowListener.remove(); // Remove listeners when component unmounts
      keyboardDidHideListener.remove();
    };
  }, []);
  return (
    <View
      style={[
        !type
          ? { flexDirection: 'row' }
          : {
              flexDirection: 'column-reverse',
              justifyContent: 'space-around'
            },
        styles.bottomButton,

        {
          ...DesignSystem.shadow.rekka_shadow_100,
          paddingBottom: isFocus ? 20 : 32
        },
        style
      ]}
    >
      <OutlineButton
        placeholder={outlineTitle || 'Remember your password? Login here'}
        onPress={outlineButtonOnPress}
        backgroundColor="transparent"
        width={!type ? '48%' : '100%'}
        titleColor={DesignSystem.colors.turquoise.main}
        borderWidth={0.1}
      />

      <Button
        disabled={disabled}
        loading={loading}
        title={title || 'Continue'}
        onPress={onPress}
        width={!type ? '48%' : '100%'}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  bottomButton: {
    borderTopLeftRadius: DesignSystem.borderRadius.rekka_border_radius_300,
    borderTopRightRadius: DesignSystem.borderRadius.rekka_border_radius_300,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20
  }
});
