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
// import { useRoute } from "@react-navigation/core";
import Constants from "expo-constants";

export default function ProfileScreen({ setToken, setUserId }) {
  // UseRoute permet d'indiquer que l'on reçoit des paramètres de la route précédente
  // const { params } = useRoute();
  // 1. création des states
  const [isLoading, setIsLoading] = useState(true); // au départ le chargement est effectué
  const [profile, setProfile] = useState({}); // on récupère un objet

  // const obj = useRoute();
  // const params = obj.params;
  // const profileId = params.profileId;

  // const { userId } = useParams();

  // 2. Appel get axios
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://airbnb-api.herokuapp.com/api/user/" + setToken
        );
        setProfile(response.data);
        console.log(response.data);
        setIsLoading(false); // le chargement est terminé
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
            <Text style={styles.username}>{profile.username}</Text>
            <Text style={styles.description}>
              Hello, I'm married, 2 kids, leaving in the center of Paris and
              loving it. I rent my own place and manage a few others. For all of
              them, I'll be happy to advise you on your stay in Paris, nice
              places, best walks to reach them, shops, restaurants... I'll be
              there. See you soon in Paris.
            </Text>

            <Button
              style={styles.logOut}
              title="Log Out"
              onPress={() => {
                // quand logout, on change l'état token à null
                setToken(null);
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
