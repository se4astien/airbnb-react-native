import React, { useState, useEffect } from "react";
import axios from "axios";
import { Text, View, Image, StyleSheet, FlatList, Button } from "react-native";
import Constants from "expo-constants";
import { useNavigation } from "@react-navigation/core";
import { TouchableOpacity } from "react-native-gesture-handler";
import Ratings from "../components/Ratings";

export default function HomeScreen() {
  const navigation = useNavigation();
  // 1. mettre à jour les éléments de data
  const [isLoading, setIsLoading] = useState(true);
  const [rooms, setRooms] = useState([]);

  // cette fonction permet d'exécuter notre requête uniquement à la création du composant lors de l'appel à l'API
  // useEffect permet d'éxécuter les fonctions qui vont mettrent à jour les props et/ou les états
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://airbnb-api.now.sh/api/room?city=paris"
        );
        // console.log(response.data);
        // console.log(response.data.rooms);
        // Est-ce que j'ai bien reçu un tableau rooms ?
        if (response.data.rooms) {
          setRooms(response.data.rooms); // on charge l'API
          setIsLoading(false); // le chargement est terminé donc on passe à false
        } else {
          alert("An error occured");
        }
      } catch (error) {
        alert("An error occured");
      }
    };
    // après le chargement de l'API, on réinitialise le tableau à vide afin stopper l'appel à l'API
    fetchData();
  }, []);

  return (
    <FlatList
      data={rooms}
      keyExtractor={item => String(item._id)} // on choisit le nom qu'on veut pour la variable (ici item)
      renderItem={({ item }) => {
        return (
          <View style={{ padding: 20 }}>
            <TouchableOpacity
              onPress={() => {
                // alert(JSON.stringify(item._id));

                // naviagation permet d'aller sur la page en question
                navigation.navigate("Room", {
                  roomId: item._id
                });
              }}
            >
              <View style={{ position: "relative" }}>
                <Image
                  resizeMode="cover"
                  style={{ width: "100%", height: 220 }}
                  source={{ uri: item.photos[0] }}
                />
                <View
                  style={{
                    position: "absolute",
                    bottom: 10,
                    left: 0,
                    backgroundColor: "#000",
                    width: 120,
                    height: 80,
                    justifyContent: "center"
                  }}
                >
                  <Text
                    style={{ color: "#fff", fontSize: 40, textAlign: "center" }}
                  >
                    {item.price}€
                  </Text>
                </View>
              </View>

              <View style={{ flexDirection: "row", marginTop: 20 }}>
                <View style={{ flex: 1 }}>
                  <Text
                    numberOfLines={1}
                    style={{ fontSize: 20, paddingBottom: 10 }}
                  >
                    {item.title}
                  </Text>

                  <Ratings
                    style={{ flexDirection: "row", flex: 1 }}
                    item={item}
                  />
                </View>
                <View>
                  <Image
                    source={{ uri: item.user.account.photos[0] }}
                    style={{
                      borderRadius: 40,
                      width: 80,
                      height: 80
                    }}
                  />
                </View>
              </View>
            </TouchableOpacity>
          </View>
        );
      }}
    />
  );
}

{
  <View>
    <Button
      title="Go to Profile"
      onPress={() => {
        navigation.navigate("Profile", { userId: 123 });
      }}
    />
  </View>;
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#FF5A5F"
  },
  star: {
    color: "#fff",
    fontSize: 60,
    fontWeight: "normal"
  }
});
