import React, { useState } from "react";
import { useNavigation } from "@react-navigation/core";
import axios from "axios";
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Constants from "expo-constants";
import { Ionicons } from "@expo/vector-icons";

export default function SignInScreen({ setToken, setId }) {
  const navigation = useNavigation(); // besoin pour aller vers SignUp
  // 1. Création des states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  console.log(email);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.welcome}>
        <Ionicons name="md-home" size={140} color="#fff" />
        <Text style={styles.title}>Welcome</Text>
        {/* 2. On stocke les entrées de l'utilisateur dans les states grâce à onChange */}
        <TextInput
          style={styles.input}
          value={email}
          // onChangeText permet d'envoyer les infos de l'utilisateur à l'API
          onChangeText={text => {
            setEmail(text);
          }}
        />
        {/* 2. On stocke les entrées de l'utilisateur dans les states grâce à onChangeText */}
        <TextInput
          secureTextEntry={true} // remplace value="password" dans React
          style={styles.input}
          value={password}
          // onChangeText permet d'envoyer les infos de l'utilisateur à l'API
          onChangeText={text => {
            setPassword(text);
          }}
        />

        <TouchableOpacity
          onPress={async () => {
            // 3. on fait la requête à axios pour se loguer
            // la requete va renvoyer un token
            const response = await axios.post(
              "https://airbnb-api.herokuapp.com/api/user/log_in",
              {
                email: email,
                password: password
              }
            );

            // console.log(response.data);
            // alert(JSON.stringify(response.data));

            // on met à jour userToken grâce à la fonction setToken
            if (response.data.token) {
              setToken(response.data.token);
              // console.log(response.data.token);
              setId(response.data._id);
              // console.log(response.data._id);
            } else {
              alert("Utilisateur non connu");
            }
          }}
        >
          <View style={styles.login}>
            <Text style={styles.loginText}>Login</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          mode="contained"
          onPress={async () => {
            // l'utilisateur n'a pas de compte
            // await setUserId(response.data._id);
            // console.log(response.data.token);
            // console.log(response.data._id);

            navigation.navigate("SignUp");
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 20,
              marginTop: 50
            }}
          >
            Create an account
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#FF5A5F"
  },
  title: {
    color: "#fff",
    fontSize: 60,
    fontWeight: "normal"
  },
  welcome: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 100
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
  login: {
    marginTop: 50,
    backgroundColor: "white",
    paddingHorizontal: 60,
    paddingVertical: 20,
    borderRadius: 50
  },
  loginText: {
    color: "#FF5A5F",
    fontSize: 30
  }
});
