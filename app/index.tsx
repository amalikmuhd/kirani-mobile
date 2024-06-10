import AnimatedSplashScreen from "@/components/shared/AnimatedSplashScreen";
// import { getUserScreen } from "@/services/endpoint";
import { load } from "@/utils/storage";
import { router } from "expo-router";
import React from "react";

export default function SplashScreen() {
  const [loading, setLoading] = React.useState(true);

  const loadScreens = async () => {
    try {
      const { token, id } = await load("KiraniStorage");
      setLoading(false);
    } catch (error) {
      setTimeout(() => {
        router.push("/onboarding");
        // setLoading(false);
      }, 2000);
    }
  };

  React.useEffect(() => {
    loadScreens();
  }, []);

  return <AnimatedSplashScreen />;
}
