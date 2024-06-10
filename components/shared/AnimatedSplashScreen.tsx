import { StatusBar } from "expo-status-bar";
import LottieView from "lottie-react-native";
import { StyleSheet, View, useWindowDimensions } from "react-native";

export default function AnimatedSplashScreen() {
  const { width: SCREEN_WIDTH } = useWindowDimensions();

  return (
    <View style={styles.parent}>
      <StatusBar style="dark" />
      <LottieView
        source={require("../../assets/animations/splash.json")}
        style={{
          width: SCREEN_WIDTH * 0.9,
          height: SCREEN_WIDTH * 0.9,
        }}
        autoPlay
        loop
      />
    </View>
  );
}

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
