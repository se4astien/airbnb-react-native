import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRoute } from "@react-navigation/core";
import { Text, View, Button } from "react-native";

export default function ProfileScreen() {
  // useRoute permet d'indiquer que l'on reçoit des paramètres de la route précédente
  const { params } = useRoute();
  // get // https://airbnb-api.now.sh/api/room/:id + {params._id}

  return (
    <View>
      {/* <Button
        title="Console.log"
        onPress={() => {
          alert(JSON.stringify(annonce.user.account.photos[0]));
        }}
      ></Button> */}
      {/* // la page s'attend à recevoir un userId en paramètre */}
      <Text>user id : {params.userId}</Text>
    </View>
  );
}
