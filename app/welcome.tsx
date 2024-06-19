import { StyleSheet, Text, View } from "react-native";
import AppText from "@/components/shared/AppText";
import DesignSystem from "@/constants/DesignSystem";
import { router } from "expo-router";
import AppInput from "@/components/shared/AppInput";
import AuthForm from "@/components/auth/AuthForm";
import ViewAnimation from "@/components/shared/ViewAnimation";
import { openUrl } from "@/utils/openBrowser";
import Button from "@/components/shared/Button";
import { useForm } from "react-hook-form";
import { Entypo } from "@expo/vector-icons";
import validation from "@/utils/validation";
import { joiResolver } from "@hookform/resolvers/joi";
import { ICheckEmail, IUser } from "@/types";
import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { checkEmail, signup } from "@/services/Endpoints";
import { AxiosError } from "axios";
import ToastManager from "@/components/toastify";

// Define the type for the error response data
interface ErrorResponse {
  message: string;
}

export default function WelcomeScreen() {
  const {
    control,
    handleSubmit,
    watch,
    formState: {
      isValid,
      validatingFields: { email },
    },
  } = useForm<IUser>({ resolver: joiResolver(validation.checkEmail) });

  const onSignInPressed = async (data: ICheckEmail) => {
    mutation.mutate(data.email as never);
  };

  // const mutation: UseMutationResult<any, AxiosError<Error>, ICheckEmail> = useMutation({
  const mutation = useMutation({
    mutationFn: (email: string) => {
      return checkEmail(email);
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      console.log(error.response?.data.message, "error");
      if (error.response?.data.message === "email is already taken.") {
        router.push({ pathname: "/(auth)/signin", params: { email: watch("email") } });
      }
    },
    onSuccess: (data) => {
      console.log("data", data);
      router.push({ pathname: "/(auth)/signup", params: { email: watch("email") } });
    },
  });

  return (
    <AuthForm title="Login or Sign Up" description="Enter your email address to get started">
      <AppInput
        name="email"
        label={""}
        autoCapitalize="none"
        control={control as never}
        placeholder={"you@gmail.com"}
        keyboard="email-address"
      />

      <View style={{ marginVertical: 8 }} />
      <Button loading={mutation.isPending} title="Continue" onPress={handleSubmit(onSignInPressed)} />

      <View style={styles.lanStyle}>
        <AppText title="English (US)" />
        <Entypo name="chevron-down" size={24} color="black" />
      </View>
      <ViewAnimation style={styles.buttonsContainer}>
        <View
          style={{
            marginBottom: DesignSystem.spacing.rekka_spacing_4x,
          }}
        />

        <Text style={styles.terms}>
          <AppText
            title="By continuing, you accept our"
            color={DesignSystem.colors.content.secondary}
            style={{ lineHeight: 24 }}
          />{" "}
          <>
            <AppText
              onPress={() => openUrl("https://rekka.ai/terms")}
              title={"Terms of use"}
              style={styles.termsLink}
              color={DesignSystem.colors.turquoise.main}
            />
          </>{" "}
          <AppText title={`\nand`} color={DesignSystem.colors.content.secondary} />{" "}
          <AppText
            onPress={() => openUrl("https://rekka.ai/privacy")}
            title="Privacy Policy"
            style={styles.termsLink}
            color={DesignSystem.colors.turquoise.main}
          />
        </Text>
      </ViewAnimation>
    </AuthForm>
  );
}

const styles = StyleSheet.create({
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
