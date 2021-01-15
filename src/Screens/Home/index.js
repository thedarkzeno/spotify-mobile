import React from "react";
import { StyleSheet, ImageBackground, View, Dimensions, Button } from "react-native";
import background from "../../Assets/wallpaper.png";
import Search from "../../Components/Search";
import Results from "../../Components/Results";
const d = Dimensions.get("screen");

const Home = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ImageBackground source={background} style={styles.backgroundImage}>
        <Search />
        <Results />
        {/* <Button title="logout" onPress={()=>navigation.navigate("Logout")}/> */}
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  backgroundImage: {
    flex: 1,
    width: d.width,
    height: d.height,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Home;
