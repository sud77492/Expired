import { AsyncStorage } from "react-native";
import createDataContext from "./createDataContext";
import expireApi from "../api/services";
import { navigate } from "../navigationRef";

const authReducer = (state, action) => {
  switch (action.type) {
    case "add_error":
      return { ...state, errorMessage: action.payload };
    case "signin":
      return { errorMessage: "", token: action.payload };
    case "clear_error_message":
      return { ...state, errorMessage: "" };
    case "signout":
      return { token: null, errorMessage: "" };
    default:
      return state;
  }
};

const tryLocalSignin = (dispatch) => async () => {
  const token = await AsyncStorage.getItem("token");
  if (token) {
    dispatch({ type: "signin", payload: token });
    navigate("Home");
  } else {
    navigate("Signin");
  }
};

const clearErrorMessage = (dispatch) => () => {
  dispatch({ type: "clear_error_message" });
};

const signup = (dispatch) => async ({ email, password }) => {
  try {
    const response = await expireApi.post("/signup", { email, password });
    console.log("signupnapi");
    console.log(response);
    await AsyncStorage.setItem("token", response.data.token);
    await AsyncStorage.setItem("email", email);

    dispatch({ type: "signin", payload: response.data.token });
    navigate("Home");
  } catch (err) {
    dispatch({
      type: "add_error",
      payload: err,
    });
  }
};

const updateUser = (dispatch) => {
  return async (email, expoToken) => {
    await jsonServer.put(`/update_user/${email}`, {
      expoToken,
    });

    dispatch({
      type: "update_user",
      payload: { expoToken },
    });
    // if (callback) {
    //   console.log("Edit Submitted");
    //   callback();
    //   navigate("Home");
    // }
  };
};

const signin = (dispatch) => async ({ email, password }) => {
  // Try to signin
  // Handle success by updating state
  // Handle failure by showing error message (somehow)
  if (email == "" || password == "") {
    dispatch({
      type: "add_error",
      payload: "Email or password is Empty",
    });
  } else {
    clearErrorMessage();
    try {
      const response = await expireApi.post("/signin", { email, password });
      console.log("signupnapi");
      await AsyncStorage.setItem("token", response.data.token);
      await AsyncStorage.setItem("email", email);
      dispatch({ type: "signin", payload: response.data.token });
      navigate("Home");
    } catch (err) {
      console.log(err);
      dispatch({
        type: "add_error",
        payload: err,
      });
    }
  }

  //console.log("sudhanshu");

  //navigate("Home");
};

const signout = (dispatch) => async () => {
  await AsyncStorage.removeItem("token");
  dispatch({ type: "signout" });
  navigate("loginFlow");
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { signin, signout, signup, updateUser, clearErrorMessage, tryLocalSignin },
  { token: null, errorMessage: "" }
);
