import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigation } from "@react-navigation/core";
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch
} from "react-native";
import { AsyncStorage } from "react-native"; // permet d'enregistrer les données de l'utilisateur
import Constants from "expo-constants"; // utile quand on veut utiliser certains styles

export default function SignUpScreen({ setToken, setId }) {
  // on récupère setId pour la page Profile
  // 2. Création des états
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [cgv, setCGV] = useState(false);

  // besoin pour aller vers la page HomeScreen
  const navigation = useNavigation();

  let isEnabled = false; // on créer une variable pour vérifier que tout est OK

  // on fait une condition pous savoir si tous les champs sont remplis
  if (
    // si les champs sont différents de vide
    email !== "" &&
    userName !== "" &&
    password !== "" &&
    confirmPassword !== "" &&
    password === confirmPassword &&
    cgv === true
  ) {
    isEnabled = true; // alors tout est OK
  }

  // 1. Mise en page
  return (
    <ScrollView style={styles.container}>
      <View style={{ padding: 40 }}>
        <TextInput
          autoCapitalize={"none"}
          placeholder="anemail@airbnb-api.com"
          placeholderTextColor="white"
          style={styles.input}
          value={email}
          // onChangeText permet d'envoyer les infos de l'utilisateur à l'API
          onChangeText={text => {
            setEmail(text);
          }}
        />
        <TextInput
          autoCapitalize={"none"}
          placeholder="Enter your username"
          placeholderTextColor="white"
          style={styles.input}
          value={userName}
          onChangeText={text => {
            setUserName(text);
          }}
        />
        <TextInput
          autoCapitalize={"none"}
          placeholder="Enter your password"
          placeholderTextColor="white"
          secureTextEntry={true}
          style={styles.input}
          value={password}
          onChangeText={text => {
            setPassword(text);
          }}
        />
        <TextInput
          autoCapitalize={"none"}
          placeholder="Confirm your password"
          placeholderTextColor="white"
          style={styles.input}
          value={confirmPassword}
          onChangeText={text => {
            setConfirmPassword(text);
          }}
        />
        <View style={{ flexDirection: "row" }}>
          <Text
            style={{ marginTop: 30, color: "white", fontSize: 20, flex: 1 }}
          >
            Accepter les CVG
          </Text>
          <Switch
            style={{
              backgroundColor: "#FF0000",
              borderRadius: 17,
              marginTop: 30,
              marginRight: 30
            }}
            value={cgv}
            onValueChange={value => {
              setCGV(value);
            }}
          />
        </View>

        <TouchableOpacity
          onPress={async () => {
            try {
              //console.log("1");
              if (isEnabled === true) {
                //console.log("2");
                const response = await axios.post(
                  "https://airbnb-api.herokuapp.com/api/user/sign_up",
                  {
                    email: email,
                    username: userName,
                    password: password
                  }
                );
                //console.log("3");

                // 3. Appeler le serveur pour créer un compte
                // La requete va renvoyer un token

                //console.log("4");

                // on récupère token et _id grâce à la fonction setToken et setId
                setToken(response.data.token);
                setId(response.data._id);

                console.log(response.data.token);
                console.log(response.data._id);
                // on renvoie vers la page HomeScreen
                navigation.navigate("Home");
              }
            } catch (error) {
              alert("Email ou mot de passe incorrect");
            }
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
