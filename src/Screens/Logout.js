import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { SetToken } from "../Store/actions";

const Logout = ({ navigation }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(SetToken(""));
    navigation.navigate("Home");
  }, []);
  return <></>;
};

export default Logout;
