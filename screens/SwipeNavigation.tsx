import React,{useState,useEffect} from "react";
import { Text } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { useSharedValue, withSpring, runOnJS } from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

// Define the type for the navigation stack
type RootStackParamList = {
  Home: undefined;
  Service: undefined;
  "Booking History": undefined;
    Profile:undefined;
  Chat:undefined}
const screens = ["Home", "Service", "Booking History", "Chat"];

type SwipeableScreenProps = {
    screenIndex: number;
  renderContent: () => React.ReactNode;
};
  const HomeScreen = (props:SwipeableScreenProps) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const translateX = useSharedValue(0);
  const [currentIndex, setCurrentIndex] = useState(props.screenIndex);
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

  useEffect(() => {
    const unsubscribe = navigation.addListener("state", () => {
      const state = navigation.getState();
      if (state) {
        const routeName = state.routes[state.index].name;
        const newIndex = screens.indexOf(routeName);
        if (newIndex !== -1) {
          setCurrentIndex(newIndex);
        }
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
      <Animated.View style={[{ flex: 1 }]}>
        {props.renderContent()} 
      </Animated.View>
    </GestureDetector>
  );
};



export default HomeScreen;