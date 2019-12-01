import React, { useState, useEffect, useCallback } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Button,
  Clipboard,
  Share,
  StatusBar,
  ActionSheetIOS
} from "react-native";
import axios from "axios";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";

export default function SettingsScreen({ setToken, iduser, userToken, setId }) {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState();
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  // =-----------------------------------------------------------------------
  const share = useCallback(() => {
    Share.share({
      message: image,
      title: "Check out this photo",
      url: image
    });
  }, [image]);

  const copyToClipboard = useCallback(() => {
    Clipboard.setString(image);
    alert("Copied image URL to clipboard");
  }, [image]);

  const handleImagePicked = useCallback(async pickerResult => {
    let uploadResponse, uploadResult;

    try {
      setUploading(true);

      if (!pickerResult.cancelled) {
        uploadResponse = await uploadImageAsync(pickerResult.uri, userToken);
        // Convertir la réponse de fetch au format json :
        uploadResult = await uploadResponse.json();

        if (Array.isArray(uploadResult) === true && uploadResult.length > 0) {
          setImage(uploadResult[0]);
        }
      }
    } catch (e) {
      console.log({ uploadResponse });
      console.log({ uploadResult });
      console.log({ e });
      alert("Upload failed, sorry :(");
    } finally {
      setUploading(false);
    }
  });

  const takePhoto = useCallback(async () => {
    const { status: cameraPerm } = await Permissions.askAsync(
      Permissions.CAMERA
    );

    const { status: cameraRollPerm } = await Permissions.askAsync(
      Permissions.CAMERA_ROLL
    );

    // only if user allows permission to camera AND camera roll
    if (cameraPerm === "granted" && cameraRollPerm === "granted") {
      const pickerResult = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3]
      });

      handleImagePicked(pickerResult);
    }
  });

  const pickImage = useCallback(async () => {
    const { status: cameraRollPerm } = await Permissions.askAsync(
      Permissions.CAMERA_ROLL
    );

    // only if user allows permission to camera roll
    if (cameraRollPerm === "granted") {
      const pickerResult = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [1, 1]
      });

      handleImagePicked(pickerResult);
    }
  }, []);

  // =-----------------------------------------------------------------------

  // console.log(iduser);
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://airbnb-api.herokuapp.com/api/user/" + iduser,
        {
          headers: {
            Authorization: "Bearer " + userToken
          }
        }
      );
      setUser(response.data);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return (
    <View style={[styles.container_main, styles.bwhite]}>
      <View
        style={{
          flex: 0.95
        }}
      >
        <View
          style={[
            {
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              height: 400
            },
            styles.borange
          ]}
        >
          <View
            style={[
              {
                flex: 0.4,
                borderRadius: 120,
                height: 150,
                marginTop: 20
              }
            ]}
          >
            {user && user.account.photos[0] === undefined ? (
              <>
                <StatusBar barStyle="default" />
                {/* <Button onPress={pickImage} title="Pick an image from camera roll" />
        <Button onPress={takePhoto} title="Take a photo" /> */}
                <TouchableOpacity
                  onPress={() => {
                    ActionSheetIOS.showActionSheetWithOptions(
                      {
                        options: ["Cancel", "Take a photo", "Camera roll"],
                        // destructiveButtonIndex: 1,
                        cancelButtonIndex: 0
                      },
                      buttonIndex => {
                        if (buttonIndex === 1) {
                          takePhoto();
                        } else if (buttonIndex === 2) {
                          pickImage();
                        }
                      }
                    );
                  }}
                  title="C"
                >
                  <MaterialCommunityIcons
                    name="face-profile"
                    size={150}
                    color="black"
                  />
                </TouchableOpacity>
                {uploading && (
                  <View
                    style={[
                      StyleSheet.absoluteFill,
                      styles.maybeRenderUploading
                    ]}
                  >
                    <ActivityIndicator color="#fff" size="large" />
                  </View>
                )}
              </>
            ) : (
              <>
                <StatusBar barStyle="default" />
                {/* <Button onPress={pickImage} title="Pick an image from camera roll" />
        <Button onPress={takePhoto} title="Take a photo" /> */}
                <TouchableOpacity
                  onPress={() => {
                    ActionSheetIOS.showActionSheetWithOptions(
                      {
                        options: ["Cancel", "Take a photo", "Camera roll"],
                        // destructiveButtonIndex: 1,
                        cancelButtonIndex: 0
                      },
                      buttonIndex => {
                        if (buttonIndex === 1) {
                          takePhoto();
                        } else if (buttonIndex === 2) {
                          pickImage();
                        }
                      }
                    );
                  }}
                  title="C"
                >
                  <Image
                    source={{ uri: image || (user && user.account.photos[0]) }}
                    style={{
                      height: 150,
                      width: 150,
                      overflow: "hidden",
                      borderRadius: 75,
                      borderWidth: 1,
                      borderColor: "black"
                    }}
                  />
                </TouchableOpacity>
                {uploading && (
                  <View
                    style={[
                      StyleSheet.absoluteFill,
                      styles.maybeRenderUploading
                    ]}
                  >
                    <ActivityIndicator color="#fff" size="large" />
                  </View>
                )}
              </>
            )}
          </View>
          <View
            style={[
              {
                flex: 0.6,
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
                marginTop: 15
              }
            ]}
          >
            <View
              style={[
                {
                  marginBottom: 30
                }
              ]}
            >
              <Text style={[styles.middle_font2, {}]}>
                {user && user.account.username}
              </Text>
            </View>
            <View
              style={{
                paddingLeft: 20,
                paddingRight: 20,
                marginBottom: 20,
                justifyContent: "center"
              }}
            >
              <Text style={[styles.small_font, {}]}>
                {user && user.account.description}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View style={[styles.container_center]}>
        <TouchableOpacity
          style={[
            styles.container_button,
            styles.container_center,
            styles.m20t
          ]}
          title="Log Out"
          onPress={() => {
            setToken(null);
            setId(null);
          }}
        >
          <Text style={[styles.middle_font]}>Log out</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity
          style={[
            styles.container_button,
            styles.container_center,
            styles.m20t
          ]}
          title="Log Out"
          onPress={() => {
            // setToken(null);
            console.log(user);
            alert(JSON.stringify(user));
          }}
        >
          <Text style={[styles.middle_font]}>DEBUG</Text>
        </TouchableOpacity> */}
      </View>
    </View>
  );
}

async function uploadImageAsync(uri, userToken) {
  const apiUrl = "https://airbnb-api.herokuapp.com/api/user/upload_picture";

  // Note:
  // Uncomment this if you want to experiment with local server
  //
  // if (Constants.isDevice) {
  //   apiUrl = `https://your-ngrok-subdomain.ngrok.io/upload`;
  // } else {
  //   apiUrl = `http://localhost:3000/upload`
  // }

  const uriParts = uri.split(".");
  const fileType = uriParts[uriParts.length - 1];

  const formData = new FormData();
  formData.append("picture", {
    uri,
    name: `photo.${fileType}`,
    type: `image/${fileType}`
  });

  const options = {
    method: "POST",
    body: formData,
    headers: {
      Authorization: "Bearer " + userToken,
      Accept: "application/json",
      "Content-Type": "multipart/form-data"
    }
  };

  return fetch(apiUrl, options);
}

const styles = StyleSheet.create({
  container_main: {
    flex: 1
  },

  container_center: {
    justifyContent: "center",
    alignItems: "center"
  },
  container_center2: {
    justifyContent: "center",
    alignItems: "center"
  },
  container_form: {
    width: 300,
    borderBottomColor: "white",
    borderBottomWidth: 1,
    marginBottom: 30,
    paddingBottom: 5
  },
  container_form_cvg: {
    width: 300,
    marginBottom: 30,
    paddingBottom: 5
  },
  container_button: {
    backgroundColor: "#FF5A5F",
    padding: 5,
    borderRadius: 100,
    height: 60,
    width: 140
  },
  container_button_true: {
    backgroundColor: "yellowgreen",
    padding: 5,
    borderRadius: 100,
    height: 60,
    width: 140
  },
  p60t: {
    paddingTop: 60
  },
  p60t_2: {
    paddingTop: 15
  },
  p60b: {
    paddingBottom: 60
  },
  p40t: {
    paddingTop: 40
  },
  m40t: {
    marginTop: 40
  },
  m20t: {
    marginTop: 20
  },
  bred: {
    backgroundColor: "red"
  },
  bblack: {
    backgroundColor: "black"
  },
  borange: {
    backgroundColor: "#FF5A5F"
  },
  byellow: {
    backgroundColor: "yellow"
  },
  bwhite: {
    backgroundColor: "white"
  },
  bblue: {
    backgroundColor: "blue"
  },
  big_font: {
    fontWeight: "300",
    fontSize: 58,
    color: "white"
  },
  middle_font: {
    fontWeight: "300",
    fontSize: 24,
    marginLeft: 10,
    color: "white"
  },
  middle_font2: {
    fontWeight: "600",
    fontSize: 34,
    marginLeft: 5,
    color: "black"
  },
  middle_font_orange: {
    fontWeight: "300",
    fontSize: 24,
    color: "#FF5A5F"
  },
  small_font: {
    fontWeight: "400",
    fontSize: 14,
    color: "black"
  }
});
