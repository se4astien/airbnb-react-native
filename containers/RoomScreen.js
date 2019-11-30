import React, { useState, useEffect } from "react";
import MapView from "react-native-maps";
import axios from "axios";
import { useRoute } from "@react-navigation/core";
import Constants from "expo-constants";
import { Ionicons } from "@expo/vector-icons";
import Gallery from "../components/Gallery";
import {
  Text,
  View,
  ActivityIndicator,
  ScrollView,
  Image,
  StyleSheet
} from "react-native";

export default function RoomScreen() {
  // UseRoute permet d'indiquer que l'on reçoit des paramètres de la route précédente
  const { params } = useRoute();
  const [isloading, setIsLoading] = useState(true);
  const [room, setRoom] = useState([]);
  const [isDescriptionDisplayed, setIsDescriptionDisplayed] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://airbnb-api.herokuapp.com/api/room/" + params.roomId
        );
        setRoom(response.data);
        setIsLoading(false);
      } catch (error) {
        alert(error.message);
      }
    };
    fetchData();
  }, [params.roomId]); // on récupère les paramètres de HomeScreen

  // MAP
  const markers = [
    {
      id: 1,
      latitude: 48.8564449,
      longitude: 2.4002913,
      title: "Le Reacteur",
      description: "La formation des champion·ne·s !"
    }
  ];

  // Afficher les étoiles dynamiquement
  const stars = [];
  for (let i = 0; i < 5; i++) {
    if (i < room.ratingValue) {
      stars.push(<Ionicons name="ios-star" key={i} size={20} color="gold" />);
    } else
      stars.push(<Ionicons name="ios-star" key={i} size={20} color="grey" />);
  }

  return (
    <>
      {isloading === true ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <ActivityIndicator size="large" color="red" />
        </View>
      ) : (
        <ScrollView>
          <View style={{ position: "relative" }}>
            <Gallery item={room} />
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
                {room.price}€
              </Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              marginTop: 20,
              paddingHorizontal: 20
            }}
          >
            <View style={{ flex: 1 }}>
              <Text numberOfLines={1} style={{ fontSize: 20 }}>
                {room.title}
              </Text>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View style={styles.ratings}>{stars}</View>
                <Text style={styles.review}>{room.reviews} reviews</Text>
              </View>
            </View>

            <View>
              <Image
                source={{ uri: room.user.account.photos[0] }}
                style={{
                  borderRadius: 40,
                  width: 80,
                  height: 80
                }}
              />
            </View>
          </View>

          <View style={{ padding: 20 }}>
            <Text
              style={{ fontSize: 18, lineHeight: 24, color: "grey" }}
              onPress={() => {
                setIsDescriptionDisplayed(!isDescriptionDisplayed); // change l'état de description à chaque clic (true et false)
              }}
              numberOfLines={isDescriptionDisplayed === true ? 3 : 0}
            >
              {room.description}
            </Text>
          </View>

          <MapView
            // La MapView doit obligatoirement avoir des dimensions
            style={{
              flex: 1,
              width: "90%",
              height: 300,
              marginBottom: 50,
              marginHorizontal: 20
            }}
            initialRegion={{
              latitude: room.loc[1],
              longitude: room.loc[0],
              latitudeDelta: 0.2,
              longitudeDelta: 0.2
            }}
          >
            {markers.map(marker => {
              return (
                <MapView.Marker
                  key={marker.id}
                  coordinate={{
                    latitude: room.loc[1],
                    longitude: room.loc[0]
                  }}
                  title={marker.title}
                  description={marker.description}
                />
              );
            })}
          </MapView>

          {/* <Text>room id : {params.roomId}</Text>
          <Text>room id : {room.title}</Text> */}
        </ScrollView>
      )}
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight
  },
  review: { paddingLeft: 10, fontSize: 18 },
  ratings: { flexDirection: "row" },

  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#9DD6EB"
  },
  slide2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#97CAE5"
  },
  slide3: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#92BBD9"
  },
  text: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold"
  }
});
