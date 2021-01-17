import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { SetApplyFilters, SetQuery } from "../../Store/actions";
import {
  StyleSheet,
  View,
  ScrollView,
  Button,
  TextInput,
  Picker,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import background from "../../Assets/wallpaper.png";
import menuIcon from "../../Assets/menu.png";

const d = Dimensions.get("screen");

const Config = ({ navigation }) => {
  const [filters, setFilters] = useState({});
  const ReduxState = useSelector((state) => state);
  const [query, setQuery] = useState("");
  const [currentFilters, setCurrentFilters] = useState({});

  const dispatch = useDispatch();
  useEffect(() => {
    setFilters(ReduxState.filters);
    setCurrentFilters(ReduxState.applyFilters);
    setQuery(ReduxState.query || "");
  }, [ReduxState.filters, ReduxState.applyFilters, ReduxState.query]);

  const handleSearch = (query) => {
    dispatch(SetApplyFilters(currentFilters));
    dispatch(SetQuery(query));
    navigation.navigate("Home");
  };

  return (
    <View behavior="height" style={styles.container}>
      <ImageBackground source={background} style={styles.backgroundImage}>
        <ScrollView behavior="height" style={styles.innerContainer}>
          <View style={{ padding: 10, paddingTop: 50 }}>
            <TextInput
              placeholder="search"
              value={query}
              onChangeText={(e) => setQuery(e)}
              style={styles.input}
            />
            {filters.filters !== undefined &&
              filters.filters.map((filter, index) => (
                <View style={{ margin: 10 }} key={index}>
                  {filter.values !== undefined && (
                    <Picker
                      style={styles.input}
                      selectedValue={currentFilters[filter.id]}
                      onValueChange={(itemValue) => {
                        setCurrentFilters((prevState) => ({
                          ...prevState,
                          [filter.id]: itemValue,
                        }));
                      }}
                    >
                      <Picker.Item label={`Select ${filter.id}`} value={""} />

                      {filter.values.map((value, i) => (
                        <Picker.Item
                          label={value.name}
                          key={value.value}
                          value={value.value}
                        />
                      ))}
                    </Picker>
                  )}
                  {filter.validation !== undefined && (
                    <TextInput
                      placeholder={filter.name}
                      style={styles.input}
                      type={
                        filter.validation.primitiveType === "INTEGER"
                          ? "number"
                          : "off"
                      }
                      keyboardType={
                        filter.validation.primitiveType === "INTEGER"
                          ? "numeric"
                          : "default"
                      }
                      min={filter.validation.min ? filter.validation.min : 0}
                      max={
                        filter.validation.max
                          ? filter.validation.max
                          : Number.MAX_SAFE_INTEGER
                      }
                      value={currentFilters[filter.id]}
                      onChangeText={(e) => {
                        setCurrentFilters((prevState) => ({
                          ...prevState,
                          [filter.id]: e,
                        }));
                      }}
                    />
                  )}
                </View>
              ))}

            <Button
              onPress={() => handleSearch(query)}
              color="#1db954"
              title="Search"
            />
          </View>
        </ScrollView>
        <TouchableOpacity
          onPress={() => navigation.navigate("Home")}
          style={styles.menuButton}
        >
          <Image source={menuIcon} style={styles.menuImage} />
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  innerContainer: {
    position: "absolute",
    top: 100,
    width: "50%",
    minWidth: 300,
    height: "70%",
    backgroundColor: "#fff",
    paddingRight: 10,
    paddingLeft: 10,
  },
  backgroundImage: {
    flex: 1,
    width: d.width,
    height: d.height,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#1db954",
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    color: "#fff",
  },
  input: {
    height: 40,
    borderColor: "#000",
    borderWidth: 1,
    textAlign: "center",
  },
  menuButton: {
    backgroundColor: "#fff",
    padding: 5,
    borderRadius: 5,
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 2,
  },
  menuImage: {
    width: 40,
    height: 40,
  },
});

export default Config;
