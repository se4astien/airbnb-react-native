import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigation } from "@react-navigation/core";
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from "react-native";
import { AsyncStorage } from "react-native"; // permet d'enregistrer les données de l'utilisateur
import Constants from "expo-constants"; // utile quand on veut utiliser certains styles

export default function SignUpScreen({ setToken }) {
  const navigation = useNavigation(); // besoin pour aller vers la page HomeScreen

  // 1. Mise en forme
  // 2. Création des états
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // 3. Interactions
  return (
    <ScrollView style={styles.container}>
      <View style={styles.welcome} style={{ alignItems: "center" }}>
        <TextInput
          placeholder="Enter your email"
          style={styles.input}
          value={email}
          // onChangeText permet d'envoyer les infos de l'utilisateur à l'API
          onChangeText={text => {
            setEmail(text);
          }}
        />
        <TextInput
          placeholder="Enter your name"
          style={styles.input}
          value={name}
          onChangeText={text => {
            setName(text);
          }}
        />
        <TextInput
          placeholder="Enter your username"
          style={styles.input}
          value={userName}
          onChangeText={text => {
            setUserName(text);
          }}
        />
        <TextInput
          placeholder="Enter your description"
          style={styles.input}
          value={userName}
          onChangeText={text => {
            setUserName(text);
          }}
        />
        <TextInput
          placeholder="Enter your password"
          secureTextEntry={true} // remplace value="password" dans React
          style={styles.input}
          value={password}
          onChangeText={text => {
            setPassword(text);
          }}
        />
        <TextInput
          placeholder="Confirm your password"
          secureTextEntry={true} // remplace value="password" dans React
          style={styles.input}
          value={confirmPassword}
          onChangeText={text => {
            setConfirmPassword(text);
          }}
        />

        <TouchableOpacity
          onPress={async () => {
            // 3. on fait la requête à axios pour se loguer
            // la requete va renvoyer un token
            const response = await axios.post(
              "https://airbnb-api.now.sh/api/user/log_in",
              {
                email: email,
                password: password
              }
            );

            // console.log(response.data);
            // alert(JSON.stringify(response.data));

            // Enregistre le token dans AsyncStorage (équivalent au cookie)
            await AsyncStorage.setItem("user", response.data.token);

            // on met à jour userToken grâce à la fonction setToken
            setToken(response.data.token);
            // on renvoie vers la page HomeScreen
            navigation.navigate("HomeScreen");
          }}
        >
          <View style={styles.createAccount}>
            <Text style={styles.createAccountText}>Create an account</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#FF5A5F" // background de tout l'écran
  },
  title: {
    color: "#fff",
    fontSize: 60,
    fontWeight: "normal"
  },
  input: {
    marginTop: 40,
    fontSize: 20,
    borderBottomColor: "white",
    borderBottomWidth: 1,
    color: "white",
    height: 44,
    width: 300
  },
  createAccount: {
    marginTop: 50,
    backgroundColor: "white",
    paddingHorizontal: 60,
    paddingVertical: 20,
    borderRadius: 50
  },
  createAccountText: {
    color: "#FF5A5F",
    fontSize: 22
  }
});
