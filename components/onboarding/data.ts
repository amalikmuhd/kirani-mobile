import DesignSystem from "@/constants/DesignSystem";
import { AnimationObject } from "lottie-react-native";

export interface OnboardingData {
  id: number;
  animation: AnimationObject;
  title: string;
  text: string;
  textColor: string;
  backgroundColor: string;
}

const data: OnboardingData[] = [
  {
    id: 1,
    animation: require("../../assets/animations/lottie1.json"),
    title: "Welcome to Kirani",
    // text: "Join us and connect with the world effortlessly. With your unique virtual call number, you can make international calls anytime, anywhere. Let's get started!",
    text: "Connect globally with your unique virtual number. Let's get started!",
    // backgroundColor: '#ffa3ce'
    textColor: DesignSystem.colors.content.tetiary,
    // backgroundColor: DesignSystem.colors.rekkaBlack[5],
    backgroundColor: DesignSystem.colors.rekkaBlack.pureWhite,
    // textColor: '#F7E8E3',
    // backgroundColor: '#0F0704'
  },
  {
    id: 2,
    animation: require("../../assets/animations/lottie2.json"),
    title: "Get Your Unique Number",
    // text: "Receive a unique virtual call number that allows you to stay connected globally. No more hassle with multiple numbers—just one number for all your calls.",
    text: "One number for all your international calls. Simple and convenient.",
    textColor: DesignSystem.colors.content.tetiary,
    // backgroundColor: '#bae4fd'
    backgroundColor: DesignSystem.colors.rekkaBlack.pureWhite,
  },
  {
    id: 3,
    animation: require("../../assets/animations/lottie3.json"),
    title: "Easy and Affordable Calling",
    // text: "Enjoy seamless and affordable international calls with our user-friendly interface. Stay in touch with your loved ones, no matter where they are.",
    text: "Enjoy seamless, low-cost international calls. Stay connected effortlessly.",
    textColor: DesignSystem.colors.content.tetiary,
    // backgroundColor: '#faeb8a'
    backgroundColor: DesignSystem.colors.rekkaBlack.pureWhite,
  },
];

export default data;
