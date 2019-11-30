import React, { useState, useEffect } from "react";
import { Button, Text, View, Image } from "react-native";
import { useFocusEffect } from "@react-navigation/core";

export default function SettingsScreen({ setToken }) {
  return (
    <View>
      <Text>Hello Settings</Text>

      <Button
        title="Log Out"
        onPress={() => {
          // quand logout, on change l'état token à null
          setToken(null);
          // console.log(userId);
        }}
      />
    </View>
  );
}
