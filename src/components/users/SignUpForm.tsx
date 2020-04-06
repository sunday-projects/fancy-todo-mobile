import React, { useState } from "react";
import {
  View,
  TouchableWithoutFeedback,
  Keyboard,
  AsyncStorage,
  StyleSheet
} from "react-native";
import { useDispatch } from "react-redux";
import { TextInput, Button, Card, Snackbar, Subheading } from "react-native-paper";
import { responsiveWidth } from "react-native-responsive-dimensions";

import { Props } from '../';
import styles from "../../styles";

export default ({navigation, route}: Props) => {
  const dispatch = useDispatch();
  const [signUpData, setSignUpData] = useState({
    userData: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: ""
    },
    isLoading: false,
    errors: {
      firstName: false,
      username: false,
      email: false,
      password: false
    },
    currentError: "",
    snackbarVisible: false
  });

  const reverseAllErrors = (target: boolean) => {
    const errors: any = { ...signUpData.errors };
    for (const key in errors) {
      errors[key] = target;
    }
    return errors;
  };

  const dismissSnackbar = () => {
    setSignUpData({
      ...signUpData,
      snackbarVisible: false,
      currentError: "",
      errors: reverseAllErrors(false)
    });
  };

  const handleChange = (value: string, target: string) => {
    const changeTarget: any = { ...signUpData };
    changeTarget.userData[target] = value;
    setSignUpData(changeTarget);
  };

  const checkError = () => {
    const { firstName, username, email, password } = signUpData.userData;
    if (firstName.length <= 0) {
      const checkTarget = { ...signUpData };
      checkTarget.errors.firstName = true;
      checkTarget.currentError = "First name cannot be empty!";
      checkTarget.snackbarVisible = true;
      setSignUpData(checkTarget);
    } else if (username.length <= 0 || username.length < 6) {
      const checkTarget = { ...signUpData };
      checkTarget.errors.username = true;
      checkTarget.currentError =
        "Username can't be empty or less than 6 in length!";
      checkTarget.snackbarVisible = true;
      setSignUpData(checkTarget);
    } else if (email.length <= 0) {
      const checkTarget = { ...signUpData };
      checkTarget.errors.email = true;
      checkTarget.currentError = "Email can't be empty!";
      checkTarget.snackbarVisible = true;
      setSignUpData(checkTarget);
    } else if (password.length <= 0 || password.length < 6) {
      const checkTarget = { ...signUpData };
      checkTarget.errors.password = true;
      checkTarget.currentError =
        "Password can't be empty or less than 6 in length!";
      checkTarget.snackbarVisible = true;
      setSignUpData(checkTarget);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={[styles.centerOnly, customStyles.container]}>
        <Snackbar
          visible={signUpData.snackbarVisible}
          onDismiss={dismissSnackbar}
        >
          {signUpData.currentError}
        </Snackbar>
        <TextInput
          label="First Name"
          error={signUpData.errors.firstName}
          onChangeText={(text) => handleChange(text, "firstName")}
          style={customStyles.textField}
          value={signUpData.userData.firstName}
          mode="outlined"
        />
        <TextInput
          label="Last Name"
          onChangeText={(text) => handleChange(text, "lastName")}
          style={customStyles.textField}
          value={signUpData.userData.lastName}
          mode="outlined"
        />
        <TextInput
          label="Username"
          error={signUpData.errors.username}
          onChangeText={(text) => handleChange(text, "username")}
          style={customStyles.textField}
          value={signUpData.userData.username}
          mode="outlined"
        />
        <TextInput
          label="Email"
          error={signUpData.errors.email}
          onChangeText={(text) => handleChange(text, "email")}
          style={customStyles.textField}
          value={signUpData.userData.email}
          mode="outlined"
        />
        <TextInput
          label="Password"
          error={signUpData.errors.password}
          onChangeText={(text) => handleChange(text, "password")}
          style={customStyles.textField}
          value={signUpData.userData.password}
          mode="outlined"
        />
        <Button
          style={customStyles.button}
          mode="contained"
          // onPress={handleSubmit}
        >
          Sign Up
        </Button>
        <View>
          <Subheading
            onPress={() => {
              navigation.navigate("SignIn");
            }}
          >
            Have an account? Sign In
          </Subheading>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const customStyles = StyleSheet.create({
  textField: {
    width: responsiveWidth(75),
    margin: 15
  },
  container: {
    backgroundColor: "#fff"
  },
  button: {
    margin: 20
  }
});