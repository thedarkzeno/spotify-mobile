import React from "react";
import { Provider } from "react-redux";
import { View } from "react-native";

import Routes from "./Routes";
import store from "./Store";


function App() {
  return (
    
      <Provider store={store}>
        <Routes />
      </Provider>
    
  );
}

export default App;
