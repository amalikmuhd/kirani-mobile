import React from "react";
import { router } from "expo-router";
import { load } from "@/utils/storage";
import AnimatedSplashScreen from "@/components/shared/AnimatedSplashScreen";

export default function SplashScreen() {
  const loadScreens = async () => {
    try {
      const token = await load("token");
      // if token exist take user to dashboard
      if (token.token) {
        router.push("/(tabs)/");
      } else if (token.isLogged) {
        // user signout take user to signin
        router.push("/(auth)/signin");
      }
    } catch (error) {
      // first time user
      setTimeout(() => {
        router.push("/onboarding");
      }, 1000);
    }
  };

  React.useEffect(() => {
    loadScreens();
  }, []);

  return <AnimatedSplashScreen />;
}
