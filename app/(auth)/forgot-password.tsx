import { StyleSheet, Text, View } from "react-native";
import DesignSystem from "@/constants/DesignSystem";
import { router } from "expo-router";
import AppInput from "@/components/shared/AppInput";
import Button from "@/components/shared/Button";
import { useForm } from "react-hook-form";
import validation from "@/utils/validation";
import { joiResolver } from "@hookform/resolvers/joi";
import { ICheckEmail, ISignIn } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { forgotPassword, signin } from "@/services/Endpoints";
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
  const { control, handleSubmit, watch } = useForm<ISignIn>({ resolver: joiResolver(validation.checkEmail) });

  const onSignInPressed = async (data: ISignIn) => {
    mutation.mutate({
      email: data.email.toLowerCase(),
    } as never);
  };

  const mutation = useMutation({
    mutationFn: (email: string) => {
      return forgotPassword(email);
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      ToastManager.error(error.response?.data.message as string, "top");
    },
    onSuccess: (data) => {
      if (data.data.message === "success") {
        router.push({ pathname: "/(auth)/new-password", params: { email: watch("email").toLowerCase() } });
      }
    },
  });

  return (
    <View style={styles.parent}>
      <ViewAnimation delay={300}>
        <InfoPanel title={"Change Password"} />
      </ViewAnimation>
      <AppInput
        name="email"
        label={"Email"}
        control={control as never}
        placeholder={"Enter your email address"}
        keyboard="default"
      />

      <View style={{ marginVertical: 8 }} />
      <Button loading={mutation.isPending} title="Continue" onPress={handleSubmit(onSignInPressed)} />
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
