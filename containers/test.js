import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRoute } from "@react-navigation/core";
import { Text, View, ActivityIndicator, ScrollView, Image } from "react-native";
​
export default function ProfileScreen() {
  /* UseRoute permet d'indiquer que l'on reçoit des paramètres
  de la route précédente, pas d'indication dans app */
  const { params } = useRoute();
  const [isloading, setIsloading] = useState(true);
  const [room, setRoom] = useState([]);
​
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://airbnb-api.now.sh/api/room/" + params.roomId
        );
        setRoom(response.data);
        setIsloading(false);
      } catch (error) {
        alert(error.message);
      }
    };
    fetchData();
  }, [params.roomId]);
​
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
          <Image
            resizeMode="cover"
            style={{ height: 355 }}
            source={{ uri: room.photos[0] }}
          />
          <Text>room id : {params.roomId}</Text>
          <Text>room id : {room.title}</Text>
        </ScrollView>
      )}
    </>
  );
}