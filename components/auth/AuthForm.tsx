import { KeyboardAvoidingView, StyleSheet, Platform, ScrollView, ImageBackground } from "react-native";
import { StatusBar } from "expo-status-bar";

import { ReactNode, memo, useEffect } from "react";
import { BlurView } from "expo-blur";
import Container from "./Container";
import DesignSystem from "@/constants/DesignSystem";
import AuthLogo from "./AuthLogo";
import ViewAnimation from "../shared/ViewAnimation";
import InfoPanel from "../shared/InfoPanel";
// import TEMP from "@/temp/TEMP";
// import { randomImages } from "@/utils/randomImages";

// Import all the images

type AuthForm = {
  children: ReactNode;
  child?: ReactNode;
  title?: string;
  description?: string;
};

const AuthForm = ({ children, title, description }: AuthForm) => {
  // console.log(randomImages(), 'randomImages');

  // useEffect(() => {
  //   const images = [TEMP.gif1, TEMP.gif2, TEMP.gif3, TEMP.gif4, TEMP.gif5];
  //   // Get random index
  //   const randomIndex = Math.floor(Math.random() * images.length);

  // }, []);

  return (
    <ImageBackground
      // source={randomImages()}
      style={styles.parent}
    >
      <BlurView intensity={5} style={styles.parent}>
        <StatusBar style="auto" />
        <KeyboardAvoidingView enabled behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
          <ScrollView contentContainerStyle={styles.scrollViewContent} bounces showsVerticalScrollIndicator={false}>
            <ViewAnimation delay={20}>
              <Container isColor marginHorizontal={DesignSystem.spacing.rekka_spacing_4x}>
                <AuthLogo style={styles.logoContainer} />
                <ViewAnimation delay={300}>
                  <InfoPanel
                    title={title}
                    center
                    titleStyle={{ marginVertical: !description ? 10 : 0 }}
                    subtitle={description}
                    newSubtitleStyle={styles.subTitle}
                  />
                </ViewAnimation>
                {children}
              </Container>
            </ViewAnimation>
          </ScrollView>
        </KeyboardAvoidingView>
      </BlurView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  parent: {
    flex: 1,
  },

  container: {
    flex: 1,
    paddingTop: 80,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "space-between",
  },

  logoContainer: {
    marginVertical: 16,
  },

  subTitle: {
    ...DesignSystem.body[300],
    color: DesignSystem.colors.content.secondary,
    marginTop: DesignSystem.spacing.rekka_spacing_1x,
    marginBottom: DesignSystem.spacing.rekka_spacing_4x,
  },
});

export default memo(AuthForm);
