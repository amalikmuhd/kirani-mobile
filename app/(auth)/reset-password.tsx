import { StyleSheet, Text, View } from "react-native";
import DesignSystem from "@/constants/DesignSystem";
import { router, useLocalSearchParams } from "expo-router";
import AppInput from "@/components/shared/AppInput";
import Button from "@/components/shared/Button";
import { useForm } from "react-hook-form";
import validation from "@/utils/validation";
import { joiResolver } from "@hookform/resolvers/joi";
import { IOtp, ISignIn } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { resetPassword, signin } from "@/services/Endpoints";
import { AxiosError } from "axios";
import ToastManager from "@/components/toastify";
import ViewAnimation from "@/components/shared/ViewAnimation";
import InfoPanel from "@/components/shared/InfoPanel";

// Define the type for the error response data
interface ErrorResponse {
  message: string;
}

export default function WelcomeScreen() {
  const item = useLocalSearchParams();
  const { control, handleSubmit } = useForm<IOtp>({ resolver: joiResolver(validation.checkOtp) });

  const onSignInPressed = async (data: IOtp) => {
    mutation.mutate({
      email: item.email,
      password: item.password,
      otp: data.otp,
    } as never);
  };

  const mutation = useMutation({
    mutationFn: (payload: IOtp) => {
      return resetPassword(payload);
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      ToastManager.error(error.response?.data.message as string, "top");
    },
    onSuccess: (data) => {
      if (data.data.message === "success") {
        router.push("/(auth)/signin");
      }
    },
  });

  return (
    <View style={styles.parent}>
      <ViewAnimation delay={300}>
        <InfoPanel title={"Change Password"} />
      </ViewAnimation>
      <AppInput name="otp" label={"OTP"} control={control as never} placeholder={"Enter your otp"} keyboard="default" />

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
