import { StyleSheet, View } from "react-native";
import DesignSystem from "@/constants/DesignSystem";
import { router, useLocalSearchParams } from "expo-router";
import AppInput from "@/components/shared/AppInput";
import Button from "@/components/shared/Button";
import { useForm } from "react-hook-form";
import validation from "@/utils/validation";
import { joiResolver } from "@hookform/resolvers/joi";
import { ISignIn } from "@/types";
import ViewAnimation from "@/components/shared/ViewAnimation";
import InfoPanel from "@/components/shared/InfoPanel";

export default function WelcomeScreen() {
  const item = useLocalSearchParams();
  const { control, handleSubmit } = useForm<ISignIn>({ resolver: joiResolver(validation.checkPasswords) });

  const onSignInPressed = async (data: ISignIn) => {
    router.push({ pathname: "/(auth)/reset-password", params: { email: item.email, password: data.password } });
  };

  return (
    <View style={styles.parent}>
      <ViewAnimation delay={300}>
        <InfoPanel title={"Change Password"} />
      </ViewAnimation>
      <AppInput
        name="password"
        label={"Password"}
        control={control as never}
        placeholder={"Enter a new password"}
        keyboard="default"
        trailingIcon
      />
      <AppInput
        name="confirmPassword"
        label={"Confirm Password"}
        control={control as never}
        placeholder={"Confirm your password"}
        keyboard="default"
        trailingIcon
      />
      <View style={{ marginVertical: 8 }} />
      <Button title="Set a password" onPress={handleSubmit(onSignInPressed)} />
    </View>
  );
}

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 120,
    paddingHorizontal: 16,
  },
  logoContainer: {
    marginVertical: 16,
  },

  title: {
    ...DesignSystem.display[400],
    color: DesignSystem.colors.content.primary,
    letterSpacing: -0.4,
  },
});
