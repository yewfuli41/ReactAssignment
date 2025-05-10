import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeLogin from "./LoginScreen/WelcomeLogin";
import PreviewScreen from "./LoginScreen/PreviewScreen";
import ChatScreen from "./ChatFeature/ChatScreen";
import 'react-native-gesture-handler';
import { enableScreens } from 'react-native-screens';
import { enableLayoutAnimations } from 'react-native-reanimated';
import NavigationScreen from "./screens/ScreenNavigation";
import { UserProvider } from './context/UserContext';
import { ThemeProvider } from './context/ThemeContext';

enableScreens();
enableLayoutAnimations(true);

const App = () => {
  const Stack = createStackNavigator();

  return (

      <ThemeProvider>
        <UserProvider>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen name="Preview" component={PreviewScreen} options={{ headerShown: false }} />
              <Stack.Screen name="LoginMain" component={WelcomeLogin} options={{ headerShown: false }} />
              <Stack.Screen name="Home" component={NavigationScreen} options={{ headerShown: false }} />
              <Stack.Screen name="Chat" component={ChatScreen} options={{ headerShown: false }} />
            </Stack.Navigator>
          </NavigationContainer>
        </UserProvider>
      </ThemeProvider>


  );
}

export default App;