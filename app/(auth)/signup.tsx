import { StyleSheet, Text, View } from "react-native";
import DesignSystem from "@/constants/DesignSystem";
import { router, useLocalSearchParams } from "expo-router";
import AppInput from "@/components/shared/AppInput";
import Button from "@/components/shared/Button";
import { useForm } from "react-hook-form";
import validation from "@/utils/validation";
import { joiResolver } from "@hookform/resolvers/joi";
import { ICheckEmail, ISignUp, IUser } from "@/types";
import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { checkEmail, signin, signup } from "@/services/Endpoints";
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
  const item = useLocalSearchParams();
  const { control, handleSubmit } = useForm<ISignUp>({ resolver: joiResolver(validation.checkSignup) });

  const onSignInPressed = async (data: ISignUp) => {
    mutation.mutate({
      email: item.email,
      firstName: data.firstName,
      lastName: data.lastName,
      password: data.password,
      phoneNumber: data.phoneNumber,
    } as never);
  };

  const mutation = useMutation({
    mutationFn: (payload: ISignUp) => {
      return signup(payload);
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
        <InfoPanel title={"Basic Registration"} />
      </ViewAnimation>
      <AppInput
        name="firstName"
        label={"First name (as it appears on your ID)"}
        control={control as never}
        placeholder={"Enter Your Legal First Name"}
        keyboard="default"
      />
      <AppInput
        name="lastName"
        label={"Surname"}
        control={control as never}
        placeholder={"Enter Your Legal Surname"}
        keyboard="default"
      />
      <AppInput
        name="password"
        label={"Password"}
        control={control as never}
        placeholder={"Password"}
        keyboard="default"
      />
      <AppInput
        name="phoneNumber"
        label={"Phone Number"}
        control={control as never}
        placeholder={"Enter your phone number"}
        keyboard="default"
      />

      <View style={{ marginVertical: 8 }} />
      <Button loading={mutation.isPending} title="Register" onPress={handleSubmit(onSignInPressed)} />
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

  lanStyle: {
    marginTop: DesignSystem.spacing.rekka_spacing_4x,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    ...DesignSystem.display[400],
    color: DesignSystem.colors.content.primary,
    letterSpacing: -0.4,
  },
  space: {
    marginVertical: 10,
  },
  buttonsContainer: {
    marginTop: 24,
  },
  terms: {
    alignItems: "center",
    textAlign: "center",
  },
  termsLink: {
    ...DesignSystem.body["300_bold"],
    color: DesignSystem.colors.turquoise.dark,
  },
  subTitle: {
    ...DesignSystem.body[300],
    color: DesignSystem.colors.content.secondary,
    marginTop: DesignSystem.spacing.rekka_spacing_1x,
    marginBottom: DesignSystem.spacing.rekka_spacing_4x,
  },
});
