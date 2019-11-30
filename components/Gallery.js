import React from "react";
import { Image } from "react-native";
import Swiper from "react-native-swiper";

export default function Gallery(props) {
  const pictures = [];
  for (let i = 0; i < props.item.photos.length; i++) {
    pictures.push(
      <Image
        key={i}
        resizeMode="cover"
        style={{
          height: 350
        }}
        source={{ uri: props.item.photos && props.item.photos[i] }}
      />
    );
  }
  return (
    <>
      <Swiper style={{ height: 350 }} showsButtons={true}>
        {pictures}
      </Swiper>
    </>
  );
}
