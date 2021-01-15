import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { isAuthenticated } from "./Services/auth";

import Login from "./Screens/Login";
import Home from "./Screens/Home";
import Logout from "./Screens/Logout";

const Stack = createStackNavigator();

function Routes() {
  const ReduxState = useSelector((state) => state);
  const Dispatch = useDispatch();
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    isAuthenticated().then((res) => {
      if (ReduxState.refresh === true) {
        Dispatch(SetRefresh(false));
      }
    });
  }, [ReduxState.refresh, Dispatch]);

  if (ReduxState.token !== "") {
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Logout" component={Logout} />
        </Stack.Navigator>
        <StatusBar />
      </NavigationContainer>
    );
  }
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={Login} />
      </Stack.Navigator>
      <StatusBar />
    </NavigationContainer>
  );
}

export default Routes;
