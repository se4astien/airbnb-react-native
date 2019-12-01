import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  ActivityIndicator,
  Button,
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView
} from "react-native";
import Constants from "expo-constants";

export default function ProfileScreen({ setToken, userToken, setId, iduser }) {
  // 1. création des states
  const [isLoading, setIsLoading] = useState(true); // au départ le chargement est effectué
  const [user, setUser] = useState();
  // const [image, setImage] = useState(null);
  // const [uploading, setUploading] = useState(false);

  console.log(iduser); // 5de3fd17d5ceab0015be369c
  // 2. Appel get axios
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://airbnb-api.herokuapp.com/api/user/" + iduser,
          {
            headers: {
              Authorization: "Bearer " + userToken
            }
          }
        );
        setUser(response.data);
        setIsLoading(false);
      } catch (error) {
        alert("An error occured");
      }
    };
    fetchData();
  }, []); // on réinitialise la fonction fetchData avec un tableau vide

  // 3. Mise en forme et récupération des données
  return (
    <ScrollView style={styles.container}>
      <>
        {isLoading === false ? (
          <ActivityIndicator />
        ) : (
          <View style={styles.center}>
            <Image style={styles.picture} />
            <Text style={styles.username}>{user.account.username}</Text>
            <Text style={styles.description}>{user.account.description}</Text>

            <Button
              style={styles.logOut}
              title="Log Out"
              onPress={() => {
                // quand logout, on change l'état token à null
                setToken(null);
                setId(null);
                // console.log(userId);
              }}
            />
          </View>
        )}
      </>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight
  },
  center: {
    alignItems: "center",
    paddingHorizontal: 50
  },
  picture: {
    width: 200,
    height: 200,
    backgroundColor: "black",
    borderRadius: 100
  },
  username: { paddingVertical: 30, fontSize: 30 },
  description: { fontSize: 20, color: "grey", lineHeight: 30 },
  logOut: { marginTop: 50 }
});
