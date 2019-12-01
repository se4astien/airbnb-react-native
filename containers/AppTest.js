import React, { useState } from "react";
import { AsyncStorage } from "react-native";
import { NavigationNativeContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "./containers/HomeScreen";
import ProfileScreen from "./containers/ProfileScreen";
import SignInScreen from "./containers/SignInScreen";
import SettingsScreen from "./containers/SettingsScreen";
import SignUpScreen from "./containers/SignUpScreen";
import FullMapScreen from "./containers/FullMapScreen";

const Tab = createBottomTabNavigator(); // barre du bas
const Stack = createStackNavigator(); // DES ECRANS

export default function App() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [userToken, setUserToken] = React.useState(null);
  const [iduser, setIduser] = React.useState(null); // ligne 108 ProfileScreenTest

  const setToken = async token => {
    if (token) {
      await AsyncStorage.setItem("userToken", token);
    } else {
      await AsyncStorage.removeItem("userToken");
    }

    setUserToken(token);
  };

  const setId = async id => {
    if (id) {
      await AsyncStorage.setItem("iduser", id);
    } else {
      await AsyncStorage.removeItem("iduser");
    }

    setIduser(id);
  };

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      // We should also handle error for production apps
      const userToken = await AsyncStorage.getItem("userToken");
      const iduser = await AsyncStorage.getItem("iduser");

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      setIsLoading(false);
      setUserToken(userToken);
      setIduser(iduser);
    };

    bootstrapAsync();
  }, []);

  return (
    <NavigationNativeContainer>
      <Stack.Navigator>
        {isLoading ? (
          // We haven't finished checking for the token yet
          <Stack.Screen name="Splash" component={() => null} /> // le load de screen
        ) : userToken === null ? (
          // No token found, user isn't signed in ///////////////////////////////////////////////////////
          <>
            <Stack.Screen name="Login" options={{ header: () => null }}>
              {() => (
                <SignInScreen
                  setToken={setToken}
                  userToken={userToken}
                  setId={setId}
                />
              )}
            </Stack.Screen>
            <Stack.Screen
              name="SignUp"
              options={{
                title: "",
                headerTintColor: "white",
                headerStyle: {
                  backgroundColor: "#FF5A5F",
                  shadowRadius: 0,
                  shadowOffset: {
                    height: 0
                  }
                },
                headerTitleStyle: {
                  color: "white",
                  fontSize: 23,
                  fontWeight: "300"
                }
              }}
            >
              {() => <SignUpScreen setToken={setToken} setId={setId} />}
            </Stack.Screen>
          </>
        ) : (
          // User is signed in    ///////////////////////////////////////////////////////
          <Stack.Screen name="Tab" options={{ header: () => null }}>
            {() => (
              <Tab.Navigator
                screenOptions={({ route }) => {
                  return {
                    tabBarIcon: ({ focused, color, size }) => {
                      let iconName;
                      if (route.name === "Profile") {
                        iconName = `ios-person`;
                      } else if (route.name === "Map") {
                        iconName = `ios-flag`;
                      } else {
                        iconName = `ios-list`;
                      }
                      return (
                        <Ionicons name={iconName} size={size} color={color} />
                      );
                    },
                    title: route.name === "undefined" ? "List" : route.name // known issue : route.name shouldn't be undefined
                  };
                }}
                tabBarOptions={{
                  activeTintColor: "tomato",
                  inactiveTintColor: "gray"
                }}
              >
                <Tab.Screen>
                  {() => (
                    <Stack.Navigator>
                      <Stack.Screen
                        name="List"
                        options={{
                          title: "List Airbnb",
                          headerTintColor: "white",
                          headerStyle: {
                            backgroundColor: "#FF5A5F"
                          },
                          headerTitleStyle: {
                            color: "white",
                            fontSize: 23,
                            fontWeight: "300"
                          }
                        }}
                      >
                        {() => <HomeScreen />}
                      </Stack.Screen>

                      <Stack.Screen
                        name="Profile"
                        options={{
                          title: "Room",
                          headerTintColor: "white",
                          headerStyle: { backgroundColor: "#FF5A5F" },
                          headerTitleStyle: {
                            color: "white",
                            fontSize: 23,
                            fontWeight: "300"
                          }
                        }}
                      >
                        {() => <ProfileScreen />}
                      </Stack.Screen>
                    </Stack.Navigator>
                  )}
                </Tab.Screen>
                <Tab.Screen name="Map">
                  {() => (
                    <Stack.Navigator>
                      <Stack.Screen
                        name="FullMap"
                        options={{
                          title: "Map Airbnb",
                          headerTintColor: "white",
                          headerStyle: {
                            backgroundColor: "#FF5A5F"
                          },
                          headerTitleStyle: {
                            color: "white",
                            fontSize: 23,
                            fontWeight: "300"
                          }
                        }}
                      >
                        {() => <FullMapScreen setToken={setToken} />}
                      </Stack.Screen>
                    </Stack.Navigator>
                  )}
                </Tab.Screen>
                <Tab.Screen name="Profile">
                  {() => (
                    <Stack.Navigator>
                      <Stack.Screen
                        name="Settings"
                        options={{
                          title: "Profile",
                          headerTintColor: "white",
                          headerStyle: {
                            backgroundColor: "#FF5A5F"
                          },
                          headerTitleStyle: {
                            color: "white",
                            fontSize: 23,
                            fontWeight: "300"
                          }
                        }}
                      >
                        {() => (
                          <SettingsScreen
                            setToken={setToken}
                            iduser={iduser}
                            setId={setId}
                            userToken={userToken}
                          />
                        )}
                      </Stack.Screen>
                    </Stack.Navigator>
                  )}
                </Tab.Screen>
              </Tab.Navigator>
            )}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationNativeContainer>
  );
}
