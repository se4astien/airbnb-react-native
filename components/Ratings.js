import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Ratings = props => {
  const { item } = props; // destructuring qui récupère la variable item pour la placer dans une props

  // fonction pour afficher les étoiles dynamiquement
  const stars = [];
  for (let i = 0; i < 5; i++) {
    if (i < item.ratingValue) {
      stars.push(<Ionicons name="ios-star" key={i} size={20} color="gold" />);
    } else
      stars.push(<Ionicons name="ios-star" key={i} size={20} color="grey" />);
  }

  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <View style={styles.ratings}>{stars}</View>
      <Text style={styles.review}>{item.reviews} reviews</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  review: { paddingLeft: 10, fontSize: 18 },
  ratings: { flexDirection: "row" }
});

export default Ratings;
