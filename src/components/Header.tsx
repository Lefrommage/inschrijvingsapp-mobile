import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";

type HeaderProps = {
  title: string;
};

const Header = ({ title }: HeaderProps) => {
  const navigation = useNavigation();

  return (
    <ImageBackground
      source={require("../../assets/images/background.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        {navigation.canGoBack() ? (
          <MaterialIcons
            name="arrow-back"
            size={30}
            color="white"
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          />
        ) : (
          <View style={styles.leftPlaceholder} />
        )}

        <Text style={styles.title}>{title}</Text>

        <Image
          source={require("../../assets/images/calendar-logo.png")}
          style={styles.icon}
        />
      </View>
    </ImageBackground>
  );
};

export default Header;

const styles = StyleSheet.create({
  background: {
    height: 90,
    width: "100%",
  },
  overlay: {
    flex: 1,
    paddingTop: 30,
    paddingHorizontal: 16,
    backgroundColor: "rgba(0,0,0,0.25)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backButton: {
    zIndex: 2,
  },
  icon: {
    width: 38,
    height: 38,
    borderRadius: 19,
    zIndex: 2,
  },
  title: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 42,
    textAlign: "center",
    color: "white",
    fontSize: 24,
    fontFamily: "Chango-Regular",
  },
  leftPlaceholder: {
    width: 30,
    height: 30,
  },
});
