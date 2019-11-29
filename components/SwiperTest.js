import React, { Component } from "react";
import { StyleSheet, Text, Image } from "react-native";

import Swiper from "react-native-swiper";
export default function SwiperTest(props) {
  const tab = [];
  for (let i = 0; i < props.room.photos.length; i++) {
    tab.push(
      <Image
        key={"a" + i}
        resizeMode="cover"
        style={{
          height: 350
        }}
        source={{ uri: props.room.photos && props.room.photos[i] }}
      />
    );
  }
  return (
    <>
      <Swiper style={[styles.wrapper, { height: 350 }]} showsButtons={true}>
        {tab}
      </Swiper>
      <Text>test</Text>
    </>
  );
}
const styles = StyleSheet.create({
  slide1: {
    height: 350,
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold"
  }
});
