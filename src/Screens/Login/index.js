import * as React from "react";
import { useDispatch } from "react-redux";
import * as WebBrowser from "expo-web-browser";
import { makeRedirectUri, useAuthRequest } from "expo-auth-session";
import { CLIENT_ID } from "../../../config";
import { StyleSheet, ImageBackground, View, Button } from "react-native";
import background from "../../Assets/wallpaper.png";
import { SetToken } from "../../Store/actions";

WebBrowser.maybeCompleteAuthSession();

const scopes = [
  "user-read-currently-playing",
  "user-read-playback-state",
  "playlist-read-private",
  "playlist-read-collaborative",
];
// Endpoint
const discovery = {
  authorizationEndpoint: `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&redirect_uri=${makeRedirectUri(
    {
      // For usage in bare and standalone
      native: "spotify.mobile://redirect",
    }
  )}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`,
};

export default function Login() {
  const dispatch = useDispatch();
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: CLIENT_ID,
      scopes: scopes,
      // In order to follow the "Authorization Code Flow" to fetch token after authorizationEndpoint
      // this must be set to false
      usePKCE: false,
      response_type: "token",
      // For usage in managed apps using the proxy
      redirectUri: makeRedirectUri({
        // For usage in bare and standalone
        native: "spotify.mobile://redirect",
      }),
    },
    discovery
  );
  

  React.useEffect(() => {
    // console.log(response);
    if (response?.type === "success") {
      const { access_token } = response.params;
    //   console.log(access_token)
      dispatch(SetToken(access_token));
    }
  }, [response]);

  return (
    <View style={styles.container}>
      <ImageBackground source={background} style={styles.backgroundImage}>
        <Button
          disabled={!request}
          onPress={() => {
            promptAsync();
          }}
          title="Login to Spotify"
          color="#1db954"
        />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
