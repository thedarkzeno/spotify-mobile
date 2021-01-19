import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "../../Services/api";

import {
  SetResults,
  SetToken,
  SetFilters,
  SetApplyFilters,
} from "../../Store/actions";

import { StyleSheet, View, TouchableOpacity, Image } from "react-native";
import menuIcon from "../../Assets/menu.png";

const Search = ({ navigation }) => {
  const dispatch = useDispatch();
  const ReduxState = useSelector((state) => state);
  const [count, setCount] = useState(0);
  const [time, setTime] = useState(0);
  const [applyFilters, setApplyFilters] = useState({});

  useEffect(() => {
    api
      .get("/", {
        baseURL: "http://www.mocky.io/v2/5a25fade2e0000213aa90776",
      })
      .then((res) => {
        // console.log(res.data);
        for (let i = 0; i < 5; i++) {
          setApplyFilters((prevState) => ({
            ...prevState,
            [res.data.filters[i].id]: "",
          }));
        }
        dispatch(SetApplyFilters(applyFilters));
        dispatch(SetFilters(res.data));
      });
  }, []);

  useEffect(() => {
    const interval = setInterval(updateCount, 30000);
    return () => clearInterval(interval);
  }, []);
  const updateCount = () => {
    setCount((c) => c + 1);

    console.log(count);
  };

  useEffect(() => {
    var searchString = "?";
    for (const [key, value] of Object.entries(ReduxState.applyFilters)) {
      if (value !== "") {
        if (key === "country" && value === "en_US") {
          searchString += `${key}=US&`;
        } else {
          searchString += `${key}=${value}&`;
        }
      }
    }

    api
      .get(`browse/featured-playlists${searchString}`, {
        headers: {
          Authorization: "Bearer " + ReduxState.token || "",
        },
      })
      .then((res) => {
        // console.log("searched");
        // console.log(res.data);
        dispatch(SetResults(res.data));
      })
      .catch(() => {
        //error may be caused by expiration of token, so we logout
        console.log("error");
        dispatch(SetToken(""));
        dispatch(SetRefresh(true));
      });
  }, [count, dispatch, ReduxState.applyFilters]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate("Config")}
        style={styles.button}
      >
        <Image source={menuIcon} style={styles.Image} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "flex-end",
    position: "absolute",
    top: 10,
    left: -10,
    width: "100%",
    zIndex: 2,
  },
  button: {
    backgroundColor: "#fff",
    padding: 5,
    borderRadius: 5,
  },
  Image: {
    width: 40,
    height: 40,
  },
});

export default Search;
