import React, { useState, useEffect } from "react";
import { AsyncStorage } from "react-native";
import { NavigationNativeContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "./containers/HomeScreen";
import RoomScreen from "./containers/RoomScreen";
import SignInScreen from "./containers/SignInScreen";
import SignUpScreen from "./containers/SignUpScreen";
import ProfileScreen from "./containers/ProfileScreen";

const Tab = createBottomTabNavigator(); // barre du bas
const Stack = createStackNavigator(); // des écrans

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);
  const [userId, setUserId] = useState(null);

  // fonction qui permet de vérifier si token existe
  const setToken = async token => {
    if (token) {
      // si plusieurs actions à faire, mettre async avant AsyncStorage
      // On enregistre le token dans AsyncStorage (équivalent au cookie)
      AsyncStorage.setItem("userToken", token);
    } else {
      // on supprime l'id
      AsyncStorage.removeItem("userToken");
    }
    setUserToken(token);
  };

  // fonction qui permet de vérifier si id existe
  const setId = async id => {
    if (id) {
      await AsyncStorage.setItem("userId", id);
    } else {
      await AsyncStorage.removeItem("userId");
    }
    setUserId(id);
  };

  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      // We should also handle error for production apps
      const userToken = await AsyncStorage.getItem("userToken");
      const userId = await AsyncStorage.getItem("userId");

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      setIsLoading(false);
      setUserToken(userToken);
      setUserId(userId);
    };

    bootstrapAsync();
  }, []);

  return (
    <NavigationNativeContainer>
      <Stack.Navigator>
        {isLoading ? (
          // We haven't finished checking for the token yet
          <Stack.Screen name="Splash" component={() => null} />
        ) : userToken === null ? (
          // No token found, user isn't signed in // header : null => enlève le header par défaut
          <>
            <Stack.Screen name="SignIn" options={{ header: () => null }}>
              {/* // on renvoie vers la page SignInScreen */}
              {() => <SignInScreen setToken={setToken} setId={setId} />}
            </Stack.Screen>
            <Stack.Screen name="SignUp">
              {() => <SignUpScreen setToken={setToken} setId={setId} />}
            </Stack.Screen>
          </>
        ) : (
          // User is signed in
          <Stack.Screen name="Tab" options={{ header: () => null }}>
            {() => (
              <Tab.Navigator
                screenOptions={({ route }) => {
                  return {
                    tabBarIcon: ({ focused, color, size }) => {
                      let iconName;
                      if (route.name === "Profile") {
                        iconName = `ios-contact`;
                      } else if (route.name === "Map") {
                        iconName = "ios-map";
                      } else {
                        iconName = `ios-home`;
                      }
                      return (
                        <Ionicons name={iconName} size={size} color={color} />
                      );
                    },
                    title: route.name === "undefined" ? "Home" : route.name // know issue : route.name shouldn't be undefined
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
                        name="Home"
                        options={{
                          title: "Mon Airbnb",
                          headerStyle: { backgroundColor: "#FF5A5F" },
                          headerTitleStyle: {
                            color: "white",
                            fontSize: 22,
                            fontWeight: "normal"
                          }
                        }}
                      >
                        {() => <HomeScreen />}
                      </Stack.Screen>

                      <Stack.Screen
                        name="Room"
                        options={{
                          title: "Room",
                          headerStyle: { backgroundColor: "#FF5A5F" },
                          headerTitleStyle: {
                            color: "white",
                            fontSize: 22,
                            fontWeight: "normal"
                          },
                          headerTintColor: "white"
                        }}
                      >
                        {() => <RoomScreen />}
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
                          headerStyle: { backgroundColor: "#FF5A5F" },
                          headerTitleStyle: {
                            color: "white",
                            fontSize: 22,
                            fontWeight: "normal"
                          },
                          headerTintColor: "white"
                        }}
                      >
                        {/* // A FAIRE PLUS TARD */}
                        {/* {() => <MapScreen />} */}
                      </Stack.Screen>
                    </Stack.Navigator>
                  )}
                </Tab.Screen>
                <Tab.Screen name="Profile">
                  {() => (
                    <Stack.Navigator>
                      <Stack.Screen
                        name="Profile"
                        options={{
                          title: "Profile User",
                          headerStyle: { backgroundColor: "#FF5A5F" },
                          headerTitleStyle: {
                            color: "white",
                            fontSize: 22,
                            fontWeight: "normal"
                          },
                          headerTintColor: "white"
                        }}
                      >
                        {() => (
                          <ProfileScreen
                            setToken={setToken}
                            userId={userId}
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
