import { StyleSheet } from "react-native";
import { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import AuthUserProvider from "./src/contexts/AuthUserProvider";
import RootNavigation from "./src/navigation/RootNavigation";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store/store";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontLoaded] = useFonts({
    "Chango-Regular": require("./assets/fonts/Chango-Regular.ttf"),
    "JimNightshade-Regular": require("./assets/fonts/JimNightshade-Regular.ttf"),
  });

  useEffect(() => {
    async function prepareSplashScreen() {
      try {
        if (fontLoaded) {
          await new Promise((resolve) => setTimeout(resolve, 2000));
          await SplashScreen.hideAsync();
        }
      } catch (error) {
        console.log(error);
      }
    }
    prepareSplashScreen();
  }, [fontLoaded]);

  if (!fontLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <AuthUserProvider>
            <RootNavigation />
          </AuthUserProvider>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
}

// Moet nog aangepast worden
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
