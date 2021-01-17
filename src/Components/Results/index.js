import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";

const Results = () => {
  const ReduxState = useSelector((state) => state);
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    if (ReduxState.results.playlists) {
      setTracks(ReduxState.results.playlists.items);
    }
  }, [ReduxState]);

  if (tracks.length > 0) {
    return (
      <ScrollView style={styles.container}>
        <View style={{ padding: 10, paddingTop: 30 }}>
          <Text style={styles.title}>{ReduxState.results.message}</Text>
          {ReduxState.results.playlists &&
            tracks.map((item, index) =>
              ReduxState.query === "" ? (
                <View style={styles.card} key={`${item.name} - ${index}`}>
                  <Image
                    source={{ uri: item.images[0].url }}
                    style={styles.image}
                  />

                  <Text style={styles.text}>{`${item.name}`}</Text>
                </View>
              ) : (
                item.name
                  .toLowerCase()
                  .includes(ReduxState.query.toLowerCase()) && (
                  <View style={styles.card} key={`${item.name} - ${index}`}>
                    <Image
                      source={{ uri: item.images[0].url }}
                      style={styles.image}
                    />

                    <Text style={styles.text}>{`${item.name}`}</Text>
                  </View>
                )
              )
            )}
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
  title: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 24,
    margin: "auto",
    marginBottom: 20,
  },
  image: {
    width: 128,
    height: 128,
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
