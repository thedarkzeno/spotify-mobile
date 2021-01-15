import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { Audio } from "expo-av";
import playicon from "../../Assets/play.png";

const Results = () => {
  const ReduxState = useSelector((state) => state);
  const [tracks, setTracks] = useState([]);
  const [sound, setSound] = useState();

  useEffect(() => {
    if (ReduxState.results.tracks) {
      setTracks(ReduxState.results.tracks.items);
    }
  }, [ReduxState]);

  useEffect(() => {
    return sound
      ? () => {
        //   console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  async function playSound(url) {
    // console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync({ uri: url });
    setSound(sound);

    // console.log("Playing Sound");
    await sound.playAsync();
  }

  if (tracks.length > 0) {
    return (
      <ScrollView style={styles.container}>
        <View>
          {ReduxState.results.tracks &&
            tracks.map((item, index) => (
              <View
                style={styles.card}
                key={`${item.name} - ${item.artists[0].name} - ${index}`}
              >
                <ImageBackground
                  source={{ uri: item.album.images[0].url }}
                  style={styles.imagebackground}
                >
                  {item.preview_url !== null && (
                    <TouchableOpacity
                      delayPressIn={0}
                      onPress={() => {
                        playSound(item.preview_url);
                      }}
                    >
                      <Image source={playicon} style={styles.image} />
                    </TouchableOpacity>
                  )}
                </ImageBackground>

                <Text style={styles.text}>
                  {`${item.name} - ${item.artists[0].name}`}{" "}
                </Text>
              </View>
            ))}
        </View>
      </ScrollView>
    );
  }
  return null;
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 100,
    width: "50%",
    minWidth: 300,
    height: "70%",
    backgroundColor: "#fff",
  },
  imagebackground: {
    width: 128,
    height: 128,
    opacity: 0.7,
  },
  image: {
    width: 64,
    height: 64,
    opacity: 1,
    margin: 32,
  },
  card: {
    flex: 1,
    flexDirection: "row",
    marginBottom: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    flex: 1,
    flexWrap: "wrap",
    marginLeft: 10,
  },
});

export default Results;
