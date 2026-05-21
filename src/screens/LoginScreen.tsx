import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { LoginScreenNavigationProp } from "../navigation/stacks/LoginStack";
import { auth } from "../firebase/index";
import { signInWithEmailAndPassword } from "firebase/auth";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation<LoginScreenNavigationProp>();

  const handleRegister = () => {
    navigation.navigate("RegisterScreen");
  };

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error);
      });
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Wachtwoord"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Pressable style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Inloggen</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </Pressable>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 32,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 14,
    marginBottom: 16,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#2563eb",
    padding: 16,
    borderRadius: 10,
    marginTop: 8,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});
