import { StyleSheet, Text, View } from "react-native";
import DesignSystem from "@/constants/DesignSystem";
import { router } from "expo-router";
import AppInput from "@/components/shared/AppInput";
import Button from "@/components/shared/Button";
import { useForm } from "react-hook-form";
import validation from "@/utils/validation";
import { joiResolver } from "@hookform/resolvers/joi";
import { ISignIn } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { signin } from "@/services/Endpoints";
import { AxiosError } from "axios";
import ToastManager from "@/components/toastify";
import { save } from "@/utils/storage";
import ViewAnimation from "@/components/shared/ViewAnimation";
import InfoPanel from "@/components/shared/InfoPanel";

// Define the type for the error response data
interface ErrorResponse {
  message: string;
}

export default function WelcomeScreen() {
  const { control, handleSubmit } = useForm<ISignIn>({ resolver: joiResolver(validation.checkSignIn) });

  const onSignInPressed = async (data: ISignIn) => {
    mutation.mutate({
      email: data.email.toLowerCase(),
      password: data.password,
    } as never);
  };

  const mutation = useMutation({
    mutationFn: (payload: ISignIn) => {
      return signin(payload);
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      ToastManager.error(error.response?.data.message as string, "top");
    },
    onSuccess: (data) => {
      if (data.data.message === "success") {
        save("token", { token: data.data.token, isLogged: true });
        router.push("/(tabs)");
      }
    },
  });

  return (
    <View style={styles.parent}>
      <ViewAnimation delay={300}>
        <InfoPanel title={"Welcome back!"} />
      </ViewAnimation>
      <AppInput
        name="email"
        label={"Email"}
        control={control as never}
        placeholder={"Enter your email address"}
        keyboard="default"
      />

      <AppInput
        name="password"
        label={"Password"}
        control={control as never}
        placeholder={"Password"}
        keyboard="default"
      />

      <View style={{ marginVertical: 8 }} />
      <Button loading={mutation.isPending} title="Sign In" onPress={handleSubmit(onSignInPressed)} />
      <Button
        loading={mutation.isPending}
        title="Forget Password"
        onPress={() => router.push("/(auth)/forgot-password")}
      />
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
