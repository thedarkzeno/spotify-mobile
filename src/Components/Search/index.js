import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import search from "../../Assets/loupe.png";
import api from "../../Services/api";

import { SetResults, SetToken } from "../../Store/actions";

const Search = () => {
  const dispatch = useDispatch();
  const ReduxState = useSelector((state) => state);
  const [query, setQuery] = useState("");
  const doSearch = () => {
    if (query !== "" && query !== null) {
      api
        .get(`search?q=${encodeURI(query)}&type=track&offset=0&limit=10`, {
          headers: {
            Authorization: "Bearer " + ReduxState.token || "",
          },
        })
        .then((res) => {
            // console.log(res.data)
          dispatch(SetResults(res.data));
        })
        .catch((error) => {
        //   console.log(error);
          //error may be caused by expiration of token, so we logout
          dispatch(SetToken(""));
        });
    }
  };
  return (
    <View style={styles.container}>
      <TextInput
        value={query}
        onChangeText={(e) => {
          setQuery(e);
        }}
        placeholder="search"
        style={styles.Input}
      />
      <TouchableOpacity onPress={doSearch} style={styles.Button}>
        <Image source={search} style={styles.Image} />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "#fff",
    zIndex: 2,
  },
  Input: {
    height: 40,
    flex: 1,
    paddingLeft: 10,
    borderColor: "gray",
    borderWidth: 1,
  },
  Button: {
    width: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  Image: {
    width: 40,
    height: 40,
  },
});

export default Search;
