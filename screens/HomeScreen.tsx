import React,{useState,useEffect} from "react";
import { View, StyleSheet, Text } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { useSharedValue, withSpring, runOnJS } from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import styles from "./styleSheet";
// Define the type for your navigation stack
type RootStackParamList = {
    HomeScreen: undefined;
    ServiceScreen: undefined;
    BookHistoryScreen: undefined;
    ProfileScreen: undefined;
  };
  const screens = ["Home", "Service", "Booking History", "Profile"];
const HomeScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const translateX = useSharedValue(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const handleSwipe = (direction: "left" | "right") => {
    let newIndex = currentIndex;
    if (direction === "left"&& currentIndex < screens.length - 1) {
        newIndex += 1; // Move forward
    } else if (direction === "right"&& currentIndex > 0) {
        newIndex -= 1; // Move backward
    }
    if (newIndex !== currentIndex) {
        setCurrentIndex(newIndex);
        navigation.navigate(screens[newIndex] as keyof RootStackParamList);
      }
  };
  // Sync currentIndex with navigation state
useEffect(() => {
  const unsubscribe = navigation.addListener("state", () => {
    const routeName = navigation.getState().routes[navigation.getState().index].name;
    const index = screens.indexOf(routeName);
    if (index !== -1) {
      setCurrentIndex(index);
    }
  });
  return unsubscribe;
}, [navigation]);


  const swipeGesture = Gesture.Pan()
    .minDistance(10) // Ignore tiny movements
    .onFinalize((event) => {
      if (event.translationX < -30) {
        runOnJS(handleSwipe)("left");
      } else if (event.translationX > 30) {
        runOnJS(handleSwipe)("right");
      }
      translateX.value = withSpring(0);
    });

  return (
    <GestureDetector gesture={swipeGesture}>
      <Animated.View style={[styles.container, { flex: 1 }]}>
        <Text style={[{fontWeight:'bold'},styles.text]}>Schneiderman Dental</Text>
        <Text style={styles.text}>100% Quality Assurance</Text>
        <Text style={styles.text}>Some Certificates</Text>
      </Animated.View>
    </GestureDetector>
  );
};



export default HomeScreen;