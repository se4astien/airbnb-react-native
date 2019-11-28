import React from "react";
import { Button, Text, View } from "react-native";

export default function SettingsScreen({ setToken }) {
  return (
    <View>
      <Text>Hello Settings</Text>

      <Button
        title="Log Out"
        onPress={() => {
          // quand logout, on change l'état token à null
          setToken(null);
        }}
      />
    </View>
  );
}
