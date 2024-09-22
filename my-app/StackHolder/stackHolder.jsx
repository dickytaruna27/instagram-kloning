import { useContext } from "react";
import { LoginContext } from "../contexts/LoginContext";
import LoginScreen from "../pages/LoginScreen";
import RegisterScreen from "../pages/RegisterScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../pages/Homescreen";
import MyProfileScreen from "../pages/MyProfileScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AddPostScreen from "../pages/AddPostScreen";
import SearchScreen from "../pages/SearchScreen";
import AddCommentScreen from "../pages/AddComment";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
export const StackHolder = () => {
  const { isLoggedIn } = useContext(LoginContext);

  const TabNav = () => {
    return (
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen
          name="Home tab"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="AddPost"
          component={AddPostScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="plus-circle"
                color={color}
                size={size}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Search"
          component={SearchScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="magnify"
                color={color}
                size={size}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={MyProfileScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="account"
                color={color}
                size={size}
              />
            ),
          }}
        />
      </Tab.Navigator>
    );
  };

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isLoggedIn ? (
          <>
            <Stack.Screen
              name="Home"
              component={TabNav}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="AddComment" component={AddCommentScreen} />

            <Stack.Screen
              name="AddPost"
              component={AddPostScreen}
              options={{ headerShown: false }}
            />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
