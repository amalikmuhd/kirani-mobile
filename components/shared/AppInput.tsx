import { ReactNode, useState } from "react";
import { ColorValue, KeyboardTypeOptions, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Control, Controller, FieldValues, RegisterOptions } from "react-hook-form";
import DesignSystem, { Typography } from "@/constants/DesignSystem";
import { Feather } from "@expo/vector-icons";
import DropShadow from "./DropShadow";

type AppInputProps = {
  label: string;
  control: Control<FieldValues, unknown>;
  rules?: Omit<RegisterOptions<FieldValues, string>, "disabled" | "valueAsNumber" | "valueAsDate" | "setValueAs">;
  activeState?: boolean | ColorValue;
  name: string;
  placeholder?: string;
  marginTop?: number;
  leadingComponent?: ReactNode;
  trailingIcon?: boolean;
  keyboard: KeyboardTypeOptions;
  width?: number;
  height?: number | string;
  autoCapitalize?: "none" | "sentences" | "words" | "characters" | undefined;
  errorMessage?: string;
  onText?: (text: string) => void;
  multiline?: boolean;
  readValue?: string | undefined;
  numberOfLines?: number;
  maxLength?: number | undefined;
};

function AppInput({
  label,
  control,
  rules,
  name,
  placeholder,
  marginTop,
  trailingIcon,
  keyboard,
  activeState,
  width,
  autoCapitalize,
  onText,
  multiline,
  readValue,
  leadingComponent,
  numberOfLines,
  maxLength,
}: AppInputProps) {
  const [show, setShow] = useState(false);
  const [isFocus, setIsFocus] = useState(true);

  return (
    <View style={{ marginTop: marginTop || 0 }}>
      {label && <Text style={activeState ? styles.label : styles.labelDisabled}>{label}</Text>}
      <Controller
        control={control}
        name={name}
        // rules={rules}
        render={({ field: { onBlur, onChange, value }, fieldState: { error } }) => (
          <>
            <DropShadow
              top={!isFocus ? 4 : 0}
              right={!isFocus ? 4 : 0}
              bottom={!isFocus ? 4 : 0}
              left={!isFocus ? 4 : 0}
            >
              <View
                style={{
                  ...styles.container,
                  paddingRight: activeState ? 0 : 37,
                  backgroundColor: isFocus
                    ? DesignSystem.colors.background.elevation_1
                    : DesignSystem.colors.background.elevation_2,
                  borderColor: (error as never)
                    ? DesignSystem.colors.mariamPink.main
                    : isFocus
                    ? DesignSystem.colors.border.functional
                    : DesignSystem.colors.border.focus,
                  width: width,
                }}
              >
                {leadingComponent && leadingComponent}
                <TextInput
                  maxLength={maxLength}
                  numberOfLines={numberOfLines}
                  multiline={multiline}
                  autoCapitalize={autoCapitalize}
                  textContentType={"none"}
                  autoComplete={"off"}
                  autoCorrect={false}
                  placeholderTextColor={
                    activeState ? DesignSystem.colors.content.primary : DesignSystem.colors.content.tetiary
                  }
                  value={autoCapitalize === "none" ? value?.toLowerCase() : value || readValue}
                  onChangeText={(text) => {
                    onChange(text);
                    onText && onText(text);
                  }}
                  onBlur={() => {
                    onBlur();
                    setIsFocus(true);
                  }}
                  editable={activeState ? false : true}
                  placeholder={placeholder}
                  style={{
                    ...styles.input,
                    backgroundColor: (activeState as never) && DesignSystem.colors.background.elevation_alt,
                    color: DesignSystem.colors.content.primary,
                  }}
                  secureTextEntry={name === "password" || name === "confirm-password" ? !show : show}
                  keyboardType={keyboard}
                  onFocus={() => {
                    setIsFocus(false);
                  }}
                />

                {trailingIcon && (
                  <TouchableOpacity onPress={() => setShow(!show)}>
                    <Feather
                      name={show ? "eye" : "eye-off"}
                      size={DesignSystem.spacing.rekka_spacing_4x}
                      color={DesignSystem.colors.content.secondary}
                    />
                  </TouchableOpacity>
                )}
              </View>
            </DropShadow>
            {error && <Text style={styles.errorLabel}>{error.message}</Text>}
          </>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: DesignSystem.borderRadius.rekka_border_radius_300,
    borderWidth: DesignSystem.borderWidth.rekka_border_width_100,
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },

  label: {
    ...DesignSystem.body.basedMedium,
    color: DesignSystem.colors.content.primary,
    marginBottom: DesignSystem.spacing.rekka_spacing_1x,
  },
  labelDisabled: {
    ...DesignSystem.body.basedMedium,
    color: DesignSystem.colors.content.primary,
    marginBottom: DesignSystem.spacing.rekka_spacing_1x,
  },

  input: {
    width: "100%",
    borderRadius: DesignSystem.borderRadius.rekka_border_radius_300,
    paddingVertical: DesignSystem.spacing.rekka_spacing_3x,
    paddingHorizontal: DesignSystem.spacing.rekka_spacing_4x,
    ...Typography.body.default,
    lineHeight: 22,
  },

  errorLabel: {
    ...DesignSystem.body.smallMedium,
    marginTop: DesignSystem.spacing.rekka_spacing_2x,
    color: DesignSystem.colors.mariamPink.dark,
    alignSelf: "stretch",
  },
});
export default AppInput;
