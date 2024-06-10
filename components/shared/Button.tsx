/* eslint-disable react/jsx-no-undef */
import DesignSystem, { Typography } from '@/constants/DesignSystem';
import { ReactNode } from 'react';

import {
  Pressable,
  Keyboard,
  DimensionValue,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  ImageSourcePropType,
  StyleProp,
  TextStyle,
  ImageStyle,
  ViewStyle,
  ActivityIndicator,
  View
} from 'react-native';
import DropShadow from './DropShadow';
import React from 'react';

type AppButton = {
  title: string;
  titleColor?: string;
  marginTop?: number;
  onPress: () => void;
  disabled?: boolean;
  width?: DimensionValue;
  height?: DimensionValue;
  containerWidth?: DimensionValue;
  loading?: boolean;
  paddingHorizontal?: number;
  paddingVertical?: number;
};

const Button = ({
  title,
  titleColor,
  marginTop,
  onPress,
  disabled,
  width,
  loading,
  containerWidth,
  paddingHorizontal,
  paddingVertical,
  height
}: AppButton) => {
  const [isFocus, setIsFocus] = React.useState(false);
  const [isPressed, setIsPressed] = React.useState(false);

  React.useEffect(() => {
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
    <DropShadow
      width={containerWidth}
      top={isFocus || isPressed || loading ? 2 : 0}
      right={isFocus || isPressed || loading ? 2 : 0}
      bottom={isFocus || isPressed || loading ? 2 : 0}
      left={isFocus || isPressed || loading ? 2 : 0}
    >
      <Pressable
        disabled={disabled}
        onBlur={() => setIsFocus(false)}
        onFocus={() => setIsFocus(true)}
        onPressIn={() => setIsPressed(true)}
        onPressOut={() => setIsPressed(false)}
        style={{
          ...styles.button,
          backgroundColor: disabled
            ? DesignSystem.colors.turquoise.main
            : DesignSystem.colors.turquoise.main,
          opacity: disabled ? 0.6 : 1,
          marginTop: marginTop ?? 0,
          width: width ?? '100%',
          borderWidth: isFocus || isPressed ? 1 : 0,
          height: height ?? 56,
          borderColor:
            isFocus || isPressed
              ? DesignSystem.colors.border.focus
              : DesignSystem.colors.turquoise.main,
          paddingHorizontal:
            paddingHorizontal ?? DesignSystem.spacing.rekka_spacing_4x,
          paddingVertical:
            paddingVertical ?? DesignSystem.spacing.rekka_spacing_3x
        }}
        onPress={onPress}
      >
        {loading ? (
          <ActivityIndicator
            size={'small'}
            color={DesignSystem.colors.content.primary}
          />
        ) : (
          <Text
            style={{
              ...styles.text,
              color: titleColor ?? DesignSystem.colors.content.primary_onColor
            }}
          >
            {title}
          </Text>
        )}
      </Pressable>
    </DropShadow>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: DesignSystem.borderRadius.rekka_border_radius_300,
    justifyContent: 'center',
    alignItems: 'center'
  },

  text: {
    ...DesignSystem.body['300_bold']
  }
});

type OutlinedButton = {
  label?: string;
  leadingIcon?: ImageSourcePropType;
  icon?: ReactNode;
  onPress?: () => void;
  onPressIn?: () => void;
  onPressOut?: () => void;
  width?: string;
  titleColor?: string;
  borderWidth?: number;
  borderColor?: string | false | null | undefined;
  height?: number;
  backgroundColor?: string | false | null | undefined;
  justifyContent?: boolean;
  leadingComponent?: ReactNode;
  marginBottom?: number;
  textStyle?: StyleProp<TextStyle>;
  newIconStyle?: StyleProp<ImageStyle>;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
};

const OutlinedButton = ({
  label,
  onPress,
  borderWidth,
  titleColor,
  backgroundColor,
  borderColor,
  textStyle,
  loading,
  icon,
  style,
  onPressIn,
  onPressOut
}: OutlinedButton) => {
  return (
    <Pressable
      disabled={loading}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      style={[
        styles2.button,
        {
          borderWidth:
            borderWidth || DesignSystem.borderWidth.rekka_border_width_100,
          backgroundColor:
            backgroundColor || DesignSystem.colors.background.blur,
          borderColor: borderColor || DesignSystem.colors.border.decorative
        },
        style
      ]}
      onPress={onPress}
    >
      {icon && icon}
      {label && (
        <Text
          style={[
            styles2.text,
            { color: titleColor || DesignSystem.colors.content.primary },
            textStyle
          ]}
        >
          {label}
        </Text>
      )}
    </Pressable>
  );
};

const styles2 = StyleSheet.create({
  button: {
    borderRadius: DesignSystem.borderRadius.rekka_border_radius_300,
    gap: DesignSystem.spacing.rekka_spacing_3x,
    paddingVertical: DesignSystem.spacing.rekka_spacing_2x,
    paddingHorizontal: DesignSystem.spacing.rekka_spacing_3x
  },

  text: {
    ...Typography.body.bold,
    color: DesignSystem.colors.content.primary
  }
});

type OutlineButton = {
  placeholder: string;
  leadingIcon?: ImageSourcePropType;
  trailingIcon?: string;
  onPress: () => void;
  width?: string;
  titleColor?: string;
  borderWidth?: number;
  borderColor?: string | false | null | undefined;
  height?: number;
  backgroundColor?: string | false | null | undefined;
  justifyContent?: boolean;
  leadingComponent?: ReactNode;
  marginBottom?: number;
  textStyle?: StyleProp<TextStyle>;
  newIconStyle?: StyleProp<ImageStyle>;
  loading?: boolean;
};

const OutlineButton = ({
  leadingIcon,
  placeholder,
  trailingIcon,
  onPress,
  width,
  borderWidth,
  titleColor,
  backgroundColor,
  justifyContent,
  leadingComponent,
  borderColor,
  marginBottom,
  textStyle,
  newIconStyle,
  loading
}: OutlineButton) => {
  return (
    <TouchableOpacity
      disabled={loading}
      style={[
        styles3.button,
        {
          width: width || '100%',
          borderWidth:
            borderWidth || DesignSystem.borderWidth.rekka_border_width_100,
          backgroundColor:
            backgroundColor || DesignSystem.colors.background.blur,
          justifyContent: justifyContent ? 'flex-start' : 'center',
          paddingLeft: justifyContent ? 20 : 0,
          borderColor: borderColor || DesignSystem.colors.border.decorative,
          marginBottom: marginBottom || 0
        }
      ]}
      onPress={onPress}
    >
      {loading ? (
        <ActivityIndicator
          size={'small'}
          color={DesignSystem.colors.content.primary}
        />
      ) : (
        <View style={styles3.container}>
          {leadingComponent && leadingComponent}
          {leadingIcon && (
            <Image
              source={leadingIcon}
              style={[styles3.iconStyle, newIconStyle]}
            />
          )}
          <Text
            style={[
              styles3.text,
              { color: titleColor || DesignSystem.colors.content.primary },
              textStyle
            ]}
          >
            {placeholder}
          </Text>
          {trailingIcon && (
            <Image src={trailingIcon} style={styles3.iconStyle} />
          )}
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles3 = StyleSheet.create({
  button: {
    borderRadius: DesignSystem.borderRadius.rekka_border_radius_300,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: DesignSystem.spacing.rekka_spacing_3x,
    alignItems: 'center',
    padding: DesignSystem.spacing.rekka_spacing_4x
  },

  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    alignItems: 'center'
  },
  iconStyle: {
    marginLeft: 16,
    width: 16,
    height: 16,
    resizeMode: 'contain'
  },

  text: {
    ...DesignSystem.body['300_bold'],
    color: DesignSystem.colors.content.primary
  }
});

export default Button;
export { OutlinedButton, OutlineButton };
