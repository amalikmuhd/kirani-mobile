import { Image, StyleProp, StyleSheet, ViewStyle } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";
type AuthLogo = {
  style?: StyleProp<ViewStyle>;
};
export default function AuthLogo({ style }: AuthLogo) {
  return (
    <Animated.View entering={FadeInUp.duration(1000).springify()} style={[styles.logoContainer, style]}>
      {/* <Image
        source={require('../../assets/images/logo.png')}
        style={styles.logo}
      /> */}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  logoContainer: {
    justifyContent: "center",
    alignItems: "center",
    // marginBottom: -15
  },
  logo: {
    width: 253,
    height: 64,
    resizeMode: "contain",
  },
});
